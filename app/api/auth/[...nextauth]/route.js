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
        // Create a User record if it doesn't exist
        await User.findOneAndUpdate(
          { email: user.email },
          { $setOnInsert: { email: user.email, name: user.name || "", role: null, profileCompleted: false } },
          { upsert: true }
        );
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
        // Check Organization collection first for organization role
        let userInDB = await Organization.findOne({ email: session.user.email }).select(
          "organizationName phone role profileCompleted"
        );
        if (userInDB && userInDB.role === "organization") {
          session.user.name = userInDB.organizationName || session.user.name || "";
          session.user.phone = userInDB.phone || "";
          session.user.role = userInDB.role;
          session.user.profileCompleted = userInDB.profileCompleted || false;
        } else {
          // Fall back to User collection
          userInDB = await User.findOne({ email: session.user.email }).select("name phone role profileCompleted");
          if (userInDB) {
            session.user.name = userInDB.name || session.user.name || "";
            session.user.phone = userInDB.phone || "";
            session.user.role = userInDB.role || null;
            session.user.profileCompleted = userInDB.profileCompleted || false;
          } else {
            console.warn("No user or organization found for email:", {
              email: session.user.email,
            });
            session.user.role = null;
            session.user.profileCompleted = false;
          }
        }

        session.user.image = token.picture;
        console.log("Session updated with user data:", {
          email: session.user.email,
          role: session.user.role,
          profileCompleted: session.user.profileCompleted,
        });
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