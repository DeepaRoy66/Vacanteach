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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger } from "../../app/components/ui/sidebar"
import { AppSidebar } from "../../app/(pages)/organization/Sidebar"
import { cn } from "../../lib/utilis"
import DeleteJob from "./DeleteJob"

const dropdownOptions = {
  jobCategory: [
    { value: "IT & Telecommunication", label: "IT & Telecommunication" },
    { value: "Primary Education", label: "Primary Education" },
    { value: "Secondary Education", label: "Secondary Education" },
    { value: "Higher Education", label: "Higher Education" },
    { value: "Special Education", label: "Special Education" },
    { value: "Vocational Training", label: "Vocational Training" },
    { value: "Early Childhood Education", label: "Early Childhood Education" },
    { value: "Language Instruction", label: "Language Instruction" },
    { value: "STEM Education", label: "STEM Education" },
    { value: "Arts Education", label: "Arts Education" },
  ],
  subCategory: [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
    { value: "Social Studies", label: "Social Studies" },
    { value: "Foreign Language", label: "Foreign Language" },
    { value: "Special Needs Education", label: "Special Needs Education" },
    { value: "Early Literacy", label: "Early Literacy" },
    { value: "Art and Music", label: "Art and Music" },
    { value: "Physical Education", label: "Physical Education" },
    { value: "Vocational Skills", label: "Vocational Skills" },
  ],
  jobLevel: [
    { value: "Entry Level", label: "Entry Level" },
    { value: "Mid Level", label: "Mid Level" },
    { value: "Senior Level", label: "Senior Level" },
  ],
  jobType: [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
  ],
  currency: [
    { value: "USD", label: "USD" },
    { value: "NPR", label: "NPR" },
    { value: "INR", label: "INR" },
  ],
  salaryType: [
    { value: "Monthly", label: "Monthly" },
    { value: "Yearly", label: "Yearly" },
    { value: "Hourly", label: "Hourly" },
  ],
}

const FormField = ({ label, name, value, onChange, error, type = "text", placeholder, required = false }) => (
  <div className="flex-1">
    <Label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      placeholder={placeholder}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
)

