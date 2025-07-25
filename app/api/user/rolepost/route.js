import { connectToDatabase } from "../../../../lib/mongoose";
import Organization from "../../../../lib/models/Organization";
import User from "../../../../lib/models/teacher";
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

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ message: "User not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");

    if (!role) {
      return new Response(JSON.stringify({ message: "Missing role in query" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();
    const Model = getModelByRole(role);
    const userData = await Model.findOne({ email: session.user.email });

    if (!userData) {
      return new Response(JSON.stringify({ message: `${role} not found` }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data: userData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { role, email, name, phone, organizationName, industry } = body;

    if (!role || typeof role !== "string" || role.trim() === "") {
      return new Response(JSON.stringify({ message: "Missing or invalid role" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToDatabase();
    const Model = getModelByRole(role);

    let updateData = {};
    if (role === "organization") {
      if (!organizationName || !industry || !email || !phone) {
        return new Response(JSON.stringify({ message: "Missing required fields for organization" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      updateData = { organizationName, industry, phone, role, profileCompleted: true };
    } else if (role === "teacher") {
      if (!name || !email || !phone) {
        return new Response(JSON.stringify({ message: "Missing required fields for teacher" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      updateData = { name, phone, role, profileCompleted: true };
    }

    // Update role-specific collection
    const result = await Model.findOneAndUpdate(
      { email },
      { $set: updateData },
      { upsert: true, new: true }
    );

    // ALSO update the main User collection (the teacher model used as User here)
    const userUpdateData = {
      role,
      profileCompleted: true,
    };

    if (role === "teacher") {
      userUpdateData.name = name;
      userUpdateData.phone = phone;
    }

    if (role === "organization") {
      userUpdateData.phone = phone;
    }

    await User.findOneAndUpdate(
      { email },
      { $set: userUpdateData },
      { upsert: false }
    );

    return new Response(JSON.stringify({ message: `${role} profile saved`, data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
