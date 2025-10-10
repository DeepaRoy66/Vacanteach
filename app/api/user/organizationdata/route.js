import { connectToDatabase } from "@/lib/mongoose";
import Organization from "@/lib/models/Organization";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      console.error("Authentication failed in organizationdata GET:", { session });
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    await connectToDatabase();
    const organization = await Organization.findOne({ email: session.user.email }).lean();
    
    if (!organization) {
      console.warn("Organization not found for email:", session.user.email);
      return new Response(JSON.stringify({ message: "Organization not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // FIXED: Convert ObjectId to string and provide both field names for compatibility
    const orgIdString = organization._id.toString();
    
    const responseData = {
      _id: orgIdString,          // For dashboard component compatibility
      id: orgIdString,           // For backward compatibility
      email: organization.email,
      organizationName: organization.organizationName,
      industry: organization.industry,
      phone: organization.phone,
      role: organization.role,
      profileCompleted: organization.profileCompleted || true,
      createdAt: organization.createdAt,
      __v: organization.__v
    };

    console.log("OrganizationData API GET - Returning data for:", session.user.email);
    console.log("OrganizationData API GET - Organization ID:", orgIdString);
    
    return new Response(JSON.stringify(responseData), {
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
    console.log("OrganizationData POST - Request body:", body);
    
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
      profileCompleted: true,
    };

    console.log("OrganizationData POST - Updating organization with:", updateData);
    
    const org = await Organization.findOneAndUpdate(
      { email },
      { $set: updateData },
      { upsert: true, new: true }
    ).lean();

    console.log("OrganizationData POST - Organization saved:", org);

    // FIXED: Return organizationId as string for SelectRole component
    const orgIdString = org._id.toString();
    
    return new Response(JSON.stringify({
      message: "Organization profile saved successfully",
      organizationId: orgIdString,  // For SelectRole redirect
      organization: {
        _id: orgIdString,           // For consistency
        id: orgIdString,            // For backward compatibility
        email: org.email,
        organizationName: org.organizationName,
        industry: org.industry,
        phone: org.phone,
        role: org.role,
        profileCompleted: org.profileCompleted,
      }
    }), {
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