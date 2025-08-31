"use client"
import { useEffect, useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Eye, Edit, Plus, X } from "lucide-react"
import { Button } from "../../app/components/ui/button"
import { Card } from "../../app/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../../app/components/ui/dialog"
import DeleteJob from "./DeleteJob"
import EditJobModal from "./Editjob"

export default function JobListPage({ orgId }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")
  const [selectedJob, setSelectedJob] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({})

  // ---------- Fetch jobs ----------
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
      const response = await fetch(`/api/Org/${orgId}/listjob`)
      if (!response.ok) throw new Error("Failed to fetch jobs")

      const data = await response.json()
      setJobs(Array.isArray(data) ? data : data.jobs || [])
    } catch (err) {
      setError(err.message)
      console.error("Error fetching jobs:", err)
    } finally {
      setLoading(false)
    }
  }

  // ---------- Filters ----------
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobCategory?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || job.jobCategory === filterCategory
      const matchesLocation = filterLocation === "all" || job.jobLocation === filterLocation
      return matchesSearch && matchesCategory && matchesLocation
    })
  }, [jobs, searchTerm, filterCategory, filterLocation])

  const categories = [...new Set(jobs.map((job) => job.jobCategory).filter(Boolean))]
  const locations = [...new Set(jobs.map((job) => job.jobLocation).filter(Boolean))]

  // ---------- Actions ----------
  const handleViewClick = (job) => {
    setSelectedJob(job)
    setIsViewModalOpen(true)
  }

  const handleEditClick = (job) => {
    setSelectedJob(job)
    setEditFormData({
      position: job.position || "",
      requiredEmployees: job.requiredEmployees?.toString() || "",
      jobCategory: job.jobCategory || "",
      subCategory: job.subCategory || "none",
      jobLevel: job.jobLevel || "",
      jobType: job.jobType || "",
      experience: job.experience || "",
      jobLocation: job.jobLocation || "",
      offeredSalaryType: job.offeredSalaryType || "Range",
      currency: job.currency || "USD",
      minimum: job.minimum?.toString() || "",
      maximum: job.maximum?.toString() || "",
      salaryType: job.salaryType || "Monthly",
      hideSalary: job.hideSalary || false,
      negotiable: job.negotiable || false,
      active: job.active ?? true,
      description: job.description || "",
      postedBy: session?.user?.email || job.postedBy || "",
      urgent: job.urgent || false,
    })
    setIsEditModalOpen(true)
  }

  const handleDeleteSuccess = (jobId) => {
    setJobs((prev) => prev.filter((job) => job._id !== jobId))
    if (selectedJob?._id === jobId) {
      setIsViewModalOpen(false)
      setSelectedJob(null)
    }
  }

  // ---------- Guard checks ----------
  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="animate-pulse text-emerald-600 text-lg">Loading job listings...</p>
      </div>
    )
  }

  if (session?.user?.role !== "organization") {
    router.push("/unauthorized")
    return null
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6 text-center">
          <p className="text-red-600">{error}</p>
          <Button className="mt-4" onClick={fetchJobs}>
            Retry
          </Button>
        </Card>
      </div>
    )
  }

  // ---------- UI ----------
  return (
    <div className="flex-1 bg-gray-100 min-h-screen">
      <main className="px-4">
        {/* Filters */}
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="p-2 border rounded w-full md:w-auto"
          />
        </div>

        {/* No jobs */}
        {filteredJobs.length === 0 ? (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">{jobs.length === 0 ? "No Job is Posted" : "No Jobs Found"}</h3>
            <p className="text-gray-600 mb-4">
              {jobs.length === 0
                ? "You haven't posted any jobs yet. Start by creating your first job posting!"
                : "No jobs match your filters. Try adjusting them."}
            </p>
            <Button onClick={() => router.push(`/organization/${orgId}/postjob`)}>
              <Plus className="mr-2 h-4 w-4" /> Post a Job
            </Button>
          </Card>
        ) : (
          <Card className="overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left">Position</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Employees</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{job.position}</td>
                      <td className="p-3">{job.jobCategory}</td>
                      <td className="p-3">{job.requiredEmployees}</td>
                      <td className="p-3 text-center flex justify-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewClick(job)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditClick(job)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteJob jobId={job._id} onDelete={handleDeleteSuccess} onError={setError} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              {filteredJobs.map((job) => (
                <Card key={job._id} className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{job.position}</p>
                      <p className="text-sm text-gray-600">
                        {job.jobCategory} • {job.jobLocation}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewClick(job)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(job)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DeleteJob jobId={job._id} onDelete={handleDeleteSuccess} onError={setError} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </main>

      {/* View Modal */}
      {selectedJob && (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedJob.position}</DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Category:</strong> {selectedJob.jobCategory}
              </p>
              <p>
                <strong>Employees:</strong> {selectedJob.requiredEmployees}
              </p>
              <p>
                <strong>Location:</strong> {selectedJob.jobLocation}
              </p>
              <p>
                <strong>Status:</strong> {selectedJob.active ? "Active" : "Inactive"}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Modal */}
      {selectedJob && (
        <EditJobModal
          orgId={orgId}
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          selectedJob={selectedJob}
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          onSubmit={() => fetchJobs()}
          jobId={selectedJob._id}
        />
      )}
    </div>
  )
}
