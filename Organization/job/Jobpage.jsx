"use client"
import { useEffect, useState, useMemo } from "react"
import {
  MapPin,
  Users,
  Building2,
  Clock,
  Eye,
  Edit,
  MoreHorizontal,
  Plus,
  X,
  Save,
  Info,
} from "lucide-react"
import { Button } from "../../app/components/ui/button"
import { Card, CardContent } from "../../app/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../../app/components/ui/dialog"
import { Input } from "../../app/components/ui/input"
import { Label } from "../../app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../app/components/ui/select"
import { Textarea } from "../../app/components/ui/textarea"
import { Switch } from "../../app/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../app/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger } from "../../app/components/ui/sidebar"
import { AppSidebar } from "../../app/(pages)/organization/Sidebar"
import { cn } from "../../lib/utilis"
import DeleteJob from "./DeleteJob"
import EditJobModal from "./Editjob"

export default function JobListPage() {
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

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)
        const response = await fetch('/api/Org/listjob')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch jobs')
        }
        setJobs(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobCategory.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || job.jobCategory === filterCategory
      const matchesLocation = filterLocation === "all" || job.jobLocation === filterLocation
      return matchesSearch && matchesCategory && matchesLocation
    })
  }, [jobs, searchTerm, filterCategory, filterLocation])

  const categories = [...new Set(jobs.map((job) => job.jobCategory))]
  const locations = [...new Set(jobs.map((job) => job.jobLocation))]

  const handleViewClick = (job) => {
    setSelectedJob(job)
    setIsViewModalOpen(true)
  }

  const handleEditClick = (job) => {
    console.log("handleEditClick: selectedJob:", job)
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
      active: job.active !== undefined ? job.active : true,
      description: job.description || "",
      postedBy: job.postedBy || "",
      urgent: job.urgent || false,
    })
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const job_id = selectedJob?._id
    console.log("handleEditSubmit: selectedJob:", selectedJob, "job_id:", job_id)
    if (!job_id || !job_id.match(/^[0-9a-fA-F]{24}$/)) {
      return
    }
    try {
      console.log("handleEditSubmit: editFormData:", editFormData)
      const payload = {
        ...editFormData,
        requiredEmployees: Number(editFormData.requiredEmployees),
        minimum: Number(editFormData.minimum),
        maximum: editFormData.offeredSalaryType === "Range" ? Number(editFormData.maximum) : null,
        subCategory: editFormData.subCategory === "none" ? "" : editFormData.subCategory,
      }
      console.log("handleEditSubmit: payload:", payload)
      console.log("handleEditSubmit: before fetch")
      const response = await fetch(`/api/Org/${job_id}/editjob`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      console.log("handleEditSubmit: response status:", response.status)
      const data = await response.json()
      console.log("handleEditSubmit: response data:", data)
      if (!response.ok) {
        throw new Error(data.error || `Failed to update job (status: ${response.status})`)
      }
      const updatedJob = data
      setJobs((prevJobs) => {
        const newJobs = [...prevJobs]
        const index = newJobs.findIndex((job) => job._id === updatedJob._id)
        if (index !== -1) {
          newJobs[index] = { ...updatedJob }
        }
        return newJobs
      })
      setIsEditModalOpen(false)
      setSelectedJob(null)
      alert(`Job ${job_id} updated successfully!`)
    } catch (error) {
      console.error("Edit job error:", error)
      throw new Error(error.message || "Failed to update job. Please try again.")
    }
  }

  const handleDeleteSuccess = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId))
    if (selectedJob?._id === jobId) {
      setIsViewModalOpen(false)
      setSelectedJob(null)
    }
  }

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar className="w-80 fixed top-16 left-0 h-[calc(100vh-4rem)] z-10" />
          <SidebarInset>
            <div className="flex-1 bg-gray-100 min-h-[calc(100vh-4rem)] ml-80">
              <header className="flex h-12 items-center gap-2 px-4 bg-white border-b border-gray-200">
                <SidebarTrigger className="-ml-1 text-emerald-700 hover:bg-emerald-100" />
                <div className="flex items-center space-x-2 ml-auto">
                  <span className="text-gray-600 font-medium text-sm">Manage Jobs</span>
                  <span className="text-emerald-700 font-semibold text-sm">All Jobs</span>
                </div>
              </header>
              <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                  <p className="text-base md:text-lg text-emerald-700 font-semibold">Loading job listings...</p>
                  <p className="text-sm md:text-base text-emerald-600 mt-2">Please wait while we fetch your data</p>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  if (error) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar className="w-80 fixed top-16 left-0 h-[calc(100vh-4rem)] z-10" />
          <SidebarInset>
            <div className="flex-1 bg-gray-100 min-h-[calc(100vh-4rem)] ml-80">
              <header className="flex h-12 items-center gap-2 px-4 bg-white border-b border-gray-200">
                <SidebarTrigger className="-ml-1 text-emerald-700 hover:bg-emerald-100" />
                <div className="flex items-center space-x-2 ml-auto">
                  <span className="text-gray-600 font-medium text-sm">Manage Jobs</span>
                  <span className="text-emerald-700 font-semibold text-sm">All Jobs</span>
                </div>
              </header>
              <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
                <Card className="bg-white border border-emerald-100 rounded-lg shadow-md p-4 md:p-6 text-center w-full max-w-md">
                  <p className="text-red-600 font-semibold text-sm md:text-base">{error}</p>
                  <Button
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm md:text-base"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </Button>
                </Card>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar className="w-80 fixed top-16 left-0 h-[calc(100vh-4rem)] z-10" />
        <SidebarInset>
          <div className="flex-1 bg-gray-100 min-h-[calc(100vh-4rem)] ml-80">
            <header className="flex h-12 items-center gap-2 px-4 bg-white border-b border-gray-200">
              <SidebarTrigger className="-ml-1 text-emerald-700 hover:bg-emerald-100" />
              <div className="flex items-center space-x-2 ml-auto">
                <span className="text-gray-600 font-medium text-sm">Manage Jobs</span>
                <span className="text-emerald-700 font-semibold text-sm">All Jobs</span>
              </div>
            </header>
            <main className="max-w-full px-4">
              <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="p-2 border rounded w-full md:w-auto text-sm md:text-base"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="p-2 border rounded w-full md:w-auto text-sm md:text-base"
                >
                  <option value="all">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="p-2 border rounded w-full md:w-auto text-sm md:text-base"
                />
              </div>
              {filteredJobs.length === 0 ? (
                <Card className="bg-white border border-emerald-100 rounded-lg shadow-md">
                  <CardContent className="p-6 md:p-12 text-center">
                    <div className="bg-emerald-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="size-6 md:size-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      {jobs.length === 0 ? "No Job is Posted" : "No Jobs Found"}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">
                      {jobs.length === 0
                        ? "You haven't posted any jobs yet. Start by creating your first job posting!"
                        : "No jobs match your current search criteria. Try adjusting your filters."}
                    </p>
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium text-sm md:text-base"
                      onClick={() => window.location.href = "/organization/postjob"}
                    >
                      <Plus className="size-4 mr-2" />
                      Post Your First Job
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white border border-emerald-100 rounded-lg shadow-md overflow-hidden">
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full table-fixed">
                      <thead>
                        <tr className="bg-white border-b border-gray-100">
                          <th className="text-left p-3 font-medium text-gray-700 text-xs md:text-sm w-[30%]">Position</th>
                          <th className="text-left p-3 font-medium text-gray-700 text-xs md:text-sm w-[25%]">Category</th>
                          <th className="text-left p-3 font-medium text-gray-700 text-xs md:text-sm w-[25%]">Employees</th>
                          <th className="text-center p-3 font-medium text-gray-700 text-xs md:text-sm w-[20%]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredJobs.map((job, index) => (
                          <tr
                            key={job._id}
                            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <div className="bg-emerald-100 p-1.5 rounded-lg">
                                  <Building2 className="size-3 md:size-4 text-emerald-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 text-xs md:text-sm">{job.position}</div>
                                  <div className="flex items-center space-x-1 text-xs text-gray-500 mt-0.5">
                                    <Clock className="size-2.5 md:size-3" />
                                    <span>Posted recently</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full">
                                {job.jobCategory}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-1.5 text-gray-700">
                                <Users className="size-3 md:size-3.5" />
                                <span className="text-xs md:text-sm">{job.requiredEmployees} positions</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center justify-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-emerald-600 p-1.5"
                                  onClick={() => handleViewClick(job)}
                                >
                                  <Eye className="size-3 md:size-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-400 hover:text-blue-600 p-1.5"
                                  onClick={() => handleEditClick(job)}
                                >
                                  <Edit className="size-3 md:size-4" />
                                </Button>
                                <DeleteJob
                                  jobId={job._id}
                                  onDelete={handleDeleteSuccess}
                                  onError={setError}
                                />
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-1.5">
                                  <MoreHorizontal className="size-3 md:size-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="md:hidden space-y-4 p-4">
                    {filteredJobs.map((job) => (
                      <Card key={job._id} className="bg-white border border-emerald-100 rounded-lg shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="bg-emerald-100 p-1.5 rounded-lg">
                              <Building2 className="size-4 text-emerald-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{job.position}</div>
                              <div className="flex items-center space-x-1 text-xs text-gray-500 mt-0.5">
                                <Clock className="size-3" />
                                <span>Posted recently</span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <div className="text-gray-600 font-medium">Category</div>
                              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full">
                                {job.jobCategory}
                              </span>
                            </div>
                            <div>
                              <div className="text-gray-600 font-medium">Employees</div>
                              <div className="flex items-center space-x-1.5 text-gray-700">
                                <Users className="size-3.5" />
                                <span>{job.requiredEmployees} positions</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-center space-x-2 mt-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-emerald-600 p-1.5"
                              onClick={() => handleViewClick(job)}
                            >
                              <Eye className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-blue-600 p-1.5"
                              onClick={() => handleEditClick(job)}
                            >
                              <Edit className="size-4" />
                            </Button>
                            <DeleteJob
                              jobId={job._id}
                              onDelete={handleDeleteSuccess}
                              onError={setError}
                            />
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-1.5">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-100 p-4">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                      <div className="text-xs text-emerald-700">
                        Showing <span className="font-semibold">{filteredJobs.length}</span> of{" "}
                        <span className="font-semibold">{jobs.length}</span> jobs
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent text-xs px-3 py-1"
                        >
                          Previous
                        </Button>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-emerald-600 text-white hover:bg-emerald-700 w-6 h-6 text-xs"
                          >
                            1
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-700 hover:bg-emerald-50 w-6 h-6 text-xs"
                          >
                            2
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-700 hover:bg-emerald-50 w-6 h-6 text-xs"
                          >
                            3
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent text-xs px-3 py-1"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </main>
            {selectedJob && (
              <>
                <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                  <DialogContent className="sm:max-w-[425px] md:max-w-[600px] bg-white rounded-lg">
                    <DialogHeader className="flex justify-between items-center">
                      <DialogTitle className="text-lg md:text-xl text-gray-900">
                        {selectedJob.position}
                      </DialogTitle>
                      <DialogClose asChild>
                        <Button variant="ghost" size="sm" className="p-1">
                          <X className="size-4 text-gray-600" />
                        </Button>
                      </DialogClose>
                    </DialogHeader>
                    <div className="p-4 space-y-4 text-sm md:text-base">
                      <div className="flex items-center space-x-2">
                        <Building2 className="size-4 text-emerald-600" />
                        <span className="font-medium text-gray-900">{selectedJob.position}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-gray-600 font-medium">Category</div>
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full">
                            {selectedJob.jobCategory}
                          </span>
                        </div>
                        <div>
                          <div className="text-gray-600 font-medium">Employees</div>
                          <div className="flex items-center space-x-1.5 text-gray-700">
                            <Users className="size-3.5" />
                            <span>{selectedJob.requiredEmployees} positions</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 font-medium">Location</div>
                          <div className="flex items-center space-x-1.5 text-gray-700">
                            <MapPin className="size-3.5" />
                            <span>{selectedJob.jobLocation}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 font-medium">Salary</div>
                          <div className="bg-emerald-50 text-emerald-800 p-2 rounded-md text-xs font-medium">
                            {selectedJob.hideSalary ? "Salary Non Disclosed" : `${selectedJob.currency} ${selectedJob.minimum}${selectedJob.offeredSalaryType === "Range" ? ` - ${selectedJob.maximum}` : ""}`}
                            <span className="block text-xs text-emerald-600">{selectedJob.salaryType}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 font-medium">Status</div>
                          <div className="flex items-center space-x-1.5 text-gray-700">
                            <span
                              className={cn(
                                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                selectedJob.active !== undefined && selectedJob.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              )}
                            >
                              {selectedJob.active !== undefined && selectedJob.active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <div className="text-gray-600 font-medium">Posted By</div>
                          <div className="flex items-center space-x-2">
                            <div className="bg-emerald-600 text-white rounded-full size-6 flex items-center justify-center text-xs font-medium">
                              {selectedJob.postedBy?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-gray-800">{selectedJob.postedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="size-3" />
                        <span>Posted recently</span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <EditJobModal
                  isModalOpen={isEditModalOpen}
                  setIsModalOpen={setIsEditModalOpen}
                  selectedJob={selectedJob}
                  editFormData={editFormData}
                  setEditFormData={setEditFormData}
                  onSubmit={handleEditSubmit}
                />
              </>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}