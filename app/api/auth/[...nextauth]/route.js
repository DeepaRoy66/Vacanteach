import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { connectToDatabase } from "../../../../lib/mongoose";
import User from "../../../../lib/models/teacher";
import Organization from "../../../../lib/models/Organization";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_Client_ID,
      clientSecret: process.env.GOOGLE_Client_secret,
    }),
    FacebookProvider({
      clientId: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectToDatabase()

        // Check if user exists in database
        const existingUser = await User.findOne({ email: user.email })

        if (!existingUser) {
          // Create new user with default role
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            provider: account.provider,
            providerId: account.providerAccountId,
          })
          console.log("[NextAuth] Created new user:", user.email)
        }

        return true
      } catch (error) {
        console.error("[NextAuth] Error in signIn callback:", error)
        return true 
      }
    },
    async jwt({ token, user, account, trigger }) {
      try {
        await connectToDatabase()

        const dbUser = await User.findOne({ email: token.email })
        let newRole = "user"

        if (dbUser) {
          newRole = dbUser.role || "user"
        } else {
        
          const orgUser = await Organization.findOne({ email: token.email })
          if (orgUser) {
            newRole = orgUser.role || "organization"
          }
        }

        // Only log if role changed or on initial sign-in
        if (token.role !== newRole || (account && user)) {
          console.log("[NextAuth] User role from DB:", newRole)
        }

        token.role = newRole
      } catch (error) {
        console.error("[NextAuth] Error fetching user role:", error)
        token.role = token.role || "user" // Keep existing role on error
      }

      return token
    },
    async session({ session, token }) {
     
      session.user.role = token.role
      console.log("[NextAuth] Session with role:", session.user.role)
      return session
    },
  },
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
