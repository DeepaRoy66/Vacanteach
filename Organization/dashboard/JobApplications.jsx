import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { FileText, Search, BriefcaseBusiness, MapPin, Clock, Eye, Edit, Send } from "lucide-react";

export default function JobApplications({ isLoadingApplications, filteredApplications, searchTerm, setSearchTerm }) {
  return (
    <Card className="bg-white shadow-xl rounded-xl border border-gray-100">
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
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600 text-lg">Loading applications...</span>
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
                className="bg-white border-l-4 border-l-blue-600 hover:shadow-lg transition-all duration-200 rounded-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{app.fullName}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {app.status || "Pending"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <BriefcaseBusiness className="h-5 w-5 text-gray-500" />
                          {app.jobId?.position || "Unknown Job"}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          {app.jobId?.jobLocation || "Unknown Location"}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-5 w-5 text-gray-500" />
                          Applied {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-semibold">Email:</span> {app.email}
                      </div>
                      {app.coverLetter && (
                        <div className="text-sm text-gray-600 mb-3">
                          <span className="font-semibold">Cover Letter:</span>{" "}
                          {app.coverLetter.substring(0, 100)}...
                        </div>
                      )}
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">CV:</span>{" "}
                        <a
                          href={app.cv}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View CV
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:bg-gray-50"
                        onClick={() => window.open(app.cv, "_blank")}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View CV
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Respond
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Reply Now
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