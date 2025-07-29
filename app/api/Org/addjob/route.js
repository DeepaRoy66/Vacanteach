import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";

export async function POST(req) {
  try {
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
      !minimum ||
      !maximum ||
      !currency ||
      !salaryType
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newJob = await Job.create({
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
