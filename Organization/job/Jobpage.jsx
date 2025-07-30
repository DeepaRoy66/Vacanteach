"use client";

import { useEffect, useState } from "react";

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/Org/listjob") 
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched jobs:", data);
        if (data.success) setJobs(data.data);
        else console.error("Fetch error:", data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-indigo-600">Loading jobs...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Job Listings</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs posted yet.</p>
        ) : (
          <table className="w-full">
            <thead className="bg-indigo-100 text-indigo-700">
              <tr>
                <th className="p-3 text-left">Position</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Employees</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-left">Posted By</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{job.position}</td>
                  <td className="p-3">{job.jobCategory}</td>
                  <td className="p-3">{job.requiredEmployees}</td>
                  <td className="p-3">{job.jobLocation}</td>
                  <td className="p-3">
                    {job.currency} {job.minimum} - {job.maximum} ({job.salaryType})
                  </td>
                  <td className="p-3">{job.postedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
