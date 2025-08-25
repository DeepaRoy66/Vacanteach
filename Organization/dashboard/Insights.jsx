import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../app/components/ui/card";
import { Users, BarChart3, TrendingUp } from "lucide-react";

export default function Insights({ filteredJobs }) {
  // Data for the Bar Chart
  const experienceData = [
    { level: "Entry Level", percentage: 60, count: "48,491" },
    { level: "Mid Level", percentage: 45, count: "36,368" },
    { level: "Senior Level", percentage: 25, count: "20,205" },
    { level: "Executive", percentage: 15, count: "12,123" },
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
      {/* Candidate Pool Insights Card (Bar Chart) */}
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
          <div className="space-y-6">
            <h4 className="font-medium text-lg text-gray-900 mb-4">Experience Level Distribution</h4>
            <div className="space-y-4">
              {experienceData.map((item) => (
                <div key={item.level} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.level}</span>
                    <span className="text-gray-500">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Performance Card (Line Chart) */}
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
        <CardContent className="p-6 pt-0">
          <div className="space-y-6">
            {/* Line Chart Section */}
            <div>
              <h4 className="font-medium text-lg text-gray-900 mb-4">Application Trends</h4>
              <div className="h-40 relative w-full border-b border-l border-gray-200 p-4">
                {/* Horizontal and Vertical Lines (for grid) */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 pb-0">
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="w-full h-px bg-gray-200"></div>
                </div>
                
                {/* Chart Data */}
                <div className="absolute inset-0 p-4">
                  <div className="relative h-full w-full">
                    <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="#16a34a"
                        strokeWidth="2"
                        points={applicationTrends.map((d, i) => `${(i / (applicationTrends.length - 1)) * 100},${100 - (d.count / 50) * 100}`).join(" ")}
                      />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* X-Axis Labels */}
              <div className="flex justify-between px-4 text-sm text-gray-500">
                {applicationTrends.map((item, index) => (
                  <span key={index}>{item.week}</span>
                ))}
              </div>
            </div>

            {/* Top Performing Jobs Section */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg text-gray-900">Top Performing Jobs</h4>
              <div className="space-y-3">
                {filteredJobs.slice(0, 3).map((job) => (
                  <div key={job._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow duration-200">
                    <div>
                      <p className="font-semibold text-gray-900">{job.position}</p>
                      <p className="text-sm text-gray-600">{job.jobLocation}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{Math.floor(Math.random() * 50) + 20}</p>
                      <p className="text-sm text-gray-600">applications</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}