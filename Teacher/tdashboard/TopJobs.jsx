
"use client";

import { Card,CardContent,CardHeader,CardTitle } from "@/app/components/ui/card";
import { Avatar,AvatarFallback } from "@/app/components/ui/avatar";
import { TrendingUp } from "lucide-react";

export default function TopJobs({ topJobs }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-gold-500" />
          <span>Top Jobs by Views</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topJobs.length === 0 ? (
            <p className="text-sm text-gray-500">No top jobs available.</p>
          ) : (
            topJobs.map((job) => (
              <div key={job._id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                      {job.position.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{job.position}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{job.postedBy}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{job.views} views</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    {job.hideSalary ? "N/A" : `${job.currency} ${job.minimum.toLocaleString()}${job.offeredSalaryType === "Range" ? ` - ${job.maximum.toLocaleString()}` : ""}`}
                  </p>
                  <p className="text-xs text-gray-500">salary</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
