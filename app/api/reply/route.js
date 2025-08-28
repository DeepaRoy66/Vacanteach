import replySchema from "../../../lib/models/replySchema";
import { connectToDatabase } from "../../../lib/mongoose";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { applicationId, applicantEmail, applicantName, message } = await req.json();

    if (!applicationId || !applicantEmail || !applicantName || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const reply = new replySchema({ applicationId, applicantEmail, applicantName, message });
    await reply.save();

    return new Response(JSON.stringify({ message: "Reply saved successfully", reply }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving reply:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
