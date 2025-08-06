
"use client"

import { useEffect, useState } from "react"
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
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger } from "../../app/components/ui/sidebar"
import { AppSidebar } from "../../app/(pages)/organization/Sidebar"
import DeleteJob from "./DeleteJob"

const dropdownOptions = {
  jobCategory: [
    { value: "IT & Telecommunication", label: "IT & Telecommunication" },
    { value: "Primary Education", label: "Primary Education" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
    { value: "Human Resources", label: "Human Resources" },
  ],
  subCategory: [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
  ],
  jobLevel: [
    { value: "Entry Level", label: "Entry Level" },
    { value: "Mid Level", label: "Mid Level" },
    { value: "Senior Level", label: "Senior Level" },
    { value: "Director", label: "Director" },
    { value: "Executive", label: "Executive" },
  ],
  jobType: [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
    { value: "Temporary", label: "Temporary" },
    { value: "Internship", label: "Internship" },
  ],
  currency: [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "JPY", label: "JPY" },
    { value: "CAD", label: "CAD" },
  ],
  salaryType: [
    { value: "Monthly", label: "Monthly" },
    { value: "Annually", label: "Annually" },
    { value: "Hourly", label: "Hourly" },
    { value: "Weekly", label: "Weekly" },
  ],
  offeredSalaryType: [
    { value: "Range", label: "Range" },
    { value: "Fixed", label: "Fixed" },
  ],
}

