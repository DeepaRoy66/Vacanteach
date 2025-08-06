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
    async signIn({ user, account, profile }) {
      try {
        await connectToDatabase();

        // Check if user exists in either User or Organization collection
        let dbUser =
          (await User.findOne({ email: user.email })) ||
          (await Organization.findOne({ email: user.email }));

        if (!dbUser) {
          // Create a new Organization user if none exists
          dbUser = await Organization.create({
            email: user.email,
            organizationName: user.name || profile.name || `Org_${user.email.split("@")[0]}`,
            phone: "", // Required field, set to empty string (to be completed later)
            industry: "Unknown", // Required field, set default (to be completed later)
            role: "organization",
            profileCompleted: false,
            createdAt: new Date(),
          });
          console.log("Created new organization user:", { email: user.email });
        }

        console.log("Signed in user:", { email: user.email, role: dbUser.role });
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
          (await Organization.findOne({ email: session.user.email }).select("organizationName phone role profileCompleted industry"));

        if (userInDB) {
          session.user.name =
            userInDB.name || userInDB.organizationName || session.user.name || "";
          session.user.phone = userInDB.phone || "";
          session.user.role = userInDB.role || "organization";
          session.user.profileCompleted = userInDB.profileCompleted || false;
          session.user.image = token.picture || session.user.image;
          console.log("Session updated with user data:", {
            email: session.user.email,
            role: session.user.role,
          });
        } else {
          console.warn("User not found in session callback:", {
            email: session.user.email,
          });
          session.user.role = "organization";
          session.user.profileCompleted = false;
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", {
          message: error.message,
          stack: error.stack,
          email: session.user.email,
        });
        throw new Error("Failed to update session");
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };