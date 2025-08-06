import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find({}).sort({ createdAt: -1 }).lean(); // Fetch all jobs, sorted by newest first
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch jobs", details: error.message },
      { status: 500 }
    );
  }
}