function EditJobModal({
  isModalOpen,
  setIsModalOpen,
  selectedJob,
  editFormData,
  setEditFormData,
  onSubmit,
}) {
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSelectChange = (name, value) => {
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name, checked) => {
    setEditFormData((prev) => ({ ...prev, [name]: checked }))
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[800px] bg-white rounded-xl max-h-[90vh] flex flex-col">
        <TooltipProvider>
          <DialogHeader className="flex justify-between items-center sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100">
            <DialogTitle className="text-xl md:text-2xl font-semibold text-gray-900">Edit Job</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
                <X className="size-5 text-gray-600" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="p-6 overflow-y-auto flex-1">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                      Position <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="position"
                      name="position"
                      value={editFormData.position}
                      onChange={handleEditChange}
                      required
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requiredEmployees" className="text-sm font-medium text-gray-700">
                      Required Employees <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="requiredEmployees"
                      name="requiredEmployees"
                      type="number"
                      value={editFormData.requiredEmployees}
                      onChange={handleEditChange}
                      required
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobCategory" className="text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      name="jobCategory"
                      value={editFormData.jobCategory}
                      onValueChange={(value) => handleEditSelectChange("jobCategory", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {dropdownOptions.jobCategory.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subCategory" className="text-sm font-medium text-gray-700">
                      Subject
                    </Label>
                    <Select
                      name="subCategory"
                      value={editFormData.subCategory}
                      onValueChange={(value) => handleEditSelectChange("subCategory", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {dropdownOptions.subCategory.map((sub) => (
                          <SelectItem key={sub.value} value={sub.value}>
                            {sub.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobLevel" className="text-sm font-medium text-gray-700">
                      Job Level <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      name="jobLevel"
                      value={editFormData.jobLevel}
                      onValueChange={(value) => handleEditSelectChange("jobLevel", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select a job level" />
                      </SelectTrigger>
                      <SelectContent>
                        {dropdownOptions.jobLevel.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobType" className="text-sm font-medium text-gray-700">
                      Job Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      name="jobType"
                      value={editFormData.jobType}
                      onValueChange={(value) => handleEditSelectChange("jobType", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select a job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {dropdownOptions.jobType.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobLocation" className="text-sm font-medium text-gray-700">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="jobLocation"
                      name="jobLocation"
                      value={editFormData.jobLocation}
                      onChange={handleEditChange}
                      required
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                      Experience
                    </Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={editFormData.experience}
                      onChange={handleEditChange}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="offeredSalaryType" className="text-sm font-medium text-gray-700">
                    Offered Salary Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      name="offeredSalaryType"
                      value={editFormData.offeredSalaryType}
                      onValueChange={(value) => handleEditSelectChange("offeredSalaryType", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select a salary type" />
                      </SelectTrigger>
                      <SelectContent>
                        {dropdownOptions.offeredSalaryType.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                      Currency <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      name="currency"
                      value={editFormData.currency}
                      onValueChange={(value) => handleEditSelectChange("currency", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {dropdownOptions.currency.map((cur) => (
                          <SelectItem key={cur.value} value={cur.value}>
                            {cur.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minimum" className="text-sm font-medium text-gray-700">
                      Minimum Salary <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="minimum"
                      name="minimum"
                      type="number"
                      value={editFormData.minimum}
                      onChange={handleEditChange}
                      required
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maximum" className="text-sm font-medium text-gray-700">
                      Maximum Salary{" "}
                      {editFormData.offeredSalaryType === "Range" && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id="maximum"
                      name="maximum"
                      type="number"
                      value={editFormData.maximum}
                      onChange={handleEditChange}
                      required={editFormData.offeredSalaryType === "Range"}
                      className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryType" className="text-sm font-medium text-gray-700">
                    Salary Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    name="salaryType"
                    value={editFormData.salaryType}
                    onValueChange={(value) => handleEditSelectChange("salaryType", value)}
                    >
                      <SelectTrigger className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                        <SelectValue placeholder="Select a salary type" />
                      </SelectTrigger>
                      <SelectContent>
                        {dropdownOptions.salaryType.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hideSalary"
                      checked={editFormData.hideSalary}
                      onCheckedChange={(checked) => handleSwitchChange("hideSalary", checked)}
                    />
                    <Label htmlFor="hideSalary" className="flex items-center gap-1 text-sm font-medium text-gray-700 cursor-pointer">
                      Hide Salary
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Choose this option to display "Salary Non Disclosed" to job seekers.
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="negotiable"
                      checked={editFormData.negotiable}
                      onCheckedChange={(checked) => handleSwitchChange("negotiable", checked)}
                    />
                    <Label htmlFor="negotiable" className="flex items-center gap-1 text-sm font-medium text-gray-700 cursor-pointer">
                      Negotiable
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>Choose this option to indicate that the salary is negotiable.</TooltipContent>
                      </Tooltip>
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="min-h-[120px] border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t border-gray-100 flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Save className="size-4 mr-2" />
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  )
}

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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobCategory.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || job.jobCategory === filterCategory
    const matchesLocation = filterLocation === "all" || job.jobLocation === filterLocation
    return matchesSearch && matchesCategory && matchesLocation
  })

  const categories = [...new Set(jobs.map((job) => job.jobCategory))]
  const locations = [...new Set(jobs.map((job) => job.jobLocation))]

  const handleViewClick = (job) => {
    setSelectedJob(job)
    setIsViewModalOpen(true)
  }

  const handleEditClick = (job) => {
    setSelectedJob(job)
    const validJobCategory = dropdownOptions.jobCategory.find(
      (cat) => cat.value === job.jobCategory
    )?.value || ""
    const validSubCategory = dropdownOptions.subCategory.find(
      (sub) => sub.value === job.subCategory
    )?.value || ""
    
    setEditFormData({
      position: job.position || "",
      requiredEmployees: job.requiredEmployees || "",
      jobCategory: validJobCategory,
      subCategory: validSubCategory,
      jobLevel: job.jobLevel || "",
      jobType: job.jobType || "",
      experience: job.experience || "",
      jobLocation: job.jobLocation || "",
      offeredSalaryType: job.offeredSalaryType || "",
      currency: job.currency || "",
      minimum: job.minimum || "",
      maximum: job.maximum || "",
      salaryType: job.salaryType || "",
      hideSalary: job.hideSalary || false,
      negotiable: job.negotiable || false,
      description: job.description || "",
      postedBy: job.postedBy || "",
    })
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const job_id = selectedJob?._id
    try {
      const response = await fetch(`/api/Org/${job_id}/editjob`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update job")
      }
      const updatedJob = await response.json()
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
      )
      setIsEditModalOpen(false)
      setSelectedJob(null)
    } catch (err) {
      console.error("Edit job error:", err)
      setError(err.message)
    }
  }

  const handleDeleteSuccess = (jobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId))
  }

  const ViewJobModal = ({ isOpen, setIsOpen, job }) => {
    if (!job) return null

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Position</Label>
              <div className="col-span-3">{job.position}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Category</Label>
              <div className="col-span-3">{job.jobCategory}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Sub Category</Label>
              <div className="col-span-3">{job.subCategory || "N/A"}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Job Level</Label>
              <div className="col-span-3">{job.jobLevel}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Job Type</Label>
              <div className="col-span-3">{job.jobType}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Experience</Label>
              <div className="col-span-3">{job.experience || "N/A"}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Location</Label>
              <div className="col-span-3">{job.jobLocation}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Salary</Label>
              <div className="col-span-3">
                {job.hideSalary ? "Hidden" : `${job.currency} ${job.minimum} - ${job.maximum || "N/A"} (${job.salaryType})`}
                {job.negotiable && " (Negotiable)"}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Employees Needed</Label>
              <div className="col-span-3">{job.requiredEmployees}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Description</Label>
              <div className="col-span-3">{job.description}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Posted By</Label>
              <div className="col-span-3">{job.postedBy}</div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar className="w-64 fixed left-0 top-0 h-screen" />
          <SidebarInset className="flex-1 ml-48 bg-gradient-to-br from-emerald-50 to-green-100">
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-10">
              <SidebarTrigger className="-ml-1 text-emerald-700 hover:bg-emerald-100" />
              <div className="flex items-center space-x-2 ml-auto">
                <span className="text-gray-600 font-medium text-sm">Manage Jobs</span>
                <span className="text-emerald-700 font-semibold text-sm">All Jobs</span>
              </div>
            </header>
            <div className="min-h-screen flex items-center justify-center px-4">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-base md:text-lg text-emerald-700 font-semibold">Loading job listings...</p>
                <p className="text-sm md:text-base text-emerald-600 mt-2">Please wait while we fetch your data</p>
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
          <AppSidebar className="w-64 fixed left-0 top-0 h-screen" />
          <SidebarInset className="flex-1 ml-48 bg-gradient-to-br from-emerald-50 to-green-100">
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-10">
              <SidebarTrigger className="-ml-1 text-emerald-700 hover:bg-emerald-100" />
              <div className="flex items-center space-x-2 ml-auto">
                <span className="text-gray-600 font-medium text-sm">Manage Jobs</span>
                <span className="text-emerald-700 font-semibold text-sm">All Jobs</span>
              </div>
            </header>
            <div className="min-h-screen flex items-center justify-center px-4">
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
          </SidebarInset>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar className="w-64 fixed left-0 top-0 h-screen" />
        <SidebarInset className="flex-1 ml-48 bg-gradient-to-br from-emerald-50 to-green-100">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 z-10">
            <SidebarTrigger className="-ml-1 text-emerald-700 hover:bg-emerald-100" />
            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-gray-600 font-medium text-sm">Manage Jobs</span>
              <span className="text-emerald-700 font-semibold text-sm">All Jobs</span>
            </div>
          </header>
          <main className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
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
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium text-sm md:text-base">
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
              <ViewJobModal
                isOpen={isViewModalOpen}
                setIsOpen={setIsViewModalOpen}
                job={selectedJob}
              />
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
