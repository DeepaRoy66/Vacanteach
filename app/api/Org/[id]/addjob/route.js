import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongoose";
import Job from "@/lib/models/Job";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
   
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "organization") {
      return NextResponse.json(
        { error: "Unauthorized: Only organizations can post jobs" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      orgId, 
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
      urgent,
    } = body;

    if (!orgId?.trim()) {
      return NextResponse.json(
        { error: "Organization ID is required" },
        { status: 400 }
      );
    }

  
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
      !description?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    if (description.length < 50 || description.length > 5000) {
      return NextResponse.json(
        { error: "Description must be between 50 and 5000 characters" },
        { status: 400 }
      );
    }

    if (!hideSalary) {
      if (minimum === undefined || isNaN(minimum) || minimum < 0) {
        return NextResponse.json(
          { error: "Minimum salary must be a non-negative number when salary is not hidden" },
          { status: 400 }
        );
      }
      if (offeredSalaryType === "Range" && (maximum === undefined || isNaN(maximum) || maximum < minimum)) {
        return NextResponse.json(
          { error: "Maximum salary is required for range type and must be greater than minimum when salary is not hidden" },
          { status: 400 }
        );
      }
    }

    await connectToDatabase();

    const newJob = await Job.create({
      org_id: orgId,
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
      urgent: Boolean(urgent || false),
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Job posted successfully!", job: newJob }, { status: 201 });
  } catch (error) {
    console.error("Error posting job:", error);
    let errorMessage = error.message || "Internal Server Error";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map((e) => e.message).join(", ");
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
