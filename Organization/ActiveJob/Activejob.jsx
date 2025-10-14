"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { BriefcaseBusiness, AlertCircle } from "lucide-react"
import Loading from "@/app/components/ui/loading"

export default function ActiveJobs({ orgId }) {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push("/auth"),
  })

  const [activeJobs, setActiveJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // ✅ Fetch active jobs once authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "organization" && orgId) {
      fetchActiveJobs()
    }
  }, [status, session, orgId])

  const fetchActiveJobs = async () => {
    setIsLoading(true)
    try {
      if (!orgId) throw new Error("Organization ID missing")

      const response = await fetch(`/api/Org/${orgId}/listjob?active=true`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) throw new Error("Failed to fetch jobs")

      const jobs = await response.json()
      setActiveJobs(Array.isArray(jobs) ? jobs : [])
    } catch (error) {
      console.error("Error fetching active jobs:", error)
      alert("Failed to load active jobs")
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Loading while session or page initializing
  if (status === "loading" || isLoading) {
    return <Loading message="Loading active job listings..." fullScreen />
  }

  // ✅ Unauthorized (wrong role)
  if (session?.user?.role !== "organization") {
    router.push("/unauthorized")
    return null
  }

  // ✅ UI Section
  return (
    <div className="flex-1 bg-gray-100 py-10 flex justify-center">
      <div className="container mx-auto max-w-5xl bg-white rounded-xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Active Jobs</h1>
            <p className="text-gray-500 text-sm mt-1">
              View all active job listings posted by your organization.
            </p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-700 bg-transparent border-gray-300 hover:bg-gray-100"
            onClick={() => router.push(`/organization/${orgId}/postjob`)} // ✅ fixed path
          >
            <BriefcaseBusiness className="h-4 w-4" /> Post New Job
          </Button>
        </div>

        {/* Job List */}
        {activeJobs.length === 0 ? (
          <div className="text-center text-gray-600 py-8">No active jobs found.</div>
        ) : (
          <div className="grid gap-6">
            {activeJobs.map((job) => (
              <Card key={job._id} className="border border-gray-200 rounded-lg shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    {job.position}
                    {job.urgent && <AlertCircle className="h-5 w-5 text-red-500" title="Urgent" />}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Category:</strong> {job.jobCategory}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {job.jobLocation}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Type:</strong> {job.jobType}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Salary:</strong>{" "}
                    {job.hideSalary
                      ? "Salary Non Disclosed"
                      : `${job.currency} ${job.minimum}${
                          job.offeredSalaryType === "Range" ? ` - ${job.maximum}` : ""
                        } ${job.salaryType}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Status:</strong> {job.active ? "Active" : "Inactive"}
                  </p>

                  {job.urgent && (
                    <p className="text-sm text-red-500">
                      <strong>Urgent:</strong> This job is marked as urgent
                    </p>
                  )}

                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => router.push(`/organization/Jobpage/${job._id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
