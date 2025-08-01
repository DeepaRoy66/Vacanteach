import { connectToDatabase } from "../../../../../lib/mongoose";
import Job from "../../../../../lib/models/Job";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { job_id } = params; 
    const body = await req.json();
    const {
      position,
      requiredEmployees,
      jobCategory,
      experience,
      jobLocation,
      currency,
      minimum,
      maximum,
      salaryType,
      postedBy,
    } = body;

    // Basic validation
    if (
      !position ||
      !requiredEmployees ||
      !jobCategory ||
      !jobLocation ||
      !currency ||
      !minimum ||
      !maximum ||
      !salaryType
    ) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await connectToDatabase();

    // Validate job ID
    if (!job_id || !job_id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      job_id,
      {
        position,
        requiredEmployees: Number(requiredEmployees),
        jobCategory,
        experience,
        jobLocation,
        currency,
        minimum: Number(minimum),
        maximum: Number(maximum),
        salaryType,
        postedBy,
      },
      { new: true, runValidators: true, lean: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}