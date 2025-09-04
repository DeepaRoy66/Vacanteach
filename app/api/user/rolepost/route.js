import { connectToDatabase } from "../../../../lib/mongoose";
import User from "../../../../lib/models/teacher";
import Organization from "../../../../lib/models/Organization";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

function getModelByRole(role) {
  if (role === "organization") return Organization;
  if (role === "teacher") return User;
  throw new Error("Invalid role");
}

export async function POST(req) {
  let body;
  try {
    // Parse request body safely
    body = await req.json();
    const { role, email, name, phone, organizationName, industry } = body;

    // Get session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Email must match session
    if (session.user.email !== email) {
      return new Response(JSON.stringify({ message: "Unauthorized: Email mismatch" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate role
    if (!role || !["organization", "teacher"].includes(role)) {
      return new Response(JSON.stringify({ message: "Missing or invalid role" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    if (!name || !/^\d{10}$/.test(phone)) {
      return new Response(JSON.stringify({ message: "Invalid name or phone number" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (role === "organization" && (!organizationName || !industry)) {
      return new Response(JSON.stringify({ message: "OrganizationName and industry are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Connect to DB
    await connectToDatabase();
    const Model = getModelByRole(role);

    // Delete any record in the other collection
    const OtherModel = role === "organization" ? User : Organization;
    await OtherModel.deleteOne({ email });

    // Create or update user/organization profile
    const updateData = role === "organization"
      ? { role, name, phone, organizationName, industry, profileCompleted: true }
      : { role, name, phone, profileCompleted: true };

    const result = await Model.findOneAndUpdate(
      { email },
      { $set: updateData },
      { upsert: true, new: true }
    );

    // Return JSON response
    return new Response(JSON.stringify({
      message: `${role} profile saved successfully!`,
      data: result,
      organizationId: role === "organization" ? result._id : null,
      teacherId: role === "teacher" ? result._id : null,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("POST /rolepost error:", error);

    // Always return JSON error
    const message = error.message || "Internal server error";
    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
