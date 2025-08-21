import { connectToDatabase } from "../../../../lib/mongoose";
import User from "../../../../lib/models/teacher";
import {  authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await authOptions();

    if (!session || !session.user?.email) {
      console.error("check-role: Authentication failed", { session });
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("check-role: Checking role for email:", session.user.email);
    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email }).select("role profileCompleted");

    if (!user) {
      console.warn("check-role: User not found", { email: session.user.email });
      return new Response(
        JSON.stringify({ message: "User not found", role: null, profileCompleted: false }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("check-role: User found", {
      email: user.email,
      role: user.role,
      profileCompleted: user.profileCompleted,
    });
    return new Response(
      JSON.stringify({ role: user.role || null, profileCompleted: user.profileCompleted || false }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("check-role: Error", {
      message: error.message,
      stack: error.stack,
      email: session?.user?.email || "unknown",
    });
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}