import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/lib/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      if (!session?.user?.email) return session;

      await connectToDatabase();
      const userInDB = await User.findOne({ email: session.user.email });

      if (userInDB) {
        session.user.name = userInDB.name;
        session.user.phone = userInDB.phone;
        session.user.role = userInDB.role;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
