import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { FileText, Search, BriefcaseBusiness, MapPin, Clock, Eye, Send } from "lucide-react";

export default function JobApplications({ isLoadingApplications, filteredApplications, searchTerm, setSearchTerm }) {
  return (
    <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
      <CardHeader className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
              <FileText className="h-6 w-6 text-blue-600" />
              Job Applications
            </CardTitle>
            <CardDescription className="text-gray-500 mt-1">Manage and review applications for your job postings</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoadingApplications ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
            <span className="mt-4 text-gray-600 text-lg">Loading applications...</span>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No applications found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm ? "Try adjusting your search criteria" : "No applications have been submitted for your jobs yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map((app) => (
              <Card
                key={app._id}
                className="bg-gray-50 border border-gray-200 border-l-4 border-l-blue-600 hover:shadow-md transition-all duration-200 rounded-lg"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Applicant & Job Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{app.fullName}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {app.status || "Pending"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <BriefcaseBusiness className="h-4 w-4 text-gray-500" />
                          <span>{app.jobId?.position || "Unknown Job"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{app.jobId?.jobLocation || "Unknown Location"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>Applied {new Date(app.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {app.cv && (
                        <Button
                          variant="outline"
                          className="gap-2 text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800"
                          onClick={() => window.open(app.cv, "_blank")}
                        >
                          <Eye className="h-4 w-4" />
                          View CV
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        className="gap-2 text-blue-600 hover:bg-blue-50"
                        // Add onClick handler for responding/replying
                      >
                        <Send className="h-4 w-4" />
                        Reply
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