const SelectField = ({ label, name, value, onChange, error, required = false }) => {
  const options = dropdownOptions[name] || []
  return (
    <div className="flex-1">
      <Label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select onValueChange={(val) => onChange(name, val)} value={value || ""}>
        <SelectTrigger className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent className="w-[var(--radix-popper-anchor-width)] bg-white shadow-lg rounded-lg">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

const JobDetailSection = ({ formData, errors, handleChange, handleSelectChange }) => (
  <Accordion type="single" collapsible defaultValue="item-1">
    <AccordionItem value="item-1" className="border border-gray-200 rounded-xl shadow-sm bg-blue-50/50">
      <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-800 hover:no-underline">
        Job Detail
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Job Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          error={errors.position}
          placeholder="e.g., Videographer"
          required
        />
        <FormField
          label="Req No. of Employees"
          name="requiredEmployees"
          value={formData.requiredEmployees}
          onChange={handleChange}
          error={errors.requiredEmployees}
          type="number"
          placeholder="e.g., 3"
          required
        />
        <SelectField
          label="Job Category"
          name="jobCategory"
          value={formData.jobCategory}
          onChange={handleSelectChange}
          error={errors.jobCategory}
          required
        />
        <SelectField
          label="Select Subject"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleSelectChange}
          error={errors.subCategory}
          placeholder="Select Subject"
        />
        <SelectField
          label="Job Level"
          name="jobLevel"
          value={formData.jobLevel}
          onChange={handleSelectChange}
          error={errors.jobLevel}
          required
        />
        <SelectField
          label="Job Type"
          name="jobType"
          value={formData.jobType}
          onChange={handleSelectChange}
          error={errors.jobType}
          required
        />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

const JobLocationSection = ({ formData, errors, handleChange }) => (
  <Accordion type="single" collapsible defaultValue="item-1">
    <AccordionItem value="item-1" className="border border-gray-200 rounded-xl shadow-sm bg-blue-50/50">
      <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-800 hover:no-underline">
        Job Location
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4">
        <FormField
          label="Job Location"
          name="jobLocation"
          value={formData.jobLocation}
          onChange={handleChange}
          error={errors.jobLocation}
          placeholder="Enter Job Location"
          required
        />
        <FormField
          label="Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
          placeholder="e.g., 2 years"
        />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

const SalaryDescriptionSection = ({
  formData,
  errors,
  handleChange,
  handleSelectChange,
  handleSwitchChange,
  setFormData,
  setErrors,
}) => {
  const handleRadioChange = (e) => {
    const value = e.target.value
    setFormData((prev) => ({ ...prev, offeredSalaryType: value }))
    setErrors((prev) => ({ ...prev, offeredSalaryType: "" }))
  }
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="border border-gray-200 rounded-xl shadow-sm bg-blue-50/50">
        <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-800 hover:no-underline">
          Salary & Description
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 space-y-6">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Offered Salary Type <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="Range"
                  checked={formData.offeredSalaryType === "Range"}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Range</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="Fixed"
                  checked={formData.offeredSalaryType === "Fixed"}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Fixed</span>
              </label>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {formData.offeredSalaryType === "Range"
                ? "Provide the minimum to maximum salary in closest range."
                : "Provide the minimum offered salary."}
            </p>
            {errors.offeredSalaryType && <p className="text-sm text-red-500 mt-1">{errors.offeredSalaryType}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <SelectField
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleSelectChange}
              error={errors.currency}
              required
            />
            <FormField
              label="Minimum"
              name="minimum"
              value={formData.minimum}
              onChange={handleChange}
              error={errors.minimum}
              type="number"
              placeholder="e.g., 43000"
              required
            />
            {formData.offeredSalaryType === "Range" && (
              <FormField
                label="Maximum"
                name="maximum"
                value={formData.maximum}
                onChange={handleChange}
                error={errors.maximum}
                type="number"
                placeholder="e.g., 50000"
                required
              />
            )}
            <SelectField
              label="Salary Type"
              name="salaryType"
              value={formData.salaryType}
              onChange={handleSelectChange}
              error={errors.salaryType}
              required
            />
          </div>
          <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <Switch
                  id="hideSalary"
                  checked={formData.hideSalary}
                  onCheckedChange={(checked) => handleSwitchChange("hideSalary", checked)}
                  className={cn(
                    "data-[state=unchecked]:bg-gray",
                    formData.hideSalary ? "bg-green-500" : "bg-green-200"
                  )}
                />
                <Label htmlFor="hideSalary" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Hide Salary
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-center">
                        {'Choose this option to display "Salary Non Disclosed" to job seekers.'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="negotiable"
                  checked={formData.negotiable}
                  onCheckedChange={(checked) => handleSwitchChange("negotiable", checked)}
                  className={cn(
                    "data-[state=unchecked]:bg-gray",
                    formData.negotiable ? "bg-green-500" : "bg-green-200"
                  )}
                />
                <Label htmlFor="negotiable" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Negotiable
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-center">
                        {'Choose this option to indicate that the salary is negotiable.'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg min-h-[150px] focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter job description..."
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function EditJobModal({
  isModalOpen,
  setIsModalOpen,
  selectedJob,
  editFormData,
  setEditFormData,
  onSubmit,
}) {
  const [errors, setErrors] = useState({})

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleEditSelectChange = (name, value) => {
    setEditFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSwitchChange = (name, checked) => {
    setEditFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!editFormData.position.trim()) newErrors.position = "Job position is required"
    if (!editFormData.requiredEmployees.toString().trim()) newErrors.requiredEmployees = "Number of employees is required"
    if (!editFormData.jobCategory.trim()) newErrors.jobCategory = "Job category is required"
    if (!editFormData.jobLevel.trim()) newErrors.jobLevel = "Job level is required"
    if (!editFormData.jobType.trim()) newErrors.jobType = "Job type is required"
    if (!editFormData.jobLocation.trim()) newErrors.jobLocation = "Job location is required"
    if (!editFormData.currency.trim()) newErrors.currency = "Currency is required"
    if (!editFormData.minimum.toString().trim()) newErrors.minimum = "Minimum salary is required"
    if (editFormData.offeredSalaryType === "Range" && !editFormData.maximum.toString().trim())
      newErrors.maximum = "Maximum salary is required for range"
    if (!editFormData.offeredSalaryType.trim()) newErrors.offeredSalaryType = "Offered salary type is required"
    if (!editFormData.salaryType.trim()) newErrors.salaryType = "Salary type is required"
    if (!editFormData.description.trim()) newErrors.description = "Job description is required"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    await onSubmit(e)
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
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <JobDetailSection
                formData={editFormData}
                errors={errors}
                handleChange={handleEditChange}
                handleSelectChange={handleEditSelectChange}
              />
              <JobLocationSection
                formData={editFormData}
                errors={errors}
                handleChange={handleEditChange}
              />
              <SalaryDescriptionSection
                formData={editFormData}
                errors={errors}
                handleChange={handleEditChange}
                handleSelectChange={handleEditSelectChange}
                handleSwitchChange={handleSwitchChange}
                setFormData={setEditFormData}
                setErrors={setErrors}
              />
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
    setEditFormData({
      position: job.position || "",
      requiredEmployees: job.requiredEmployees || "",
      jobCategory: job.jobCategory || "",
      subCategory: job.subCategory || "",
      jobLevel: job.jobLevel || "",
      jobType: job.jobType || "",
      experience: job.experience || "",
      jobLocation: job.jobLocation || "",
      offeredSalaryType: job.offeredSalaryType || "Range",
      currency: job.currency || "USD",
      minimum: job.minimum || "",
      maximum: job.maximum || "",
      salaryType: job.salaryType || "Monthly",
      hideSalary: job.hideSalary || false,
      negotiable: job.negotiable || false,
      description: job.description || "",
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
          <main className="p-4 md:p-6 lg:p-8 max-w-6xl ml-96">
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
                          {selectedJob.currency} {selectedJob.minimum} - {selectedJob.maximum}
                          <span className="block text-xs text-emerald-600">{selectedJob.salaryType}</span>
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <div className="text-gray-600 font-medium">Posted By</div>
                        <div className="flex items-center space-x-2">
                          <div className="bg-emerald-600 text-white rounded-full size-6 flex items-center justify-center text-xs font-medium">
                            {selectedJob.postedBy.charAt(0).toUpperCase()}
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}