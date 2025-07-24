// app/api/user/organizationdata/route.js  (if using Next.js 13 app router)
import { connectToDatabase } from "../../../../lib/mongoose";
import Organization from "../../../../lib/models/Organization";
import User from "../../../../lib/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, organizationName, industry, phone, role } = body;

    if (!email || !organizationName || !industry || !phone || !role) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Upsert organization data
    const org = await Organization.findOneAndUpdate(
      { email },
      { organizationName, industry, phone, role },
      { upsert: true, new: true }
    );

    // Also update the User's role field in the User collection
    await User.findOneAndUpdate(
      { email },
      { role },
      { new: true }
    );

    return new Response(
      JSON.stringify({ message: "Organization profile saved", organization: org }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
