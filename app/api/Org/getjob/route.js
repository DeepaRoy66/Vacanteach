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
    const orgId = searchParams.get("orgId");
    const sortBy = searchParams.get("sortBy");
    const limit = parseInt(searchParams.get("limit")) || 0;
    const active = searchParams.get("active") === "true";

    console.log("Query parameters:", { orgId, search, location, postedBy, jobId, sortBy, limit, active }); // Log query params

    await connectToDatabase();

    let query = {};

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
    if (orgId) {
      if (!orgId.match(/^[0-9a-fA-F]{24}$/)) {
        return NextResponse.json({ error: "Invalid organization ID" }, { status: 400 });
      }
      query.org_id = orgId;
    } else {
      return NextResponse.json({ error: "Organization ID is required" }, { status: 400 });
    }

    console.log("MongoDB query:", query); // Log the query

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
    console.log("Fetched jobs:", jobs); // Log the fetched jobs

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error.message, error.stack); // Log full error details
    return NextResponse.json(
      { error: "Failed to fetch jobs", details: error.message },
      { status: 500 }
    );
  }
}