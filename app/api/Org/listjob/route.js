import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const postedBy = searchParams.get("postedBy");
    const jobId = searchParams.get("jobId");
    const active = searchParams.get("active");

    let query = {};
    if (postedBy) query.postedBy = postedBy;
    if (jobId) query._id = jobId;
    if (active !== null) query.active = active === "true";

    const jobs = await Job.find(query).lean();

    if (!jobs || jobs.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 }); // Return empty list
    }

    return new Response(JSON.stringify(jobs), { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
