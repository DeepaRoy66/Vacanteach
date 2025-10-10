
import { connectToDatabase } from "@/lib/mongoose";
import JobStats from "@/lib/models/jobstats";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    if (!month) {
      return NextResponse.json(
        { error: "Month parameter is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const stats = await JobStats.findOne({ month }).lean();
    return NextResponse.json(stats || { jobCount: 0 }, { status: 200 });
  } catch (error) {
    console.error("Error fetching job stats:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch job stats", details: error.message },
      { status: 500 }
    );
  }
}
