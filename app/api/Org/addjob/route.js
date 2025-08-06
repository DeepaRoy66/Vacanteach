import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";

export async function POST(req) {
  try {
    const body = await req.json();

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
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400 }
      );
    }

    if (offeredSalaryType === "Range" && !maximum) {
      return new Response(
        JSON.stringify({ error: "Maximum salary is required for range type." }),
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
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}