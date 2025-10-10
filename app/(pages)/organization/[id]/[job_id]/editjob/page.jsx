import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongoose";
import Job from "@/lib/models/Job";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    // Access params directly (App Router)
    const { job_id } = params;
    if (!job_id || !job_id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid job ID format" }, { status: 400 });
    }
    const body = await request.json();
    console.log("Received payload:", body); // Debug log
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
      org_id,
    } = body;

    // Validate session
    const session = await getServerSession(authOptions);
    console.log("Session:", session); // Debug log
    if (!session || !session.user || session.user.role !== "organization") {
      return NextResponse.json(
        { error: "Unauthorized: Only organizations can edit jobs" },
        { status: 401 }
      );
    }

    // Validate required fields
    if (
      !position?.trim() ||
      requiredEmployees === undefined ||
      isNaN(requiredEmployees) ||
      requiredEmployees <= 0 ||
      !jobCategory?.trim() ||
      !jobLevel?.trim() ||
      !jobType?.trim() ||
      !jobLocation?.trim() ||
      !offeredSalaryType?.trim() ||
      !currency?.trim() ||
      !salaryType?.trim() ||
      !description?.trim() ||
      !postedBy?.trim() ||
      !org_id?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Validate description length
    if (description.length < 50 || description.length > 5000) {
      return NextResponse.json(
        { error: "Description must be between 50 and 5000 characters" },
        { status: 400 }
      );
    }

    // Validate salary fields
    if (!hideSalary) {
      if (minimum === undefined || isNaN(minimum) || minimum < 0) {
        return NextResponse.json(
          { error: "Minimum salary must be a non-negative number when salary is not hidden" },
          { status: 400 }
        );
      }
      if (
        offeredSalaryType === "Range" &&
        (maximum === undefined || isNaN(maximum) || maximum < minimum)
      ) {
        return NextResponse.json(
          {
            error:
              "Maximum salary is required for range type and must be greater than minimum when salary is not hidden",
          },
          { status: 400 }
        );
      }
    }

    // Connect to database
    await connectToDatabase();

    // Verify job exists and ownership
    const job = await Job.findById(job_id).select("org_id");
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    console.log("Job org_id:", job.org_id, "Session org_id:", session.user.org_id); // Debug log
    if (job.org_id !== session.user.org_id) {
      return NextResponse.json(
        { error: "Unauthorized: You do not have permission to edit this job" },
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
      experience: experience?.trim() || null,
      jobLocation,
      offeredSalaryType,
      currency,
      minimum: hideSalary ? null : Number(minimum),
      maximum: hideSalary || offeredSalaryType !== "Range" ? null : Number(maximum),
      salaryType,
      hideSalary: Boolean(hideSalary),
      negotiable: hideSalary ? false : Boolean(negotiable),
      active: Boolean(active),
      description,
      postedBy: session.user.email,
      role: "organization",
      urgent: Boolean(urgent),
      org_id: session.user.org_id, // Ensure org_id is updated to match session
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

    return NextResponse.json(
      { message: "Job updated successfully", job: updatedJob },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating job:", error);
    let errorMessage = error.message || "Internal Server Error";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map((e) => e.message).join(", ");
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}