"use client"
import { useEffect, useState } from "react"
import {
  MapPin,
  Users,
  Briefcase,
  Clock,
  Save,
  Info,
  DollarSign,
  Sparkles,
  ChevronDown,
  Search,
  Heart,
  BookOpen,
  GraduationCap,
  Award,
  Star,
  Settings,
  Zap,
  Music,
  Target,
  Building,
  Code,
  Palette,
  Activity,
  AlertCircle,
  X,
} from "lucide-react"
import { Button } from "../../app/components/ui/button"
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
import { cn } from "../../lib/utilis"

const dropdownOptions = {
  jobCategory: [
    { value: "Early Childhood Education", label: "Early Childhood Education", icon: Heart },
    { value: "Primary Education", label: "Primary Education", icon: BookOpen },
    { value: "Secondary Education", label: "Secondary Education", icon: GraduationCap },
    { value: "Higher Education", label: "Higher Education", icon: Award },
    { value: "Special Education", label: "Special Education", icon: Star },
    { value: "Vocational Training", label: "Vocational Training", icon: Settings },
    { value: "Language Instruction", label: "Language Instruction", icon: BookOpen },
    { value: "STEM Education", label: "STEM Education", icon: Zap },
    { value: "Arts Education", label: "Arts Education", icon: Palette },
    { value: "Physical Education", label: "Physical Education", icon: Activity },
    { value: "Computer & IT Education", label: "Computer & IT Education", icon: Code },
    { value: "Educational Management", label: "Educational Management", icon: Building },
  ],
   subCategory: {
      "Early Childhood Education": [
        { value: "Pre-School Teaching", label: "Pre-School Teaching", icon: Heart },
        { value: "Kindergarten Teaching", label: "Kindergarten Teaching", icon: Heart },
      ],
      "Primary Education": [
        { value: "Mathematics", label: "Mathematics", icon: Target },
        { value: "Science", label: "Science", icon: Zap },
        { value: "English", label: "English", icon: BookOpen },
        { value: "Nepali", label: "Nepali", icon: BookOpen },
        { value: "Social Studies", label: "Social Studies", icon: Users },
      ],
      "Secondary Education": [
        { value: "Mathematics", label: "Mathematics", icon: Target },
        { value: "Science", label: "Science", icon: Zap },
        { value: "English", label: "English", icon: BookOpen },
        { value: "Nepali", label: "Nepali", icon: BookOpen },
        { value: "Social Studies", label: "Social Studies", icon: Users },
        { value: "Computer Science", label: "Computer Science", icon: Code },
        { value: "Economics", label: "Economics", icon: DollarSign },
      ],
      "Higher Education": [
        { value: "Mathematics", label: "Mathematics", icon: Target },
        { value: "Physics", label: "Physics", icon: Zap },
        { value: "Chemistry", label: "Chemistry", icon: Zap },
        { value: "Biology", label: "Biology", icon: Zap },
        { value: "English", label: "English", icon: BookOpen },
        { value: "Nepali", label: "Nepali", icon: BookOpen },
        { value: "Management", label: "Management", icon: Building },
        { value: "Computer Science", label: "Computer Science", icon: Code },
      ],
      "Special Education": [
        { value: "Inclusive Education", label: "Inclusive Education", icon: Heart },
        { value: "Autism Specialist", label: "Autism Specialist", icon: Star },
        { value: "Learning Disabilities", label: "Learning Disabilities", icon: Star },
      ],
      "Vocational Training": [
        { value: "IT Skills", label: "IT Skills", icon: Code },
        { value: "Carpentry", label: "Carpentry", icon: Settings },
        { value: "Electrical", label: "Electrical", icon: Zap },
        { value: "Hospitality", label: "Hospitality", icon: Heart },
      ],
      "Language Instruction": [
        { value: "English Language", label: "English Language", icon: BookOpen },
        { value: "Nepali Language", label: "Nepali Language", icon: BookOpen },
        { value: "Foreign Languages", label: "Foreign Languages", icon: BookOpen },
      ],
      "STEM Education": [
        { value: "Mathematics", label: "Mathematics", icon: Target },
        { value: "Science", label: "Science", icon: Zap },
        { value: "Technology", label: "Technology", icon: Code },
        { value: "Engineering", label: "Engineering", icon: Settings },
      ],
      "Arts Education": [
        { value: "Music", label: "Music", icon: Music },
        { value: "Dance", label: "Dance", icon: Activity },
        { value: "Visual Arts", label: "Visual Arts", icon: Palette },
        { value: "Drama", label: "Drama", icon: Palette },
      ],
      "Physical Education": [
        { value: "Sports Coach", label: "Sports Coach", icon: Activity },
        { value: "Health & Fitness", label: "Health & Fitness", icon: Activity },
      ],
      "Computer & IT Education": [
        { value: "Computer Teacher", label: "Computer Teacher", icon: Code },
        { value: "IT Instructor", label: "IT Instructor", icon: Code },
        { value: "Programming & Coding", label: "Programming & Coding", icon: Code },
      ],
      "Educational Management": [
        { value: "Principal / Headteacher", label: "Principal / Headteacher", icon: Award },
        { value: "Academic Coordinator", label: "Academic Coordinator", icon: Building },
        { value: "Counselor / Career Advisor", label: "Counselor / Career Advisor", icon: Heart },
        { value: "Administrative Staff", label: "Administrative Staff", icon: Building },
      ],
  },
  jobLevel: [
    { value: "Entry Level(0-3yrs)", label: "Entry Level (0-3yrs)", icon: Star, color: "text-green-600" },
    { value: "Mid Level(3-5yrs)", label: "Mid Level (3-5yrs)", icon: Award, color: "text-blue-600" },
    { value: "Senior Level(5+yrs)", label: "Senior Level (5+yrs)", icon: Target, color: "text-purple-600" },
    { value: "Manager", label: "Manager", icon: Users, color: "text-orange-600" },
    { value: "Director", label: "Director", icon: Building, color: "text-red-600" },
    { value: "Executive", label: "Executive", icon: Award, color: "text-indigo-600" },
  ],
  jobType: [
    { value: "Full-time", label: "Full-time", icon: Clock, color: "text-green-600" },
    { value: "Part-time", label: "Part-time", icon: Clock, color: "text-blue-600" },
    { value: "Contract", label: "Contract", icon: Briefcase, color: "text-purple-600" },
    { value: "Freelance", label: "Freelance", icon: Zap, color: "text-orange-600" },
    { value: "Internship", label: "Internship", icon: GraduationCap, color: "text-pink-600" },
    { value: "Temporary", label: "Temporary", icon: Clock, color: "text-gray-600" },
  ],
  currency: [
    { value: "USD", label: "USD ($)", icon: DollarSign, color: "text-green-600" },
    { value: "NPR", label: "NPR (₨)", icon: DollarSign, color: "text-blue-600" },
    { value: "INR", label: "INR (₹)", icon: DollarSign, color: "text-orange-600" },
  ],
  salaryType: [
    { value: "Monthly", label: "Monthly", icon: DollarSign },
    { value: "Yearly", label: "Yearly", icon: DollarSign },
    { value: "Hourly", label: "Hourly", icon: Clock },
    { value: "Daily", label: "Daily", icon: Clock },
    { value: "Weekly", label: "Weekly", icon: Clock },
  ],
}

