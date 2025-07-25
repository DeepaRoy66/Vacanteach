import { connectToDatabase } from "../../../../lib/mongoose";
import Organization from "../../../../lib/models/Organization";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    // Get session using NextAuth's getServerSession
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.error("Authentication failed in organizationdata GET:", { session });
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

    const organization = await Organization.findOne({ email: session.user.email });

    if (!organization) {
      console.warn("Organization not found for email:", session.user.email);
      return new Response(JSON.stringify({ message: "Organization not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ organization }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching organization data:", {
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
    console.log("Request body:", body); 
    const { email, organizationName, industry, phone, role } = body;

   
    if (
      !email ||
      !organizationName ||
      !industry ||
      !phone ||
      !role ||
      typeof role !== "string" ||
      role.trim() === ""
    ) {
      console.warn("Invalid or missing required fields in organizationdata POST:", { body });
      return new Response(JSON.stringify({ message: "Missing or invalid required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();

  
    const updateData = {
      organizationName,
      industry,
      phone,
      role,
    };

    const org = await Organization.findOneAndUpdate(
      { email },
      { $set: updateData },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify({ message: "Organization profile saved", organization: org }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving organization data:", {
      message: error.message,
      stack: error.stack,
    });
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}