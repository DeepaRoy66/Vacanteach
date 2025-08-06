
import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const location = searchParams.get("location");
    const postedBy = searchParams.get("postedBy");
    const jobId = searchParams.get("jobId");

    await connectToDatabase();

    let query = {};
    if (search) {
      query.position = { $regex: search, $options: "i" };
    }
    if (location) {
      query.jobLocation = { $regex: location, $options: "i" };
    }
    if (postedBy) {
      query.postedBy = postedBy;
    }
    if (jobId) {
      query._id = jobId;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 }).lean();
    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ error: "No jobs found" }, { status: 404 });
    }

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch jobs", details: error.message },
      { status: 500 }
    );
  }
}
