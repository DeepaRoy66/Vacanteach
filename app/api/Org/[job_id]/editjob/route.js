import { connectToDatabase } from "../../../../../lib/mongoose";
import Job from "../../../../../lib/models/Job";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { job_id } = params;
    const body = await request.json();
    const {
      position,
      requiredEmployees,
      jobCategory,
      subCategory,
      jobLevel,
      jobType,
      experience,
      jobLocation,
      offeredSalaryType,
      currency,
      minimum,
      maximum,
      salaryType,
      hideSalary,
      negotiable,
      active,
      description,
      postedBy,
      role,
      urgent,
    } = body;

    // Validate required fields
    if (
      !position ||
      !requiredEmployees ||
      !jobCategory ||
      !jobLevel ||
      !jobType ||
      !jobLocation ||
      !offeredSalaryType ||
      !currency ||
      !minimum ||
      !salaryType ||
      !description ||
      !postedBy ||
      active === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Validate salary range
    if (offeredSalaryType === "Range" && !maximum) {
      return NextResponse.json(
        { error: "Maximum salary is required for range type." },
        { status: 400 }
      );
    }

    // Validate job_id
    if (!job_id || !job_id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    // Validate numeric fields
    if (
      Number(requiredEmployees) <= 0 ||
      Number(minimum) <= 0 ||
      (maximum && Number(maximum) <= 0)
    ) {
      return NextResponse.json(
        { error: "Numeric fields must be positive." },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Authorization check (optional)
    const job = await Job.findById(job_id).select("postedBy");
    if (!job || job.postedBy.toString() !== postedBy) {
      return NextResponse.json(
        { error: "Unauthorized to update this job." },
        { status: 403 }
      );
    }

    // Update job
    const updateFields = {
      position,
      requiredEmployees: Number(requiredEmployees),
      jobCategory,
      subCategory: subCategory || null,
      jobLevel,
      jobType,
      experience: experience || null,
      jobLocation,
      offeredSalaryType,
      currency,
      minimum: Number(minimum),
      maximum: maximum ? Number(maximum) : null,
      salaryType,
      hideSalary: Boolean(hideSalary),
      negotiable: Boolean(negotiable),
      active: Boolean(active),
      description,
      postedBy,
      role: role || "organization",
      urgent: Boolean(urgent),
      updatedAt: new Date(),
    };

    const updatedJob = await Job.findByIdAndUpdate(
      job_id,
      { $set: updateFields },
      { new: true, runValidators: true, lean: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}