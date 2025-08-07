
"use client";

import { Card,CardContent,CardHeader,CardTitle } from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { Badge } from "../../app/components/ui/badge";
import { Briefcase, Filter, Download, Heart, MapPin, Clock, Eye, Zap } from "lucide-react";

export default function JobListings({ jobs, loading, incrementJobView }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-blue-500" />
              <span>Featured Job Opportunities</span>
            </CardTitle>
            <p className="text-muted-foreground mt-1">Handpicked positions matching your profile</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <p>Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <p>No jobs available.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job._id} className="border rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
                {job.urgent && (
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      <Zap className="h-3 w-3 mr-1" />
                      Urgent Hiring
                    </Badge>
                  </div>
                )}

                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.position}</h3>
                      {job.jobLocation.toLowerCase() === "remote" && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Remote
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="font-medium text-blue-600">{job.postedBy}</span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.jobLocation}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{job.views} views</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        {job.jobType}
                      </Badge>
                      <span className="text-green-600 font-semibold text-lg">
                        {job.hideSalary ? "Salary Not Disclosed" : job.negotiable ? "Negotiable" :
                          job.offeredSalaryType === "Range"
                            ? `${job.currency} ${job.minimum.toLocaleString()} - ${job.maximum.toLocaleString()} / ${job.salaryType}`
                            : `${job.currency} ${job.minimum.toLocaleString()} / ${job.salaryType}`}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

                    {job.experience && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          <li>{job.experience}</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="ml-6 text-right space-y-3">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      Save Job
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-blue-600"
                      onClick={() => incrementJobView(job._id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" className="px-8">
            Load More Jobs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
