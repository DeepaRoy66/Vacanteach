
import { connectToDatabase } from "../../../../../lib/mongoose";
import Job from "../../../../../lib/models/Job";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { jobId } = params;
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
      description,
      postedBy,
      role,
      urgent,
    } = body;

    // Validation
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
      !postedBy
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (offeredSalaryType === "Range" && !maximum) {
      return NextResponse.json(
        { error: "Maximum salary is required for range type." },
        { status: 400 }
      );
    }

    if (!jobId || !jobId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    await connectToDatabase();

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
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
        description,
        postedBy,
        role: role || "organization",
        urgent: Boolean(urgent),
        updatedAt: new Date(),
      },
      { new: true, runValidators: true, lean: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating job:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
