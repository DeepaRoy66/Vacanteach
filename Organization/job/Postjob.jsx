"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Sidebar,SidebarInset,SidebarProvider} from "../../app/components/ui/sidebar"
import { AppSidebar } from "../../app/(pages)/organization/Sidebar"
import { Button } from "../../app/components/ui/button"
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@radix-ui/react-accordion"
import { Input } from "../../app/components/ui/input"
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "../../app/components/ui/select"
import { Switch } from "../../app/components/ui/switch"
import { Label } from "../../app/components/ui/label"
import { Textarea } from "../../app/components/ui/textarea"
import { BarChart2, Eye, Sparkles, Info } from "lucide-react"
import { cn } from "../../lib/utilis"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../app/components/ui/tooltip"

const initialFormData = {
  position: "",
  requiredEmployees: "",
  jobCategory: "",
  subCategory: "",
  jobLevel: "",
  jobType: "",
  experience: "",
  jobLocation: "",
  offeredSalaryType: "Range",
  currency: "USD",
  minimum: "",
  maximum: "",
  salaryType: "Monthly",
  hideSalary: false,
  negotiable: false,
  description: "",
}

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

export default function PostJobPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push("/auth"),
  })
  const router = useRouter()
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-blue-600 text-xl">Loading...</div>
      </div>
    )
  }

  if (session.user.role !== "organization") {
    router.push("/unauthorized");
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600 text-xl">Unauthorized: Only organizations can post jobs.</div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.position.trim()) newErrors.position = "Job position is required"
    if (!formData.requiredEmployees.toString().trim()) newErrors.requiredEmployees = "Number of employees is required"
    if (!formData.jobCategory.trim()) newErrors.jobCategory = "Job category is required"
    if (!formData.jobLevel.trim()) newErrors.jobLevel = "Job level is required"
    if (!formData.jobType.trim()) newErrors.jobType = "Job type is required"
    if (!formData.jobLocation.trim()) newErrors.jobLocation = "Job location is required"
    if (!formData.currency.trim()) newErrors.currency = "Currency is required"
    if (!formData.minimum.toString().trim()) newErrors.minimum = "Minimum salary is required"
    if (formData.offeredSalaryType === "Range" && !formData.maximum.toString().trim())
      newErrors.maximum = "Maximum salary is required for range"
    if (!formData.offeredSalaryType.trim()) newErrors.offeredSalaryType = "Offered salary type is required"
    if (!formData.salaryType.trim()) newErrors.salaryType = "Salary type is required"
    if (!formData.description.trim()) newErrors.description = "Job description is required"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    try {
      const jobData = {
        ...formData,
        postedBy: session?.user?.email,
        role: session?.user?.role || "organization",
        createdAt: new Date().toISOString(),
      }
      const response = await fetch("/api/Org/addjob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to post job")
      }
      alert("Job posted successfully!")
      setFormData(initialFormData)
      router.push("/organization/Jobpage")
    } catch (error) {
      console.error("Error posting job:", error)
      alert(`Failed to post job: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex-1">
        <div className="flex flex-1">
          <div className="w-80 bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <AppSidebar />
          </div>
          <SidebarInset>
            <div className="flex-1 bg-gray-100 py-10 flex justify-center">
              <div className="container mx-auto max-w-5xl bg-white rounded-xl shadow-lg p-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Job Post</h1>
                    <p className="text-gray-500 text-sm mt-1">
                      Enter relevant information about the job position to set up your listing effectively.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-gray-700 bg-transparent border-gray-300 hover:bg-gray-100"
                    >
                      <BarChart2 className="h-4 w-4" /> Load Balance
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-gray-700 bg-transparent border-gray-300 hover:bg-gray-100"
                    >
                      <Eye className="h-4 w-4" /> Preview Job
                    </Button>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <JobDetailSection
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                  />
                  <JobLocationSection formData={formData} errors={errors} handleChange={handleChange} />
                  <SalaryDescriptionSection
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                    handleSwitchChange={handleSwitchChange}
                    setFormData={setFormData}
                    setErrors={setErrors}
                  />
                  <div className="flex items-center justify-between mt-6 py-2 px-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Switch id="customizeJobDetail" />
                      <Label
                        htmlFor="customizeJobDetail"
                        className="text-sm font-medium text-gray-700 flex items-center gap-1"
                      >
                        Customize Job Detail
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs text-center">
                              {"Choose this option to add your custom content to the job detail page."}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                    </div>
                  </div>
                  <div className="flex justify-end items-center pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200",
                        isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md",
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Sparkles className="h-4 w-4 animate-spin mr-2" /> Saving...
                        </>
                      ) : (
                        "Save & Submit"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}