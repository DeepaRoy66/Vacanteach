// app/api/jobs/route.js
import { connectToDatabase } from "@/lib/mongoose";
import Job from "@/lib/models/Job";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const location = searchParams.get("location");
    const postedBy = searchParams.get("postedBy");
    const jobId = searchParams.get("jobId");
    const sortBy = searchParams.get("sortBy");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const active = searchParams.get("active") === "true";
    const jobType = searchParams.get("jobType"); // full-time, part-time, contract
    const salaryMin = searchParams.get("salaryMin");
    const salaryMax = searchParams.get("salaryMax");

    await connectToDatabase();

    let query = {};

    // Always filter for active jobs when active=true is specified
    if (active) {
      query.active = true;
    }

    // Search in position title and description
    if (search) {
      query.$or = [
        { position: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by location
    if (location) {
      query.jobLocation = { $regex: location, $options: "i" };
    }

    // Filter by who posted the job
    if (postedBy) {
      query.postedBy = postedBy;
    }

    // Filter by job type
    if (jobType) {
      query.jobType = jobType;
    }

    // Salary range filter
    if (salaryMin || salaryMax) {
      query.salary = {};
      if (salaryMin) {
        query.salary.$gte = parseInt(salaryMin);
      }
      if (salaryMax) {
        query.salary.$lte = parseInt(salaryMax);
      }
    }

    // Get specific job by ID
    if (jobId) {
      if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
        return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
      }
      query._id = jobId;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build the query
    let jobsQuery = Job.find(query)
      .populate('postedBy', 'name email organizationName') // Populate organization details
      .lean();

    // Apply sorting
    switch (sortBy) {
      case "views":
        jobsQuery = jobsQuery.sort({ views: -1 });
        break;
      case "salary":
        jobsQuery = jobsQuery.sort({ salary: -1 });
        break;
      case "alphabetical":
        jobsQuery = jobsQuery.sort({ position: 1 });
        break;
      default:
        jobsQuery = jobsQuery.sort({ createdAt: -1 });
    }

    // Apply pagination
    if (limit > 0) {
      jobsQuery = jobsQuery.skip(skip).limit(limit);
    }

    // Execute query
    const jobs = await jobsQuery.exec();

    // Get total count for pagination
    const totalJobs = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / limit);

    // Log for debugging
    console.log("Jobs Query:", query);
    console.log("Found jobs:", jobs.length);

    return NextResponse.json({
      jobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalJobs,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch jobs", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // For creating new jobs (if needed in the future)
    const body = await request.json();
    
    await connectToDatabase();
    
    const newJob = new Job(body);
    const savedJob = await newJob.save();
    
    return NextResponse.json(savedJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error.message);
    return NextResponse.json(
      { error: "Failed to create job", details: error.message },
      { status: 500 }
    );
  }
}