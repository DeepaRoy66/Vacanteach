import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "../../../../lib/mongoose";
import User from "../../../../lib/models/teacher";
import Organization from "../../../../lib/models/Organization";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        await connectToDatabase();
        console.log("Signed in user:", user.email);
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", {
          message: error.message,
          stack: error.stack,
          email: user.email,
        });
        return false;
      }
    },

    async session({ session, token }) {
      if (!session?.user?.email) {
        console.warn("No email in session:", { session });
        return session;
      }

      try {
        await connectToDatabase();
        let userInDB =
          (await User.findOne({ email: session.user.email }).select("name phone role profileCompleted")) ||
          (await Organization.findOne({ email: session.user.email }).select("organizationName phone role profileCompleted"));

        if (userInDB) {
          session.user.name =
            userInDB.name || userInDB.organizationName || session.user.name || "";
          session.user.phone = userInDB.phone || "";
          session.user.role = userInDB.role || null;
          session.user.profileCompleted = userInDB.profileCompleted || false;
          session.user.image = token.picture;
          console.log("Session updated with user data:", {
            email: session.user.email,
            role: session.user.role,
          });
        } else {
          console.warn("User not found in session callback:", {
            email: session.user.email,
          });
          session.user.role = null;
          session.user.profileCompleted = false;
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", {
          message: error.message,
          stack: error.stack,
          email: session.user.email,
        });
        return session;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
