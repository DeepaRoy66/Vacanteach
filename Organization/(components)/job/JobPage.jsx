import { useState, useEffect, useMemo } from "react";
import { Search, Filter, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import EditJob from "../components/EditJob";
import DeleteJob from "../components/DeleteJob";
import Loading from "../components/Loading";
import Missing from "../components/Missing";

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const jobs = await response.json();
    return {
      props: {
        initialJobs: jobs,
      },
    };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return {
      props: {
        initialJobs: [],
      },
    };
  }
}

export default function JobPage({ initialJobs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table");
  const [jobs, setJobs] = useState(
    initialJobs
      ? [...initialJobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    if (initialJobs) {
      setJobs([...initialJobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  }, [initialJobs]);

  const filteredJobs = useMemo(() => {
    let filtered = jobs;
    if (searchQuery) {
      filtered = filtered.filter((job) =>
        job.position.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter((job) => job.jobCategory === categoryFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter((job) => job.status === statusFilter);
    }
    return filtered;
  }, [searchQuery, categoryFilter, statusFilter, jobs]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const handleUpdateJob = async (updatedJob) => {
    if (updatedJob) {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === updatedJob.id ? updatedJob : job
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      router.refresh();
    }
  };

  const handleDeleteJob = async (deletedJobId) => {
    if (deletedJobId) {
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== deletedJobId));
      router.refresh();
    }
  };

  const ViewToggleButton = () => (
    <div className="flex items-center bg-white/50 rounded-lg p-1 border border-gray-200/50">
      <button
        onClick={() => setViewMode("table")}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
          viewMode === "table"
            ? "bg-indigo-500 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
        }`}
      >
        <LayoutGrid size={14} />
        <span className="hidden sm:inline">Table</span>
      </button>
      <button
        onClick={() => setViewMode("card")}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
          viewMode === "card"
            ? "bg-indigo-500 text-white shadow-sm"
            : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
        }`}
      >
        <LayoutGrid size={14} />
        <span className="hidden sm:inline">Cards</span>
      </button>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Missing />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white/20 to-blue-50/30 backdrop-blur-sm">
      <div className="container mx-auto p-2 sm:p-3 lg:p-4 max-w-7xl">
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                Jobs
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Manage your job postings
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ViewToggleButton />
              <a
                href="/post-job"
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm"
              >
                <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:hidden">Post</span>
                <span className="hidden sm:inline">Post New Job</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/50 p-2 sm:p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <div className="p-1 sm:p-1.5 lg:p-2 bg-indigo-100 rounded-lg flex-shrink-0">
                <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-indigo-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Total</p>
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">
                  {jobs.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/50 p-2 sm:p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <div className="p-1 sm:p-1.5 lg:p-2 bg-green-100 rounded-lg flex-shrink-0">
                <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Active</p>
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">
                  {jobs.filter((j) => j.status === "Active").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/50 p-2 sm:p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <div className="p-1 sm:p-1.5 lg:p-2 bg-red-100 rounded-lg flex-shrink-0">
                <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-red-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">Inactive</p>
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">
                  {jobs.filter((j) => j.status === "Inactive").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/50 p-2 sm:p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <div className="p-1 sm:p-1.5 lg:p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-gray-600 truncate">This Month</p>
                <p className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900">
                  {
                    jobs.filter(
                      (j) =>
                        new Date(j.createdAt).getMonth() === new Date().getMonth() &&
                        new Date(j.createdAt).getFullYear() === new Date().getFullYear()
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 sm:mb-4 bg-white/70 backdrop-blur-md border border-white/20 shadow-lg rounded-lg">
          <div className="p-3 sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 py-2 pr-3 text-sm rounded-md bg-white/50 border border-gray-200/50 focus:bg-white/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full appearance-none py-2 px-3 pr-8 text-sm rounded-md bg-white/50 border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="">All Categories</option>
                  <option value="Teaching">Teaching</option>
                  <option value="Administration">Administration</option>
                  <option value="Support Staff">Support Staff</option>
                  <option value="Special Education">Special Education</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none py-2 px-3 pr-8 text-sm rounded-md bg-white/50 border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 pointer-events-none" />
              </div>
              <div className="text-sm text-gray-600 flex items-center">
                <span className="hidden sm:inline">
                  Showing {filteredJobs.length} of {jobs.length}
                </span>
                <span className="sm:hidden">
                  {filteredJobs.length}/{jobs.length}
                </span>
              </div>
            </div>
            {(searchQuery || categoryFilter || statusFilter) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {searchQuery && (
                  <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {categoryFilter && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Category: {categoryFilter}
                    <button
                      onClick={() => setCategoryFilter("")}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {statusFilter && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Status: {statusFilter}
                    <button
                      onClick={() => setStatusFilter("")}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg rounded-lg relative z-10">
          {viewMode === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="sticky top-0 bg-white/90 backdrop-blur-sm">
                  <tr className="border-b border-gray-200/50">
                    <th className="text-left p-2 sm:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S.N
                    </th>
                    <th className="text-left p-2 sm:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                      Position
                    </th>
                    <th className="text-left p-2 sm:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left p-2 sm:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employees
                    </th>
                    <th className="text-left p-2 sm:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="text-left p-2 sm:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary Range
                    </th>
                    <th className="text-left p-2 sm:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left p-2 sm:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                      Created At
                    </th>
                    <th className="text-left p-2 sm:p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobs.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-8 sm:py-12">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <LayoutGrid className="h-8 w-8 sm:h-10 sm:w-10 mb-2 sm:mb-3 text-gray-300" />
                          <p className="text-sm sm:text-base font-medium mb-1">
                            No jobs found
                          </p>
                          <p className="text-xs">
                            Try adjusting your filters or post a new job
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedJobs.map((job, index) => (
                      <tr
                        key={job.id}
                        className="border-b border-gray-200/50 hover:bg-white/50 transition-colors"
                      >
                        <td className="p-2 sm:p-3 text-gray-700 font-medium">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="p-2 sm:p-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {job.position}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              ID: {job.id}
                            </p>
                          </div>
                        </td>
                        <td className="p-2 sm:p-3 text-gray-700">{job.jobCategory}</td>
                        <td className="p-2 sm:p-3 text-gray-700">{job.reqNoOfEmployees}</td>
                        <td className="p-2 sm:p-3 text-gray-700">{job.jobLocation || "N/A"}</td>
                        <td className="p-2 sm:p-3 text-gray-700">
                          {job.currency} {job.minimum} - {job.maximum} ({job.salaryType})
                        </td>
                        <td className="p-2 sm:p-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              job.status
                            )}`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="p-2 sm:p-3 text-gray-700 text-xs">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 sm:p-3">
                          <div className="flex gap-1">
                            <EditJob job={job} onUpdate={handleUpdateJob} />
                            <DeleteJob jobId={job.id} onDelete={handleDeleteJob} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-3 sm:p-4">
              {paginatedJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-gray-500">
                  <LayoutGrid className="h-8 w-8 sm:h-10 sm:w-10 mb-2 sm:mb-3 text-gray-300" />
                  <p className="text-sm sm:text-base font-medium mb-1">
                    No jobs found
                  </p>
                  <p className="text-xs">
                    Try adjusting your filters or post a new job
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {paginatedJobs.map((job, index) => (
                    <div
                      key={job.id}
                      className="bg-white/60 rounded-lg p-3 sm:p-4 border border-gray-200/50 hover:shadow-md transition-all duration-200 hover:bg-white/80"
                    >
                      <div className="flex flex-col space-y-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {job.position}
                          </h3>
                          <p className="text-xs text-gray-500">
                            #{(currentPage - 1) * itemsPerPage + index + 1}
                          </p>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Category:</span>
                            <span className="text-gray-700">{job.jobCategory}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Employees:</span>
                            <span className="text-gray-700">{job.reqNoOfEmployees}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Location:</span>
                            <span className="text-gray-700">{job.jobLocation || "N/A"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Salary:</span>
                            <span className="text-gray-700">
                              {job.currency} {job.minimum} - {job.maximum} ({job.salaryType})
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Status:</span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                                job.status
                              )}`}
                            >
                              {job.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">Created:</span>
                            <span className="text-gray-700 text-xs">
                              {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-gray-200 flex justify-end gap-2">
                          <EditJob job={job} onUpdate={handleUpdateJob} />
                          <DeleteJob jobId={job.id} onDelete={handleDeleteJob} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {filteredJobs.length > 0 && (
          <div className="mt-3 sm:mt-4 bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/20 relative z-0">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm">
              <span className="text-gray-600 text-center sm:text-left">
                <span className="hidden sm:inline">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of{" "}
                  {filteredJobs.length} entries
                </span>
                <span className="sm:hidden">
                  {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredJobs.length)} of{" "}
                  {filteredJobs.length}
                </span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1 text-xs rounded bg-white/50 border border-gray-200/50 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-1 text-xs rounded bg-white/50 border border-gray-200/50 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}