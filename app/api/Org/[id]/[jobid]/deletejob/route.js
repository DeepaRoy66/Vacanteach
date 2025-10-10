// app/api/Org/[id]/[jobid]/deletejob/route.js
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../auth/[...nextauth]/route"
import { connectToDatabase } from "@/lib/mongoose"
import Job from "@/lib/models/Job"
import JobStats from "@/lib/models/jobstats"
import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
  try {
    const { id: orgId, jobid } = params
    if (!jobid || !jobid.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 })
    }

    // Validate session
    const session = await getServerSession(authOptions)
    console.log("Session:", session) // Debug log
    if (!session || !session.user || session.user.role !== "organization") {
      return NextResponse.json({ error: "Unauthorized: Only organizations can delete jobs" }, { status: 401 })
    }

    // Connect to database
    await connectToDatabase()

    const job = await Job.findById(jobid).select("org_id posted_by")
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    if (job.org_id !== orgId) {
      return NextResponse.json(
        { error: "Unauthorized: You do not have permission to delete this job" },
        { status: 403 },
      )
    }

    const deletedJob = await Job.findByIdAndDelete(jobid, { lean: true })
    if (!deletedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Update job stats for the current month
    const currentMonth = new Date().toISOString().slice(0, 7)
    await JobStats.findOneAndUpdate({ month: currentMonth }, { $inc: { jobCount: -1 } }, { upsert: true, new: true })

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting job:", error.message)
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 })
  }
}
