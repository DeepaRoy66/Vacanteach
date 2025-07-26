"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function PostJobPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => redirect("/auth"),
  });

  const [formData, setFormData] = useState({
    position: "",
    requiredEmployees: "",
    jobCategory: "",
    experience: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-indigo-600 text-xl">Loading...</div>
      </div>
    );
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Basic form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.position.trim()) newErrors.position = "Job position is required";
    if (!formData.requiredEmployees.trim()) newErrors.requiredEmployees = "Number of employees is required";
    if (!formData.jobCategory.trim()) newErrors.jobCategory = "Job category is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Placeholder for API call to submit job data
      console.log("Submitting job data:", {
        ...formData,
        postedBy: session?.user?.email,
        role: session?.user?.role || "Organization",
      });

      alert("Job posted successfully! (Placeholder)");
      setFormData({
        position: "",
        requiredEmployees: "",
        jobCategory: "",
        experience: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-indigo-600 mb-6 text-center">Post a Teaching Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Job Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Senior Teacher, Assistant Professor"
            />
            {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
          </div>

          <div>
            <label htmlFor="requiredEmployees" className="block text-sm font-medium text-gray-700">
              Required Number of Employees
            </label>
            <input
              type="number"
              id="requiredEmployees"
              name="requiredEmployees"
              value={formData.requiredEmployees}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 2"
              min="1"
            />
            {errors.requiredEmployees && <p className="mt-1 text-sm text-red-500">{errors.requiredEmployees}</p>}
          </div>

          <div>
            <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700">
              Job Category
            </label>
            <select
              id="jobCategory"
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a category</option>
              <option value="Teaching">Teaching</option>
              <option value="Administration">Administration</option>
              <option value="Support Staff">Support Staff</option>
              <option value="Special Education">Special Education</option>
            </select>
            {errors.jobCategory && <p className="mt-1 text-sm text-red-500">{errors.jobCategory}</p>}
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Experience (Optional)
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., 3-5 years of teaching experience"
            />
          </div>

          <div className="flex justify-between items-center">
            <Link
              href="/organization"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
            >
              Back to Dashboard
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-full font-semibold text-white transition duration-300 ${
                isSubmitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}