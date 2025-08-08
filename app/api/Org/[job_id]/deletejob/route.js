import { connectToDatabase } from "../../../../../lib/mongoose";
import Job from "../../../../../lib/models/Job";
import JobStats from "../../../../../lib/models/jobstats";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { jobId } = params;

    if (!jobId || !jobId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    await connectToDatabase();

    const deletedJob = await Job.findByIdAndDelete(jobId, { lean: true });

    if (!deletedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Update job stats for the current month
    const currentMonth = new Date().toISOString().slice(0, 7);
    await JobStats.findOneAndUpdate(
      { month: currentMonth },
      { $inc: { jobCount: -1 } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}