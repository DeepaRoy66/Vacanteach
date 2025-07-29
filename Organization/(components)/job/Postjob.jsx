"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostJobPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push("/auth"),
  });

  const router = useRouter();

  const [formData, setFormData] = useState({
    position: "",
    requiredEmployees: "",
    jobCategory: "",
    experience: "",
    jobLocation: "",
    currency: "USD",
    minimum: "",
    maximum: "",
    salaryType: "Yearly",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-indigo-600 text-xl">Loading...</div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.position.trim()) newErrors.position = "Job position is required";
    if (!formData.requiredEmployees.trim()) newErrors.requiredEmployees = "Number of employees is required";
    if (!formData.jobCategory.trim()) newErrors.jobCategory = "Job category is required";
    if (!formData.jobLocation.trim()) newErrors.jobLocation = "Job location is required";
    if (!formData.minimum.trim()) newErrors.minimum = "Minimum salary is required";
    if (!formData.maximum.trim()) newErrors.maximum = "Maximum salary is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        ...formData,
        postedBy: session?.user?.email,
        role: session?.user?.role || "Organization",
        createdAt: new Date().toISOString(),
      };

      const response = await fetch("/api/job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      alert("Job posted successfully!");

      setFormData({
        position: "",
        requiredEmployees: "",
        jobCategory: "",
        experience: "",
        jobLocation: "",
        currency: "USD",
        minimum: "",
        maximum: "",
        salaryType: "Yearly",
      });

      router.push("/job");
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
          {/* Position */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Job Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Senior Teacher"
            />
            {errors.position && <p className="text-sm text-red-500">{errors.position}</p>}
          </div>

          {/* Required Employees */}
          <div>
            <label htmlFor="requiredEmployees" className="block text-sm font-medium text-gray-700">Required Employees</label>
            <input
              type="number"
              id="requiredEmployees"
              name="requiredEmployees"
              value={formData.requiredEmployees}
              onChange={handleChange}
              min="1"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., 2"
            />
            {errors.requiredEmployees && <p className="text-sm text-red-500">{errors.requiredEmployees}</p>}
          </div>

          {/* Job Category */}
          <div>
            <label htmlFor="jobCategory" className="block text-sm font-medium text-gray-700">Job Category</label>
            <select
              id="jobCategory"
              name="jobCategory"
              value={formData.jobCategory}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a category</option>
              <option value="Teaching">Teaching</option>
              <option value="Administration">Administration</option>
              <option value="Support Staff">Support Staff</option>
              <option value="Special Education">Special Education</option>
            </select>
            {errors.jobCategory && <p className="text-sm text-red-500">{errors.jobCategory}</p>}
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (Optional)</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., 3-5 years"
            />
          </div>

          {/* Job Location */}
          <div>
            <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700">Job Location</label>
            <input
              type="text"
              id="jobLocation"
              name="jobLocation"
              value={formData.jobLocation}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Kathmandu"
            />
            {errors.jobLocation && <p className="text-sm text-red-500">{errors.jobLocation}</p>}
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="USD">USD</option>
              <option value="NPR">NPR</option>
              <option value="INR">INR</option>
            </select>
          </div>

          {/* Minimum Salary */}
          <div>
            <label htmlFor="minimum" className="block text-sm font-medium text-gray-700">Minimum Salary</label>
            <input
              type="number"
              id="minimum"
              name="minimum"
              value={formData.minimum}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., 30000"
            />
            {errors.minimum && <p className="text-sm text-red-500">{errors.minimum}</p>}
          </div>

          {/* Maximum Salary */}
          <div>
            <label htmlFor="maximum" className="block text-sm font-medium text-gray-700">Maximum Salary</label>
            <input
              type="number"
              id="maximum"
              name="maximum"
              value={formData.maximum}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., 50000"
            />
            {errors.maximum && <p className="text-sm text-red-500">{errors.maximum}</p>}
          </div>

          {/* Salary Type */}
          <div>
            <label htmlFor="salaryType" className="block text-sm font-medium text-gray-700">Salary Type</label>
            <select
              id="salaryType"
              name="salaryType"
              value={formData.salaryType}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Link href="/organization" className="text-indigo-600 hover:text-indigo-800 font-semibold transition">
              Back to Dashboard
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-full font-semibold text-white transition ${
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
