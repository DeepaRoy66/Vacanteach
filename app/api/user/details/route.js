import { connectToDatabase } from "@/lib/mongoose";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth/next"; // Import getServerSession
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  const { name, email, phone, role } = await request.json();

  if (!name || !email || !phone || !role) {
    return new Response(JSON.stringify({ success: false, message: "Missing required fields." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const session = await getServerSession(authOptions); // Use getServerSession

    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ success: false, message: "User not authenticated. Please log in again." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { name, phone, role, profileCompleted: true },
      { new: true, upsert: true, runValidators: true },
    );

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "Failed to find or create user in database." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Profile created successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return new Response(
      JSON.stringify({ success: false, message: `Server error during profile creation: ${error.message}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}