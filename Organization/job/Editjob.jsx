"use client"

import { useState } from "react"
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
import { Button } from "../../app/components/ui/button"
import { Save, X } from "lucide-react"

export default function EditJobModal({
  isModalOpen,
  setIsModalOpen,
  selectedJob,
  editFormData,
  setEditFormData,
  categories,
  locations,
  onSubmit,
}) {
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSelectChange = (name, value) => {
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] bg-white rounded-lg">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-lg md:text-xl text-gray-900">Edit Job</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="sm" className="p-1">
              <X className="size-4 text-gray-600" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={onSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={editFormData.position}
              onChange={handleEditChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="jobCategory">Category</Label>
            <Select
              name="jobCategory"
              value={editFormData.jobCategory}
              onValueChange={(value) => handleEditSelectChange("jobCategory", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="jobLocation">Location</Label>
            <Select
              name="jobLocation"
              value={editFormData.jobLocation}
              onValueChange={(value) => handleEditSelectChange("jobLocation", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="requiredEmployees">Required Employees</Label>
            <Input
              id="requiredEmployees"
              name="requiredEmployees"
              type="number"
              value={editFormData.requiredEmployees}
              onChange={handleEditChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minimum">Minimum Salary</Label>
              <Input
                id="minimum"
                name="minimum"
                type="number"
                value={editFormData.minimum}
                onChange={handleEditChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="maximum">Maximum Salary</Label>
              <Input
                id="maximum"
                name="maximum"
                type="number"
                value={editFormData.maximum}
                onChange={handleEditChange}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              name="currency"
              value={editFormData.currency}
              onChange={handleEditChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="salaryType">Salary Type</Label>
            <Select
              name="salaryType"
              value={editFormData.salaryType}
              onValueChange={(value) => handleEditSelectChange("salaryType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select salary type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hourly">Hourly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Save className="size-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
