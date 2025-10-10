"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/card";
import { Users, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function Insights({ filteredJobs }) {
  const [experienceData, setExperienceData] = useState([]);
  const [applicationTrends, setApplicationTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to process job levels for bar chart
  const processExperienceData = (jobs) => {
    const jobLevelCounts = {
      "Entry Level(0-3yrs)": 0,
      "Mid Level(3-5yrs)": 0,
      "Senior Level(5+yrs)": 0,
      Manager: 0,
      Director: 0,
      Executive: 0,
    };

    // Count jobs by jobLevel
    jobs.forEach((job) => {
      if (jobLevelCounts[job.jobLevel] !== undefined) {
        jobLevelCounts[job.jobLevel]++;
      }
    });

    const totalJobs = jobs.length || 1; // Avoid division by zero
    const data = Object.keys(jobLevelCounts).map((level) => ({
      level: level.split("(")[0].trim(), // Clean up label (e.g., "Entry Level")
      count: jobLevelCounts[level],
      percentage: ((jobLevelCounts[level] / totalJobs) * 100).toFixed(1),
    }));

    // Filter out levels with zero counts
    return data.filter((item) => item.count > 0);
  };

  // Function to process application trends for line chart
  const processApplicationTrends = (jobs) => {
    // Mock application data (since postjob doesn't include application counts)
    // In a real app, this would come from an API or job.applications field
    const trends = [
      { week: "Week 1", count: 0 },
      { week: "Week 2", count: 0 },
      { week: "Week 3", count: 0 },
      { week: "Week 4", count: 0 },
    ];

    // Simulate applications based on job creation date or a mock field
    jobs.forEach((job) => {
      // Assume job.createdAt exists or use a mock logic
      const createdAt = job.createdAt ? new Date(job.createdAt) : new Date();
      const weekIndex = Math.floor((new Date() - createdAt) / (7 * 24 * 60 * 60 * 1000));
      if (weekIndex >= 0 && weekIndex < 4) {
        // Mock application count (replace with real data if available)
        trends[weekIndex].count += job.applications?.length || Math.floor(Math.random() * 10) + 5;
      }
    });

    return trends;
  };

  useEffect(() => {
    if (filteredJobs && filteredJobs.length > 0) {
      setExperienceData(processExperienceData(filteredJobs));
      setApplicationTrends(processApplicationTrends(filteredJobs));
      setIsLoading(false);
    } else {
      setExperienceData([]);
      setApplicationTrends([]);
      setIsLoading(false);
    }
  }, [filteredJobs]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-blue-600 text-xl">Loading Insights...</div>
      </div>
    );
  }

  if (!filteredJobs || filteredJobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600 text-xl">No job data available to display insights.</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Candidate Pool Insights (Bar Chart) */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
        <CardHeader className="p-6">
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Users className="h-5 w-5 text-green-600" />
            Candidate Pool Insights
          </CardTitle>
          <CardDescription className="text-gray-500 mt-1">
            Overview of available talent in your industry
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <h4 className="font-medium text-lg text-gray-900 mb-4">
            Experience Level Distribution
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={experienceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value} jobs (${props.payload.percentage}%)`,
                    name,
                  ]}
                />
                <Bar dataKey="count" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights (Line Chart) */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
        <CardHeader className="p-6">
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <BarChart3 className="h-5 w-5 text-green-600" />
            Your Performance
          </CardTitle>
          <CardDescription className="text-gray-500 mt-1">
            Application trends and top performing jobs
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-6">
          {/* Line Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={applicationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#16a34a"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Performing Jobs */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg text-gray-900">
              Top Performing Jobs
            </h4>
            <div className="space-y-3">
              {filteredJobs.slice(0, 3).map((job) => (
                <div
                  key={job._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow duration-200"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{job.position}</p>
                    <p className="text-sm text-gray-600">{job.jobLocation}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {job.applications?.length || Math.floor(Math.random() * 50) + 20}
                    </p>
                    <p className="text-sm text-gray-600">applications</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}