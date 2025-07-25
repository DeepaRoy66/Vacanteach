import { connectToDatabase } from "../../../../lib/mongoose";
import User from "../../../../lib/models/teacher";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    // Get session using NextAuth's getServerSession
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.error("Authentication failed in teacherdata GET:", { session });
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      console.warn("User not found for email:", session.user.email);
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user data:", {
      message: error.message,
      stack: error.stack,
    });
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Request body:", body); // Debug log to inspect payload
    const { name, email, phone, role } = body;

    // Stricter validation to prevent null or invalid role
    if (
      !name ||
      !email ||
      !phone ||
      !role ||
      typeof role !== "string" ||
      role.trim() === ""
    ) {
      console.warn("Invalid or missing required fields in teacherdata POST:", { body });
      return new Response(JSON.stringify({ message: "Missing or invalid required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    // Explicitly set update data
    const updateData = {
      name,
      phone,
      role,
      profileCompleted: true,
    };

    

    const user = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify({ message: "Teacher profile saved", user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving teacher data:", {
      message: error.message,
      stack: error.stack,
      body, // Log parsed body instead of req.body
    });
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}