const FormField = ({ label, name, value, onChange, error, type = "text", placeholder, required = false, hint }) => (
  <div className="flex-1">
    <Label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </Label>
    <Input
      type={type}
      id={name}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",
        error && "border-red-300 focus:border-red-500",
      )}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    {error && (
      <p id={`${name}-error`} className="text-sm text-red-500 mt-1 flex items-center gap-1">
        <Info className="h-4 w-4" />
        {error}
      </p>
    )}
  </div>
)

const EnhancedSelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  required = false,
  searchable = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const filteredOptions = searchable
    ? options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className="flex-1">
      <Label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select onValueChange={(val) => onChange(name, val)} value={value || ""} onOpenChange={setIsOpen}>
        <SelectTrigger
          className={cn(
            "group relative w-full px-4 py-3 border-2 rounded-xl transition-all duration-200",
            "bg-white hover:bg-gray-50 focus:bg-white",
            "border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100",
            "shadow-sm hover:shadow-md focus:shadow-lg",
            error && "border-red-300 focus:border-red-500 focus:ring-red-100",
          )}
        >
          <div className="flex items-center gap-3 flex-1">
            {selectedOption?.icon && (
              <selectedOption.icon
                className={cn(
                  "h-5 w-5 transition-colors duration-200",
                  selectedOption.color || "text-gray-500",
                  isOpen && "text-blue-600",
                )}
              />
            )}
            <SelectValue
              placeholder={<span className="text-gray-400 font-medium">Choose {label.toLowerCase()}...</span>}
              className="text-gray-900 font-medium"
            />
          </div>
          <ChevronDown
            className={cn("h-4 w-4 text-gray-400 transition-all duration-200", isOpen && "rotate-180 text-blue-600")}
          />
        </SelectTrigger>
        <SelectContent
          className={cn(
            "w-[var(--radix-popper-anchor-width)] bg-white shadow-xl rounded-xl border-2 border-gray-100",
            "max-h-80 overflow-hidden p-2",
          )}
        >
          {searchable && options.length > 5 && (
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          )}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p>No options found</p>
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const IconComponent = opt.icon
                return (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all duration-150",
                      "hover:bg-blue-50 focus:bg-blue-50 data-[highlighted]:bg-blue-50",
                      "border border-transparent hover:border-blue-200",
                      "group",
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {IconComponent && (
                        <IconComponent
                          className={cn(
                            "h-4 w-4 transition-colors duration-150",
                            opt.color || "text-gray-500",
                            "group-hover:scale-110",
                          )}
                        />
                      )}
                      <span className="font-medium text-gray-700 group-hover:text-gray-900">{opt.label}</span>
                    </div>
                  </SelectItem>
                )
              })
            )}
          </div>
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
          <Info className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  )
}

