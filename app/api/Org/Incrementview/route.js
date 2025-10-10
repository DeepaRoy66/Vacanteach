import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { job_id } = await request.json();
    
    if (!job_id || !job_id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }
    
    // Connect to database first
    await connectToDatabase();
    
    // Import Job model dynamically (only at runtime)
    const Job = (await import("@/lib/models/Job")).default;
    
    const updatedJob = await Job.findByIdAndUpdate(
      job_id, // Fixed: was 'jobId', should be 'job_id'
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