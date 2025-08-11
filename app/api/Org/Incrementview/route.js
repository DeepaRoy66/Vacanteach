
import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { job_id } = await request.json();

    if (!job_id || !job_id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    await connectToDatabase();

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $inc: { views: 1 } },
      { new: true, lean: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "View count incremented" }, { status: 200 });
  } catch (error) {
    console.error("Error incrementing job view:", error.message);
    return NextResponse.json(
      { error: "Failed to increment view", details: error.message },
      { status: 500 }
    );
  }
}