const JobDetailSection = ({ formData, errors, handleChange, handleSelectChange }) => (
  <Accordion type="single" collapsible defaultValue="item-1">
    <AccordionItem
      value="item-1"
      className="border-2 border-blue-100 rounded-2xl shadow-sm bg-gradient-to-br from-blue-50/50 to-indigo-50/30 overflow-hidden"
    >
      <AccordionTrigger className="px-6 py-5 text-lg font-bold text-gray-800 hover:no-underline hover:bg-blue-50/50 transition-colors duration-200">
        <div className="flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-blue-600" />
          Job Details
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/50">
        <FormField
          label="Job Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          error={errors.position}
          placeholder="e.g., Senior Mathematics Teacher"
          required
        />
        <FormField
          label="No. of Employees"
          name="requiredEmployees"
          value={formData.requiredEmployees}
          onChange={handleChange}
          type="number"
          error={errors.requiredEmployees}
          placeholder="e.g., 3"
          required
          min="1"
        />
        <EnhancedSelectField
          label="Job Category"
          name="jobCategory"
          value={formData.jobCategory}
          onChange={handleSelectChange}
          options={dropdownOptions.jobCategory}
          error={errors.jobCategory}
          required
          searchable={true}
        />
        <EnhancedSelectField
          label="Subject / SubCategory"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleSelectChange}
          options={dropdownOptions.subCategory[formData.jobCategory] || []}
          error={errors.subCategory}
          searchable={true}
        />
        <EnhancedSelectField
          label="Job Level"
          name="jobLevel"
          value={formData.jobLevel}
          onChange={handleSelectChange}
          options={dropdownOptions.jobLevel}
          error={errors.jobLevel}
          required
        />
        <EnhancedSelectField
          label="Job Type"
          name="jobType"
          value={formData.jobType}
          onChange={handleSelectChange}
          options={dropdownOptions.jobType}
          error={errors.jobType}
          required
        />
        <FormField
          label="Experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
          placeholder="e.g., 2-3 years in teaching"
          hint="Optional: Specify required experience, if any"
        />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

