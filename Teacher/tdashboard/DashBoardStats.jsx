
"use client";

import { Card,CardContent,CardHeader,CardTitle } from "../../app/components/ui/card";
import { Progress } from "../../app/components/ui/progress";
import { Briefcase, Eye, Award, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function DashboardStats({
  currentJobs,
  percentageChange,
  isPositiveChange,
  topJobs
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">Total Jobs Posted</CardTitle>
          <div className="p-2 bg-blue-500 rounded-lg">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-900">{currentJobs}</div>
          <div className="flex items-center space-x-2 mt-2">
            {isPositiveChange ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${isPositiveChange ? "text-green-600" : "text-red-600"}`}>
              {Math.abs(percentageChange).toFixed(1)}% from last month
            </span>
          </div>
          <Progress value={Math.min((currentJobs / 500) * 100, 100)} className="mt-3" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Top Job Views</CardTitle>
          <div className="p-2 bg-green-500 rounded-lg">
            <Eye className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-900">{topJobs[0]?.views || 0}</div>
          <div className="flex items-center space-x-2 mt-2">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">+8% from last month</span>
          </div>
          <Progress value={74} className="mt-3" />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">Success Rate</CardTitle>
          <div className="p-2 bg-purple-500 rounded-lg">
            <Award className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-900">94.2%</div>
          <div className="flex items-center space-x-2 mt-2">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">+2.1% from last month</span>
          </div>
          <Progress value={94} className="mt-3" />
        </CardContent>
      </Card>

      
    </div>
  );
}
