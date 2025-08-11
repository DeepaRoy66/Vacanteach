
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
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "../../app/components/ui/accrodion"
import { cn } from "../../lib/utilis"

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
    { value: "Vocational Skills", label: "Vocational Skills" },
    { value: "none", label: "None" },
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
                    "data-[state=unchecked]:bg-gray-300",
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
                    "data-[state=unchecked]:bg-gray-300",
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
              <div className="flex items-center space-x-3">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => handleSwitchChange("active", checked)}
                  className={cn(
                    "data-[state=unchecked]:bg-gray-300",
                    formData.active ? "bg-green-500" : "bg-green-200"
                  )}
                />
                <Label htmlFor="active" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Active
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-center">
                        {'Choose this option to indicate that the job is active.'}
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

export default function EditJobModal({
  isModalOpen,
  setIsModalOpen,
  selectedJob,
  editFormData,
  setEditFormData,
  onSubmit,
}) {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (!editFormData.position?.trim()) newErrors.position = "Job position is required"
    if (!editFormData.requiredEmployees?.toString().trim()) newErrors.requiredEmployees = "Number of employees is required"
    if (Number(editFormData.requiredEmployees) <= 0) newErrors.requiredEmployees = "Number of employees must be positive"
    if (!editFormData.jobCategory?.trim()) newErrors.jobCategory = "Job category is required"
    if (!editFormData.jobLevel?.trim()) newErrors.jobLevel = "Job level is required"
    if (!editFormData.jobType?.trim()) newErrors.jobType = "Job type is required"
    if (!editFormData.jobLocation?.trim()) newErrors.jobLocation = "Job location is required"
    if (!editFormData.currency?.trim()) newErrors.currency = "Currency is required"
    if (!editFormData.minimum?.toString().trim()) newErrors.minimum = "Minimum salary is required"
    if (Number(editFormData.minimum) <= 0) newErrors.minimum = "Minimum salary must be positive"
    if (editFormData.offeredSalaryType === "Range" && !editFormData.maximum?.toString().trim()) {
      newErrors.maximum = "Maximum salary is required for range"
    }
    if (editFormData.offeredSalaryType === "Range" && Number(editFormData.maximum) <= Number(editFormData.minimum)) {
      newErrors.maximum = "Maximum salary must be greater than minimum"
    }
    if (!editFormData.offeredSalaryType?.trim()) newErrors.offeredSalaryType = "Offered salary type is required"
    if (!editFormData.salaryType?.trim()) newErrors.salaryType = "Salary type is required"
    if (!editFormData.description?.trim()) newErrors.description = "Job description is required"
    if (editFormData.active === undefined) newErrors.active = "Active status is required"
    if (!editFormData.postedBy?.trim()) newErrors.postedBy = "Posted by is required"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    console.log("handleSubmit: validationErrors:", validationErrors)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }
    const job_id = selectedJob?._id
    if (!job_id || !job_id.match(/^[0-9a-fA-F]{24}$/)) {
      setErrors({ submit: "Invalid job ID. Please try selecting the job again." })
      setIsSubmitting(false)
      return
    }
    setIsSubmitting(true)
    try {
      await onSubmit(e)
    } catch (error) {
      setErrors({ submit: error.message || "Failed to update job" })
    } finally {
      setIsSubmitting(false)
    }
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
              {errors.submit && <p className="text-sm text-red-500 mt-2">{errors.submit}</p>}
              <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t border-gray-100 flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isSubmitting}>
                  <Save className="size-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  )
}