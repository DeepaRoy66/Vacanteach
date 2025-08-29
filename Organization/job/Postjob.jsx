"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "../../app/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { Input } from "../../app/components/ui/input"
import { Switch } from "../../app/components/ui/switch"
import { Label } from "../../app/components/ui/label"
import { Select,SelectContent,SelectTrigger,SelectItem,SelectValue } from "../../app/components/ui/select"
import { Textarea } from "../../app/components/ui/textarea"
import { Info, Briefcase, MapPin, DollarSign, Clock, Users,Building, Star, Award, Zap, Palette, Heart, BookOpen, GraduationCap, Search, ChevronDown, BarChart2, Eye, Sparkles } from "lucide-react"
import { cn } from "../../lib/utilis"
import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger } from "../../app/components/ui/tooltip"

// Initial form state
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
  active: true,
  description: "",
}

// Dropdown options (abbreviated, add all from your original if needed)
const dropdownOptions = {
  jobCategory: [
    { value: "Early Childhood Education", label: "Early Childhood Education", icon: Heart },
    { value: "Primary Education", label: "Primary Education", icon: BookOpen },
    { value: "Secondary Education", label: "Secondary Education", icon: GraduationCap },
    { value: "Higher Education", label: "Higher Education", icon: Award },
  ],
  jobLevel: [
    { value: "Entry Level(0-3yrs)", label: "Entry Level (0-3yrs)", icon: Star },
    { value: "Mid Level(3-5yrs)", label: "Mid Level (3-5yrs)", icon: Award },
    { value: "Senior Level(5+yrs)", label: "Senior Level (5+yrs)", icon: Star },
  ],
  jobType: [
    { value: "Full-time", label: "Full-time", icon: Clock },
    { value: "Part-time", label: "Part-time", icon: Clock },
    { value: "Contract", label: "Contract", icon: Users },
  ],
  currency: [
    { value: "USD", label: "USD ($)", icon: DollarSign },
    { value: "NPR", label: "NPR (₨)", icon: DollarSign },
    { value: "INR", label: "INR (₹)", icon: DollarSign },
  ],
  salaryType: [
    { value: "Monthly", label: "Monthly", icon: DollarSign },
    { value: "Yearly", label: "Yearly", icon: DollarSign },
  ],
}

// Reusable Input Field
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
      placeholder={placeholder}
      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
)

// Enhanced Select Field
const EnhancedSelectField = ({ label, name, value, onChange, options = [], error, required = false }) => {
  const selectedOption = options.find((opt) => opt.value === value)
  return (
    <div className="flex-1">
      <Label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select onValueChange={(val) => onChange(name, val)} value={value || ""}>
        <SelectTrigger
          className={cn(
            "w-full px-4 py-3 border-2 rounded-xl",
            error && "border-red-300 focus:border-red-500"
          )}
        >
          <div className="flex items-center gap-3 flex-1">
            {selectedOption?.icon && <selectedOption.icon className="h-5 w-5 text-gray-500" />}
            <SelectValue placeholder={`Choose ${label.toLowerCase()}...`} />
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </SelectTrigger>
        <SelectContent className="w-[var(--radix-popper-anchor-width)] bg-white shadow-xl rounded-xl border-2 border-gray-100 max-h-60 overflow-y-auto p-2">
          {options.map((opt) => {
            const IconComponent = opt.icon
            return (
              <SelectItem key={opt.value} value={opt.value} className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-50">
                {IconComponent && <IconComponent className="h-4 w-4 text-gray-500" />}
                <span>{opt.label}</span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500 mt-1 flex items-center gap-1"><Info className="h-4 w-4"/>{error}</p>}
    </div>
  )
}

// Main Component
export default function PostJobPage({ orgId }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const handleSwitchChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.position.trim()) newErrors.position = "Job position is required"
    if (!formData.requiredEmployees || Number(formData.requiredEmployees) <= 0) newErrors.requiredEmployees = "Number of employees must be positive"
    if (!formData.jobCategory) newErrors.jobCategory = "Job category is required"
    if (!formData.jobLevel) newErrors.jobLevel = "Job level is required"
    if (!formData.jobType) newErrors.jobType = "Job type is required"
    if (!formData.jobLocation) newErrors.jobLocation = "Job location is required"
    if (!formData.currency) newErrors.currency = "Currency is required"
    if (!formData.hideSalary && !formData.minimum) newErrors.minimum = "Minimum salary is required"
    if (!formData.description || formData.description.length < 50) newErrors.description = "Description must be at least 50 characters"
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
        requiredEmployees: Number(formData.requiredEmployees),
        minimum: formData.hideSalary ? null : Number(formData.minimum),
        maximum: formData.hideSalary ? null : Number(formData.maximum),
        postedBy: session?.user?.email,
        role: session?.user?.role || "organization",
        org_id: orgId,
      }

      const response = await fetch(`/api/Org/${orgId}/addjob`, {
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
      router.push(`/organization/${orgId}/Jobpage`)
    } catch (error) {
      console.error(error)
      alert(`Failed to post job: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (session?.user?.role !== "organization") {
    router.push("/unauthorized")
    return <div className="min-h-screen flex items-center justify-center text-red-600">Unauthorized</div>
  }

  return (
    <div className="flex-1 bg-gray-100 py-10 flex justify-center">
      <div className="container max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Post Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Job Position" name="position" value={formData.position} onChange={handleChange} required />
          <FormField label="Number of Employees" name="requiredEmployees" type="number" value={formData.requiredEmployees} onChange={handleChange} required />
          <EnhancedSelectField label="Job Category" name="jobCategory" value={formData.jobCategory} onChange={handleSelectChange} options={dropdownOptions.jobCategory} required />
          <EnhancedSelectField label="Job Level" name="jobLevel" value={formData.jobLevel} onChange={handleSelectChange} options={dropdownOptions.jobLevel} required />
          <EnhancedSelectField label="Job Type" name="jobType" value={formData.jobType} onChange={handleSelectChange} options={dropdownOptions.jobType} required />
          <FormField label="Experience" name="experience" value={formData.experience} onChange={handleChange} />
          <FormField label="Job Location" name="jobLocation" value={formData.jobLocation} onChange={handleChange} required />
<EnhancedSelectField label="Currency" name="currency" value={formData.currency} onChange={handleSelectChange} options={dropdownOptions.currency} required />
          <EnhancedSelectField label="Salary Type" name="salaryType" value={formData.salaryType} onChange={handleSelectChange} options={dropdownOptions.salaryType} />
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <Switch checked={formData.hideSalary} onCheckedChange={(val) => handleSwitchChange("hideSalary", val)} id="hideSalary" />
              <Label htmlFor="hideSalary">Hide Salary</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={formData.negotiable} onCheckedChange={(val) => handleSwitchChange("negotiable", val)} id="negotiable" />
              <Label htmlFor="negotiable">Negotiable</Label>
            </div>
          </div>

          {!formData.hideSalary && (
            <div className="flex gap-4">
              <FormField label="Minimum Salary" name="minimum" type="number" value={formData.minimum} onChange={handleChange} required />
              <FormField label="Maximum Salary" name="maximum" type="number" value={formData.maximum} onChange={handleChange} />
            </div>
          )}

          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed job description..."
              rows={6}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
            {isSubmitting ? "Posting..." : "Post Job"}
          </Button>
        </form>
      </div>
    </div>
  )
}