const JobLocationSection = ({ formData, errors, handleChange }) => (
  <Accordion type="single" collapsible defaultValue="item-1">
    <AccordionItem
      value="item-1"
      className="border-2 border-green-100 rounded-2xl shadow-sm bg-gradient-to-br from-green-50/50 to-emerald-50/30 overflow-hidden"
    >
      <AccordionTrigger className="px-6 py-5 text-lg font-medium text-gray-800 hover:no-underline hover:bg-green-50/50 transition-colors duration-200">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-green-600" />
          Job Location
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 py-6 bg-white/50">
        <FormField
          label="Job Location"
          name="jobLocation"
          value={formData.jobLocation}
          onChange={handleChange}
          error={errors.jobLocation}
          placeholder="e.g., Kathmandu, Nepal"
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
      <AccordionItem
        value="item-1"
        className="border-2 border-purple-100 rounded-2xl shadow-sm bg-gradient-to-br from-purple-50/50 to-pink-50/30 overflow-hidden"
      >
        <AccordionTrigger className="px-6 py-5 text-lg font-medium text-gray-800 hover:no-underline hover:bg-purple-50/50 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-purple-600" />
            Salary & Description
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-6 space-y-6 bg-white/50">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-3">
              Offered Salary Type <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  value="Range"
                  checked={formData.offeredSalaryType === "Range"}
                  onChange={handleRadioChange}
                  className="h-5 w-5 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                  Salary Range
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  value="Fixed"
                  checked={formData.offeredSalaryType === "Fixed"}
                  onChange={handleRadioChange}
                  className="h-5 w-5 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                  Fixed Amount
                </span>
              </label>
            </div>
            <p className="mt-3 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border-l-4 border-purple-300">
              {formData.offeredSalaryType === "Range"
                ? "💡 Provide the minimum to maximum salary in closest range."
                : "💡 Provide the minimum offered salary."}
            </p>
            {errors.offeredSalaryType && (
              <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                <Info className="h-4 w-4" />
                {errors.offeredSalaryType}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <EnhancedSelectField
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleSelectChange}
              options={dropdownOptions.currency}
              error={errors.currency}
              required
            />
            <FormField
              label="Minimum Salary"
              name="minimum"
              type="number"
              value={formData.minimum}
              onChange={handleChange}
              error={errors.minimum}
              placeholder="e.g., 43000"
              required={!formData.hideSalary}
              min="0"
            />
            {formData.offeredSalaryType === "Range" && (
              <FormField
                label="Maximum Salary"
                name="maximum"
                type="number"
                value={formData.maximum}
                onChange={handleChange}
                error={errors.maximum}
                placeholder="e.g., 50000"
                required={!formData.hideSalary}
                min={Number(formData.minimum) || 0}
              />
            )}
            <EnhancedSelectField
              label="Salary Type"
              name="salaryType"
              value={formData.salaryType}
              onChange={handleSelectChange}
              options={dropdownOptions.salaryType}
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
                  onCheckedChange={(checked) => {
                    handleSwitchChange("hideSalary", checked)
                    if (checked) {
                      handleSwitchChange("negotiable", false)
                    }
                  }}
                  className={cn(
                    "data-[state=unchecked]:bg-gray-300",
                    formData.hideSalary ? "bg-green-500" : "bg-green-200",
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
                        {"Choose this option to display 'Salary Non Disclosed' to job seekers."}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="negotiable"
                  checked={formData.negotiable}
                  onCheckedChange={(checked) => {
                    if (!formData.hideSalary) {
                      handleSwitchChange("negotiable", checked)
                    }
                  }}
                  disabled={formData.hideSalary}
                  className={cn(
                    "data-[state=unchecked]:bg-gray-300",
                    formData.negotiable ? "bg-green-500" : "bg-green-200",
                    formData.hideSalary && "opacity-50 cursor-not-allowed",
                  )}
                />
                <Label
                  htmlFor="negotiable"
                  className={cn(
                    "text-sm font-medium text-gray-700 flex items-center gap-1",
                    formData.hideSalary && "text-gray-400",
                  )}
                >
                  Negotiable
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info
                          className={cn(
                            "h-4 w-4 cursor-pointer",
                            formData.hideSalary ? "text-gray-400" : "text-gray-500",
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-center">
                        {
                          "Choose this option to indicate that the salary is negotiable. Disabled when salary is hidden."
                        }
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
                    formData.active ? "bg-green-500" : "bg-green-200",
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
                        {"Enable to make the job listing active and visible to job seekers."}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Switch
                  id="urgent"
                  checked={formData.urgent}
                  onCheckedChange={(checked) => handleSwitchChange("urgent", checked)}
                  className={cn("data-[state=unchecked]:bg-gray-300", formData.urgent ? "bg-red-500" : "bg-red-200")}
                />
                <Label htmlFor="urgent" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Urgent
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-500 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-center">
                        {"Mark this job as urgent to prioritize it in listings."}
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
              value={formData.description ?? ""}
              onChange={handleChange}
              className={cn(
                "block w-full px-4 py-2 border border-gray-300 rounded-lg min-h-[150px] focus:ring-blue-500 focus:border-blue-500",
                errors.description && "border-red-300 focus:border-red-500",
              )}
              placeholder="Enter detailed job description (50-5000 characters)..."
              maxLength={5000}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
            />
            <p className="text-sm text-gray-500 mt-1">{formData.description?.length || 0}/5000 characters</p>
            {errors.description && (
              <p id="description-error" className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <Info className="h-4 w-4" />
                {errors.description}
              </p>
            )}
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
  orgId,
  jobId,
}) {
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (selectedJob) {
      setEditFormData({
        position: selectedJob.position || "",
        requiredEmployees: selectedJob.requiredEmployees?.toString() || "",
        jobCategory: selectedJob.jobCategory || "",
        subCategory: selectedJob.subCategory || "",
        jobLevel: selectedJob.jobLevel || "",
        jobType: selectedJob.jobType || "",
        experience: selectedJob.experience || "",
        jobLocation: selectedJob.jobLocation || "",
        offeredSalaryType: selectedJob.offeredSalaryType || "Range",
        currency: selectedJob.currency || "USD",
        minimum: selectedJob.minimum?.toString() || "",
        maximum: selectedJob.maximum?.toString() || "",
        salaryType: selectedJob.salaryType || "Monthly",
        hideSalary: selectedJob.hideSalary || false,
        negotiable: selectedJob.negotiable || false,
        active: selectedJob.active !== undefined ? selectedJob.active : true,
        description: selectedJob.description || "",
        postedBy: selectedJob.postedBy || "",
        urgent: selectedJob.urgent || false,
        org_id:  orgId || "",
      })
    }
  }, [selectedJob, setEditFormData, orgId])

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
    if (name === "hideSalary" && checked) {
      setEditFormData((prev) => ({ ...prev, negotiable: false }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!editFormData.position?.trim()) newErrors.position = "Job position is required"
    if (
      !editFormData.requiredEmployees ||
      isNaN(Number(editFormData.requiredEmployees)) ||
      Number(editFormData.requiredEmployees) <= 0
    ) {
      newErrors.requiredEmployees = "Number of employees must be a positive number"
    }
    if (!editFormData.jobCategory) newErrors.jobCategory = "Job category is required"
    if (!editFormData.jobLevel) newErrors.jobLevel = "Job level is required"
    if (!editFormData.jobType) newErrors.jobType = "Job type is required"
    if (!editFormData.jobLocation?.trim()) newErrors.jobLocation = "Job location is required"
    if (!editFormData.currency) newErrors.currency = "Currency is required"
    if (
      !editFormData.hideSalary &&
      (!editFormData.minimum || isNaN(Number(editFormData.minimum)) || Number(editFormData.minimum) < 0)
    ) {
      newErrors.minimum = "Minimum salary must be a non-negative number"
    }
    if (
      !editFormData.hideSalary &&
      editFormData.offeredSalaryType === "Range" &&
      (!editFormData.maximum ||
        isNaN(Number(editFormData.maximum)) ||
        Number(editFormData.maximum) <= Number(editFormData.minimum))
    ) {
      newErrors.maximum = "Maximum salary must be greater than minimum for range"
    }
    if (!editFormData.offeredSalaryType) newErrors.offeredSalaryType = "Offered salary type is required"
    if (!editFormData.salaryType) newErrors.salaryType = "Salary type is required"
    if (!editFormData.description?.trim()) {
      newErrors.description = "Job description is required"
    } else if (editFormData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters"
    } else if (editFormData.description.length > 5000) {
      newErrors.description = "Description cannot exceed 5000 characters"
    }
    if (editFormData.active === undefined) newErrors.active = "Active status is required"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const job_id = jobId || selectedJob?._id
    if (!job_id || !/^[0-9a-fA-F]{24}$/.test(job_id)) {
      setErrors({ submit: "Invalid job ID. Please select a valid job." })
      return
    }

    setIsSubmitting(true)
    try {
      const jobData = {
        ...editFormData,
        requiredEmployees: Number(editFormData.requiredEmployees),
        minimum: editFormData.hideSalary ? null : Number(editFormData.minimum),
        maximum:
          editFormData.hideSalary || editFormData.offeredSalaryType !== "Range" ? null : Number(editFormData.maximum),
        postedBy: editFormData.postedBy,
        org_id: orgId || editFormData.org_id,
      }

      const response = await fetch(`/api/Org/${orgId}/${jobId}/editjob`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update job")
      }

      const result = await response.json()
      await onSubmit(result.job, job_id)
      setIsModalOpen(false)
      setErrors({}) // Clear errors on success
    } catch (error) {
      setErrors({ submit: error.message || "Failed to update job. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[500px] md:max-w-[900px] bg-white rounded-xl max-h-[90vh] flex flex-col">
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
              <JobLocationSection formData={editFormData} errors={errors} handleChange={handleEditChange} />
              <SalaryDescriptionSection
                formData={editFormData}
                errors={errors}
                handleChange={handleEditChange}
                handleSelectChange={handleEditSelectChange}
                handleSwitchChange={handleSwitchChange}
                setFormData={setEditFormData}
                setErrors={setErrors}
              />
              {errors.submit && (
                <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.submit}
                </p>
              )}
              <DialogFooter className="sticky bottom-0 bg-white pt-4 border-t border-gray-100 flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-transparent">
                    Cancel
                  </Button>
                </DialogClose>
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
                      <Sparkles className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="size-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  )
}
