import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../../app/components/ui/select";
import { Badge } from "../../app/components/ui/badge";
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

export default function ActiveJobListings({
  isLoadingJobs,
  filteredJobs,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  router,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5" />
              Active Job Listings
            </CardTitle>
            <CardDescription>Manage and monitor your posted jobs</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
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
      <CardContent>
        {isLoadingJobs ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600">Loading jobs...</span>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <BriefcaseBusiness className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by posting your first job"}
            </p>
            <Button onClick={() => router.push("/organization/postjob")}>
              <Plus className="h-4 w-4 mr-2" />
              Post Your First Job
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job._id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{job.position}</h3>
                        {job.urgent && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Urgent
                          </Badge>
                        )}
                        <Badge variant={job.active ? "default" : "secondary"}>
                          {job.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building2 className="h-4 w-4" />
                          {job.jobCategory}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {job.jobLocation}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {job.jobType}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          {job.hideSalary
                            ? "Salary Undisclosed"
                            : `${job.currency} ${job.minimum}${
                                job.offeredSalaryType === "Range" ? ` - ${job.maximum}` : ""
                              }`}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {Math.floor(Math.random() * 50) + 10} applications
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {Math.floor(Math.random() * 200) + 50} views
                        </span>
                        <span>Posted {Math.floor(Math.random() * 30) + 1} days ago</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/organization/Jobpage/${job._id}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
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