"use client";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { AlertCircle, XCircle } from "lucide-react";

export default function ApplyJobModal({ isOpen, onClose, jobId, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    coverLetter: "",
    cv: null,
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");

    const data = new FormData();
    data.append("jobId", jobId);
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("coverLetter", formData.coverLetter);
    data.append("cv", formData.cv);

    try {
      const response = await fetch("/api/jobapplication", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setSubmissionStatus("success");
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        setSubmissionStatus(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmissionStatus("Error: Failed to submit application");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Apply for Job
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label
              htmlFor="coverLetter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              id="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="cv"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Upload CV (PDF only)
            </label>
            <input
              type="file"
              name="cv"
              id="cv"
              accept="application/pdf"
              onChange={handleInputChange}
              required
              className="mt-1 block w-full text-gray-900 dark:text-gray-100"
            />
          </div>
          {submissionStatus && submissionStatus.includes("Error") && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-600 dark:text-red-400">
                {submissionStatus}
              </span>
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg"
              disabled={submissionStatus === "submitting"}
            >
              {submissionStatus === "submitting"
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}