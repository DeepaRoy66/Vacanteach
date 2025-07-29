import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import Job from "../../../../lib/models/Job";

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch jobs." });
  }
}
