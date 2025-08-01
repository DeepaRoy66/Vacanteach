"use client"

import { useState } from "react"
import { Trash2, X } from "lucide-react"
import { Button } from "../../app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../../app/components/ui/dialog"

export default function DeleteJob({ jobId, onDelete, onError }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/Org/${jobId}/deletejob`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete job")
      }

      onDelete(jobId)
      setIsOpen(false)
    } catch (err) {
      console.error("Delete job error:", err)
      onError(err.message)
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-red-600 p-1.5"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="size-3 md:size-4" />
      </Button>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-lg md:text-xl text-gray-900">
            Confirm Delete Job
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="sm" className="p-1">
              <X className="size-4 text-gray-600" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="p-4 space-y-4 text-sm md:text-base">
          <p className="text-gray-600">
            Are you sure you want to delete this job? This action cannot be undone.
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}