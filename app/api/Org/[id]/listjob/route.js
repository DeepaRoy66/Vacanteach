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
    const sortBy = searchParams.get("sortBy");
    const limit = parseInt(searchParams.get("limit")) || 0;
    const active = searchParams.get("active") === "true"; // Explicitly parse active parameter

    await connectToDatabase();
    let query = {};

    // Always filter for active jobs when active=true is specified
    if (active) {
      query.active = true;
    }

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
      if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
        return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
      }
      query._id = jobId;
    }

    let jobsQuery = Job.find(query).lean();
    if (sortBy === "views") {
      jobsQuery = jobsQuery.sort({ views: -1 });
    } else {
      jobsQuery = jobsQuery.sort({ createdAt: -1 });
    }
    if (limit > 0) {
      jobsQuery = jobsQuery.limit(limit);
    }

    const jobs = await jobsQuery.exec();
    // Log the query and results for debugging
    console.log("Query:", query);
    console.log("Fetched jobs:", jobs);
    
if (!jobs || jobs.length === 0) {
  return NextResponse.json([], { status: 200 });
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