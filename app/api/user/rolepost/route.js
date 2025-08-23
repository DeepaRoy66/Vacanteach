import { connectToDatabase } from "../../../../lib/mongoose";
import User from "../../../../lib/models/teacher";
import Organization from "../../../../lib/models/Organization";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

function getModelByRole(role) {
  switch (role) {
    case "organization":
      return Organization;
    case "teacher":
      return User;
    default:
      throw new Error("Invalid role");
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { role, email, name, phone, organizationName, industry } = body;

    if (!role || !["organization", "teacher"].includes(role)) {
      return new Response(JSON.stringify({ message: "Missing or invalid role" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (session.user.email !== email) {
      return new Response(JSON.stringify({ message: "Unauthorized: Email does not match session" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ message: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!/^\d{10}$/.test(phone)) {
      return new Response(JSON.stringify({ message: "Phone number must be exactly 10 digits" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (role === "organization" && (!organizationName || !industry || !name)) {
      return new Response(JSON.stringify({ message: "Missing required fields: organizationName, industry, name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    } else if (role === "teacher" && !name) {
      return new Response(JSON.stringify({ message: "Missing required field: name" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();
    const Model = getModelByRole(role);

    // Check if profile already exists and is complete
    const existingProfile = await Model.findOne({ email, profileCompleted: true });
    if (existingProfile) {
      return new Response(JSON.stringify({ message: `${role} profile already exists` }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete any existing record in the other collection
    const otherModel = role === "organization" ? User : Organization;
    await otherModel.deleteOne({ email });

    // Update or create the profile
    let updateData = { role, phone, name, profileCompleted: true };
    if (role === "organization") {
      updateData = { ...updateData, organizationName, industry };
    }

    const result = await Model.findOneAndUpdate(
      { email },
      { $set: updateData },
      { upsert: true, new: true }
    );

    // Update User model role for consistency
    await User.findOneAndUpdate(
      { email },
      { $set: { role, profileCompleted: true } },
      { upsert: true }
    );

    return new Response(JSON.stringify({ message: `${role} profile saved`, data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST:", {
      message: error.message,
      stack: error.stack,
      body,
    });
    if (error.name === "MongoServerError" && error.code === 11000) {
      return new Response(JSON.stringify({ message: `Email already exists as ${role}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message).join(", ");
      return new Response(JSON.stringify({ message: `Validation error: ${messages}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (error.message === "Invalid role") {
      return new Response(JSON.stringify({ message: "Invalid role" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}