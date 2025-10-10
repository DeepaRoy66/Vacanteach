import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import {
  BriefcaseBusiness,
  Search,
  Filter,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Eye,
  Edit,
  MoreVertical,
  AlertCircle,
  Plus,
} from "lucide-react";

// ---------- Helper: Relative time ----------
const timeAgo = (dateString) => {
  if (!dateString) return "Just now";

  const posted = new Date(dateString);
  if (isNaN(posted)) return "Just now";

  const now = new Date();
  const seconds = Math.floor((now - posted) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
};

export default function ActiveJobListings({
  isLoadingJobs,
  filteredJobs,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  router,
  orgId,
}) {
  return (
    <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
      <CardHeader className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
              <BriefcaseBusiness className="h-6 w-6 text-green-600" />
              Active Job Listings
            </CardTitle>
            <CardDescription className="text-gray-500 mt-1">Manage and monitor your posted jobs</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="IT & Telecommunication">IT & Telecommunication</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoadingJobs ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading jobs...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <BriefcaseBusiness className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by posting your first job"}
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => router.push("/organization/postjob")}>
              <Plus className="h-4 w-4 mr-2" />
              Post Your First Job
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job._id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg border border-gray-100 border-l-4 border-l-green-600">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Job Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{job.position}</h3>
                        {job.urgent && (
                          <Badge variant="destructive" className="gap-1 bg-red-500 hover:bg-red-600 text-white">
                            <AlertCircle className="h-3 w-3" />
                            Urgent
                          </Badge>
                        )}
                        <Badge variant={job.active ? "default" : "secondary"} className={job.active ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-400 hover:bg-gray-500 text-white"}>
                          {job.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building2 className="h-4 w-4 text-gray-500" />
                          <span>{job.jobCategory}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{job.jobLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{job.jobType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span>
                            {job.hideSalary
                              ? "Salary Undisclosed"
                              : `${job.currency} ${job.minimum}${job.offeredSalaryType === "Range" ? ` - ${job.maximum}` : ""}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {Math.floor(Math.random() * 50) + 10} applications
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {Math.floor(Math.random() * 200) + 50} views
                        </span>
                        <span className="text-sm">Posted {timeAgo(job.createdAt)}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800"
                        onClick={() => router.push(`/organization/${orgId}/${job._id}/Jobpage`)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only lg:not-sr-only lg:ml-1">View</span>
                      </Button>
                      <Button 
                        onClick={() => router.push(`/organization/${orgId}/${job._id}/Jobpage`)}
                        variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only lg:not-sr-only lg:ml-1">Edit</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
