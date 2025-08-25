import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../app/components/ui/card";
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
  // Data for the Bar Chart
  const experienceData = [
    { level: "Entry", percentage: 60, count: 48491 },
    { level: "Mid", percentage: 45, count: 36368 },
    { level: "Senior", percentage: 25, count: 20205 },
    { level: "Executive", percentage: 15, count: 12123 },
  ];

  // Data for the Line Chart
  const applicationTrends = [
    { week: "Week 1", count: 20 },
    { week: "Week 2", count: 35 },
    { week: "Week 3", count: 50 },
    { week: "Week 4", count: 42 },
  ];

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
                <Tooltip />
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
                <Line type="monotone" dataKey="count" stroke="#16a34a" strokeWidth={2} />
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
                      {Math.floor(Math.random() * 50) + 20}
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
