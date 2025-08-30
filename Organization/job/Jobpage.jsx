"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "../../app/components/ui/button"
import { Card,CardContent,CardHeader,CardTitle } from "../../app/components/ui/card"
import { Badge } from "../../app/components/ui/badge"
import {
  Briefcase,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Edit3,
  Trash2,
  Zap,
} from "lucide-react"
import { cn } from "../../lib/utilis"

const JobCard = ({ job, onEdit, onDelete }) => (
  <Card className="w-full border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <CardTitle className="text-xl font-bold text-gray-800 mb-1">{job.position}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{job.requiredEmployees} positions</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{job.jobType}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.jobLocation}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">{job.jobCategory}</Badge>
            {job.subCategory && <Badge variant="outline">{job.subCategory}</Badge>}
            <Badge variant="outline">{job.jobLevel}</Badge>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <Button variant="ghost" size="sm" onClick={() => onEdit(job)} className="h-8 w-8 p-0">
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(job._id)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-sm text-gray-600 mb-3">
        <p className="mb-1">Experience: {job.experience || "Not specified"}</p>
        <p className="mb-1">Description: {job.description.substring(0, 150)}...</p>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          {!job.hideSalary && (
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {job.offeredSalaryType === "Range"
                ? `${job.currency} ${job.minimum} - ${job.maximum} ${job.salaryType}`
                : `${job.currency} ${job.minimum} ${job.salaryType}`}
              {job.negotiable && <span>(Negotiable)</span>}
            </span>
          )}
          {job.hideSalary && <span>Salary: Non Disclosed</span>}
          <span className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            {job.active ? "Active" : "Inactive"}
          </span>
        </div>
        <Badge className={cn("text-xs", job.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800")}>
          {job.active ? "Live" : "Draft"}
        </Badge>
      </div>
    </CardContent>
  </Card>
)

export default function JobListPage({ orgId }) {
  const { data: session, status } = useSession({ required: true })
  const router = useRouter()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (status === "authenticated") {
      fetchJobs()
    }
  }, [status, orgId])

  const fetchJobs = async () => {
    if (!orgId) {
      setError("Organization ID is required")
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const response = await fetch(`/api/Org/listjob?orgId=${orgId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch jobs")
      }
      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (err) {
      setError(err.message)
      console.error("Error fetching jobs:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (jobId) => {
    if (!confirm("Are you sure you want to delete this job?")) return
    try {
      const response = await fetch(`/api/Org/deletejob`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, orgId }),
      })
      if (!response.ok) {
        throw new Error("Failed to delete job")
      }
      fetchJobs()
      alert("Job deleted successfully!")
    } catch (err) {
      alert(`Failed to delete job: ${err.message}`)
      console.error("Error deleting job:", err)
    }
  }

  const handleEdit = (job) => {
    router.push(`/organization/${orgId}/postjob?edit=${job._id}`)
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-blue-600 text-xl">Loading...</div>
      </div>
    )
  }

  if (session?.user?.role !== "organization") {
    router.push("/unauthorized")
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-lg">You are not authorized to view organization jobs</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-lg">Error: {error}</div>
        <Button
          onClick={fetchJobs}
          className="mt-4 bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-md px-6 py-3"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Your Job Listings</h1>
          <p className="text-gray-600 mt-2">Manage and view all jobs posted for your organization.</p>
        </div>
        <Button
          onClick={() => router.push(`/organization/${orgId}/postjob`)}
          className={cn(
            "px-6 py-3 text-lg font-semibold rounded-xl shadow-md",
            "bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-200",
            "transition-all duration-300"
          )}
        >
          Post New Job
        </Button>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="w-full h-64 animate-pulse bg-gray-200 rounded-xl"></Card>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
          <p className="text-gray-500 mb-6">Get started by posting your first job listing.</p>
          <Button
            onClick={() => router.push(`/organization/${orgId}/postjob`)}
            className="bg-green-600 text-white hover:bg-green-700 rounded-xl shadow-md px-6 py-3"
          >
            Post Your First Job
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}