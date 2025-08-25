import React from "react";
import { Card, CardContent } from "../../app/components/ui/card";
import { Target, Users, Calendar, Award, TrendingUp } from "lucide-react";

export default function StatsGrid({ activeJobs, jobApplications }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
      {/* Active Jobs */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{activeJobs.length}</p>
              <p className="text-[10px] sm:text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="bg-green-100 p-2 sm:p-3 rounded-xl">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Applications */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{jobApplications.length}</p>
              <p className="text-[10px] sm:text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                +8% from last month
              </p>
            </div>
            <div className="bg-green-100 p-2 sm:p-3 rounded-xl">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interviews Scheduled */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Interviews Scheduled</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">89</p>
              <p className="text-[10px] sm:text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                +23% from last month
              </p>
            </div>
            <div className="bg-green-100 p-2 sm:p-3 rounded-xl">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Successful Hires */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Successful Hires</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">34</p>
              <p className="text-[10px] sm:text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                +15% from last month
              </p>
            </div>
            <div className="bg-orange-100 p-2 sm:p-3 rounded-xl">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
