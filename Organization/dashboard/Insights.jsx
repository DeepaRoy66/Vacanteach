import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../app/components/ui/card";
import { Users, UserCheck, BarChart3 } from "lucide-react";

export default function Insights({ filteredJobs }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Candidate Pool Insights
          </CardTitle>
          <CardDescription>Overview of available talent in your industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-2xl font-bold text-green-900">80,818</p>
                <p className="text-sm text-green-600">Active Job Seekers</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Experience Level Distribution</h4>
              {[
                { level: "Entry Level", percentage: 60, count: "48,491" },
                { level: "Mid Level", percentage: 45, count: "36,368" },
                { level: "Senior Level", percentage: 25, count: "20,205" },
                { level: "Executive", percentage: 15, count: "12,123" },
              ].map((item) => (
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Your Performance
          </CardTitle>
          <CardDescription>How your jobs are performing this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-900">94%</p>
                <p className="text-sm text-green-600">Application Rate</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-900">4.8</p>
                <p className="text-sm text-green-600">Company Rating</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Top Performing Jobs</h4>
              <div className="space-y-2">
                {filteredJobs.slice(0, 3).map((job, index) => (
                  <div key={job._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{job.position}</p>
                      <p className="text-sm text-gray-600">{job.jobLocation}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{Math.floor(Math.random() * 50) + 20}</p>
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