import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route"; // Adjust path if your authOptions are elsewhere
import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";

export async function POST(req) {
  // Check session and authorization
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "organization") {
    return new Response(
      JSON.stringify({ error: "Unauthorized: Only organizations can post jobs." }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = await req.json();
    console.log("Received job data:", body);
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
      return new Response(
        JSON.stringify({ error: "Missing or invalid required fields." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Description length validation
    if (description.length < 50) {
      return new Response(
        JSON.stringify({ error: "Job description must be at least 50 characters." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (description.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Job description cannot exceed 5000 characters." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Salary validation when hideSalary is false
    if (!hideSalary) {
      if (minimum === undefined || isNaN(minimum) || minimum < 0) {
        return new Response(
          JSON.stringify({ error: "Minimum salary must be a non-negative number when salary is not hidden." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      if (
        offeredSalaryType === "Range" &&
        (maximum === undefined || isNaN(maximum) || maximum < minimum)
      ) {
        return new Response(
          JSON.stringify({
            error: "Maximum salary is required for range type and must be greater than minimum when salary is not hidden.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    await connectToDatabase();

    const newJob = await Job.create({
      position,
      requiredEmployees: Number(requiredEmployees),
      jobCategory,
      subCategory: subCategory || null,
      jobLevel,
      jobType,
      experience: experience?.trim() || null, // Experience is optional
      jobLocation,
      offeredSalaryType,
      currency,
      minimum: hideSalary ? null : Number(minimum),
      maximum: hideSalary || offeredSalaryType !== "Range" ? null : Number(maximum),
      salaryType,
      hideSalary: Boolean(hideSalary),
      negotiable: hideSalary ? false : Boolean(negotiable), // Negotiable is false if hideSalary is true
      active: Boolean(active),
      description,
      postedBy: session.user.email, // Override with session email for security
      role: "organization", // Enforce organization role
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Job posted successfully!", job: newJob }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error posting job:", error);
    let errorMessage = "Internal Server Error";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map((e) => e.message).join(", ");
    } else if (error.name === "MongoServerError") {
      errorMessage = error.message;
    }
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}