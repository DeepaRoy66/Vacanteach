import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Check session and authorization
    const session = await getServerSession(authOptions);
    console.log("Session:", session); // Debug log
    if (!session || !session.user || session.user.role !== "organization") {
      return NextResponse.json(
        { error: "Unauthorized: Only organizations can post jobs" },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("Received job data:", body); // Debug log
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

    // Validation for required fields
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
      !postedBy?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Description length validation
    if (description.length < 50 || description.length > 5000) {
      return NextResponse.json(
        { error: "Description must be between 50 and 5000 characters" },
        { status: 400 }
      );
    }

    // Salary validation when hideSalary is false
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

    await connectToDatabase();
    // Retrieve org_id from session or user data (example assumption)
    const orgId = session.user.org_id || "68b12047abaf927e211fb75c"; // Replace with actual logic to get org_id

    const newJob = await Job.create({
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
      postedBy: session.user.email, // Use session email
      org_id: orgId, // Add org_id here
      role: "organization",
      urgent: Boolean(urgent || false),
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Job posted successfully!", job: newJob },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting job:", error);
    let errorMessage = error.message || "Internal Server Error";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map((e) => e.message).join(", ");
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}