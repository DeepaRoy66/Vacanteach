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

    // Validation
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
      minimum === undefined ||
      isNaN(minimum) ||
      minimum < 0 ||
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

    if (
      offeredSalaryType === "Range" &&
      (maximum === undefined || isNaN(maximum) || maximum < minimum)
    ) {
      return new Response(
        JSON.stringify({
          error: "Maximum salary is required for range type and must be greater than minimum.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectToDatabase();

    const newJob = await Job.create({
      position,
      requiredEmployees: Number(requiredEmployees),
      jobCategory,
      subCategory: subCategory || null,
      jobLevel,
      jobType,
      experience,
      jobLocation,
      offeredSalaryType,
      currency,
      minimum: Number(minimum),
      maximum: offeredSalaryType === "Range" ? Number(maximum) : null,
      salaryType,
      hideSalary: Boolean(hideSalary),
      negotiable: Boolean(negotiable),
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