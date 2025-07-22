import { connectToDatabase } from "@/lib/mongoose";
import User from "@/lib/models/Teacher";
import { auth } from "../../auth/[...nextauth]/route";

export async function POST(request) {
  const { role } = await request.json();

  if (!role || (role !== "client" && role !== "teacher")) {
    return new Response(JSON.stringify({ error: "Invalid role" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { role },
      { new: true, upsert: true },
    );

    return new Response(JSON.stringify({ message: "Role updated successfully.", user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating role:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}