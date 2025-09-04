"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import { Badge } from "../../app/components/ui/badge";
import {
  Briefcase,
  Filter,
  Download,
  Heart,
  MapPin,
  Clock,
  Eye,
  Zap,
  ArrowRight,
  XCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ApplyJobModal from "./ApplyNow";

export default function JobListings({
  jobs,
  loading,
  incrementJobView,
  searchQuery,
  searchLocation,
  resetFilters,
  pagination,
  currentPage,
  onPageChange,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleApplyNow = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobId(null);
  };

  const handleSuccess = () => {
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  const renderPagination = () => {
    if (!pagination.totalPages || pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!pagination.hasPrev}
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              className="rounded-full"
            >
              1
            </Button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className="rounded-full"
          >
            {page}
          </Button>
        ))}

        {endPage < pagination.totalPages && (
          <>
            {endPage < pagination.totalPages - 1 && (
              <span className="px-2">...</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.totalPages)}
              className="rounded-full"
            >
              {pagination.totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!pagination.hasNext}
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div>
      {/* ✅ Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 z-[60] animate-in slide-in-from-top-2 duration-300">
          <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-2xl shadow-2xl p-6 max-w-md">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Application Submitted Successfully! 🎉
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Your job application has been submitted. The employer will
                  review your application and get back to you soon.
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full text-xs px-4 py-2"
                    onClick={() => setShowSuccessAlert(false)}
                  >
                    Got it!
                  </Button>
                  <button
                    onClick={() => setShowSuccessAlert(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            {/* Progress bar for auto-hide */}
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div className="bg-green-500 h-1 rounded-full animate-[shrink_5s_linear_forwards]"></div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Job Card Section */}
      <Card className="rounded-2xl shadow-lg dark:bg-gray-900 border-none transition-all duration-300">
        <CardHeader className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-xl font-bold flex items-center space-x-2 text-gray-800 dark:text-white">
                <Briefcase className="h-6 w-6 text-emerald-500" />
                <span>Jobs from All Organizations</span>
              </CardTitle>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                {pagination.totalJobs
                  ? `${pagination.totalJobs} opportunities available`
                  : "Explore teaching positions"}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-12 text-center">
              <Briefcase className="h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                No jobs available
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
                {searchQuery || searchLocation
                  ? `No jobs match your search for "${
                      searchQuery || searchLocation
                    }". Try adjusting your filters or explore other categories.`
                  : "No jobs have been posted yet. Check back later or explore other job categories."}
              </p>
              {(searchQuery || searchLocation) && (
                <Button
                  onClick={resetFilters}
                  className="mt-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="border rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-6">
                    {/* ---- Left Side ---- */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {job.urgent && (
                          <Badge className="bg-red-500 text-white border-red-500 rounded-full px-3 py-1 text-xs">
                            <Zap className="h-3 w-3 mr-1 animate-pulse" />
                            Urgent Hiring
                          </Badge>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                          {job.position}
                        </h3>
                        {job.jobLocation?.toLowerCase() === "remote" && (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-300 rounded-full px-3 py-1 text-xs"
                          >
                            Remote
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {job.postedBy?.organizationName ||
                            job.postedBy?.name ||
                            "Organization"}
                        </span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {job.jobLocation || "Location not specified"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{job.views || 0} views</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge
                          variant="outline"
                          className="border-emerald-200 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300 rounded-full"
                        >
                          {job.jobType || "Full-time"}
                        </Badge>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
                          {job.hideSalary
                            ? "Salary Not Disclosed"
                            : job.negotiable
                            ? "Negotiable"
                            : job.offeredSalaryType === "Range"
                            ? `${job.currency || "$"} ${job.minimum?.toLocaleString()} - ${
                                job.maximum?.toLocaleString()
                              } / ${job.salaryType}`
                            : job.salary
                            ? `${job.currency || "$"} ${job.salary.toLocaleString()}`
                            : "Salary not specified"}
                        </span>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
                        {job.description}
                      </p>

                      {job.requirements && job.requirements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Requirements:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.slice(0, 3).map((req, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                {req}
                              </span>
                            ))}
                            {job.requirements.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{job.requirements.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ---- Right Side ---- */}
                    <div className="w-full md:w-auto flex flex-col space-y-3">
                      {/* Debug-friendly plain button */}
                      <button
                        className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={() => handleApplyNow(job._id)}
                      >
                        Apply Now
                        <ArrowRight className="h-4 w-4 inline ml-2" />
                      </button>

                      <Button
                        variant="outline"
                        className="w-full rounded-full border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                        onClick={() => alert("Job saved!")}
                      >
                        <Heart className="h-4 w-4 mr-2 text-red-500" />
                        Save Job
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full text-emerald-600 dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                        onClick={() => incrementJobView(job._id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {renderPagination()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Application Modal */}
      <ApplyJobModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobId={selectedJobId}
        onSuccess={handleSuccess}
      />

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
