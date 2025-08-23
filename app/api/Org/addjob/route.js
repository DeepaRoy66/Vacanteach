import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";

export async function POST(req) {
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
      !position ||
      requiredEmployees === undefined || isNaN(requiredEmployees) || requiredEmployees <= 0 ||
      !jobCategory ||
      !jobLevel ||
      !jobType ||
      !jobLocation ||
      !offeredSalaryType ||
      !currency ||
      minimum === undefined || isNaN(minimum) || minimum < 0 ||
      !salaryType ||
      !description ||
      !postedBy ||
      active === undefined
    ) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid required fields." }),
        { status: 400 }
      );
    }

    if (offeredSalaryType === "Range" && (maximum === undefined || isNaN(maximum) || maximum < minimum)) {
      return new Response(
        JSON.stringify({ error: "Maximum salary is required for range type and must be greater than minimum." }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newJob = await Job.create({
      position,
      requiredEmployees: Number(requiredEmployees),
      jobCategory,
      subCategory,
      jobLevel,
      jobType,
      experience,
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
      createdAt: new Date(),
    });

    return new Response(JSON.stringify(newJob), {
      status: 201,
    });
  } catch (error) {
    console.error("Error posting job:", error);
    let errorMessage = "Internal Server Error";
    if (error.name === "ValidationError") {
      errorMessage = Object.values(error.errors).map(e => e.message).join(", ");
    } else if (error.name === "MongoServerError") {
      errorMessage = error.message;
    }
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500 }
    );
  }
}