import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
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
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            profileCompleted: false,
            provider: account.provider,
            providerId: account.providerAccountId,
          });
          console.log("[NextAuth] Created new user:", user.email);
        }
        return true;
      } catch (error) {
        console.error("[NextAuth] Error in signIn callback:", error);
        return true;
      }
    },
    async jwt({ token, user, account }) {
      try {
        await connectToDatabase();
        const dbUser = await User.findOne({ email: token.email });
        let newRole = "user";
        let profileCompleted = false;
        let orgId = null;

        if (dbUser) {
          newRole = dbUser.role || "user";
          profileCompleted = dbUser.profileCompleted || false;
        } else {
          const orgUser = await Organization.findOne({ email: token.email });
          if (orgUser) {
            newRole = orgUser.role || "organization";
            profileCompleted = orgUser.profileCompleted || false;
            orgId = orgUser._id ? orgUser._id.toString() : null; // Fetch org_id from Organization model
          }
        }
        console.log("[NextAuth] JWT role:", newRole, "Profile completed:", profileCompleted, "orgId:", orgId);
        token.role = newRole;
        token.profileCompleted = profileCompleted;
        if (orgId) token.org_id = orgId; // Add org_id to token if it exists
        return token;
      } catch (error) {
        console.error("[NextAuth] Error fetching user role:", error);
        token.role = token.role || "user";
        token.profileCompleted = token.profileCompleted || false;
        return token;
      }
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.profileCompleted = token.profileCompleted;
      if (token.org_id) session.user.org_id = token.org_id; // Add org_id to session if it exists
      console.log("[NextAuth] Session with role:", session.user.role, "Profile completed:", session.user.profileCompleted, "orgId:", session.user.org_id);
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };