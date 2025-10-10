import { connectToDatabase } from "@/lib/mongoose";
import replySchema from "@/lib/models/replySchema";

export async function GET(req) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const applicantEmail = url.searchParams.get("email");

    if (!applicantEmail) {
      return new Response(
        JSON.stringify({ replies: [], error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const replies = await replySchema
      .find({ applicantEmail })
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify({ replies }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching replies:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
