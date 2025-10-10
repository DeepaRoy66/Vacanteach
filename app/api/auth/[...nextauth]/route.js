import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/lib/models/teacher";
import Organization from "@/lib/models/Organization";

// Force dynamic rendering for NextAuth routes
export const dynamic = 'force-dynamic';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        } else {
          console.log("[NextAuth] User already exists:", user.email);
        }
        
        return true;
      } catch (error) {
        console.error("[NextAuth] Error in signIn callback:", error);
        // IMPORTANT: Still allow sign-in even if database operations fail
        // The JWT callback will handle user creation/retrieval
        return true; // Changed from false to true
      }
    },
    
    async jwt({ token, user, account }) {
      try {
        await connectToDatabase();
        
        let dbUser = await User.findOne({ email: token.email });
        
        // If user doesn't exist, create them here as a fallback
        if (!dbUser && user) {
          dbUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            profileCompleted: false,
            provider: account?.provider,
            providerId: account?.providerAccountId,
          });
          console.log("[NextAuth] Created user in JWT callback:", user.email);
        }
        
        let newRole = "user";
        let profileCompleted = false;
        
        if (dbUser) {
          newRole = dbUser.role || "user";
          profileCompleted = dbUser.profileCompleted || false;
        } else {
          // Check if it's an organization user
          const orgUser = await Organization.findOne({ email: token.email });
          if (orgUser) {
            newRole = orgUser.role || "organization";
            profileCompleted = orgUser.profileCompleted || false;
          }
        }
        
        console.log("[NextAuth] JWT role:", newRole, "Profile completed:", profileCompleted);
        
        token.role = newRole;
        token.profileCompleted = profileCompleted;
        
        return token;
      } catch (error) {
        console.error("[NextAuth] Error in JWT callback:", error);
        // Fallback to default values
        token.role = token.role || "user";
        token.profileCompleted = token.profileCompleted || false;
        return token;
      }
    },
    
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.profileCompleted = token.profileCompleted;
      console.log("[NextAuth] Session with role:", session.user.role, "Profile completed:", session.user.profileCompleted);
      return session;
    },
  },
  
  // Add these to help debug
  pages: {
    error: '/auth/error', // Custom error page (optional)
  },
  
  debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };