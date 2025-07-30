"use client"
import { useEffect, useState } from "react"
import {
  MapPin,
  Users,
  Building2,
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  ChevronRight,
  Home,
} from "lucide-react"
import { Button } from "../../app/components/ui/button"
import { Card,CardContent } from "../../app/components/ui/card"
import { Sidebar,SidebarProvider,SidebarInset,SidebarTrigger } from "../../app/components/ui/sidebar"
import { AppSidebar } from "../../app/(pages)/organization/Sidebar"

export default function JobListPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")

  useEffect(() => {
    // Mock data to match the screenshot structure
    const mockJobs = [
      {
        _id: "1",
        position: "Software Engineer",
        jobCategory: "Administration",
        requiredEmployees: 3,
        jobLocation: "fgh",
        currency: "USD",
        minimum: "234567",
        maximum: "34567",
        salaryType: "Yearly",
        postedBy: "deeparoy622@gmail.com",
      },
      {
        _id: "2",
        position: "Data Scientist",
        jobCategory: "Administration",
        requiredEmployees: 6,
        jobLocation: "sdfghj",
        currency: "USD",
        minimum: "4567",
        maximum: "456789",
        salaryType: "Yearly",
        postedBy: "deeparoy622@gmail.com",
      },
      {
        _id: "3",
        position: "UX Designer",
        jobCategory: "Teaching",
        requiredEmployees: 6,
        jobLocation: "sdfgh",
        currency: "USD",
        minimum: "34567",
        maximum: "45678",
        salaryType: "Yearly",
        postedBy: "deeparoy622@gmail.com",
      },
      {
        _id: "4",
        position: "Product Manager",
        jobCategory: "Teaching",
        requiredEmployees: 6,
        jobLocation: "wsedfghj",
        currency: "USD",
        minimum: "234567",
        maximum: "3456789",
        salaryType: "Yearly",
        postedBy: "deeparoy622@gmail.com",
      },
      {
        _id: "5",
        position: "DevOps Engineer",
        jobCategory: "Administration",
        requiredEmployees: 6,
        jobLocation: "sdfgh",
        currency: "USD",
        minimum: "4567",
        maximum: "34567",
        salaryType: "Yearly",
        postedBy: "deeparoy622@gmail.com",
      },
      {
        _id: "6",
        position: "Marketing Specialist",
        jobCategory: "Administration",
        requiredEmployees: 3,
        jobLocation: "asdfghjkl",
        currency: "USD",
        minimum: "345678",
        maximum: "3455555",
        salaryType: "Yearly",
        postedBy: "deeparoy622@gmail.com",
      },
      {
        _id: "7",
        position: "HR Manager",
        jobCategory: "Teaching",
        requiredEmployees: 6,
        jobLocation: "sdfghj",
        currency: "USD",
        minimum: "234567",
        maximum: "3456789",
        salaryType: "Yearly",
        postedBy: "deeparoy622@gmail.com",
      },
      {
        _id: "8",
        position: "Financial Analyst",
        jobCategory: "Teaching",
        requiredEmployees: 3,
        jobLocation: "asdfghjkl",
        currency: "USD",
        minimum: "3456789",
        maximum: "3456789",
        salaryType: "Yearly",
        postedBy: "deeparoy622@gmail.com",
      },
    ]

    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs)
      setLoading(false)
    }, 500)

    // Original fetch logic (uncomment if you want to use your actual API)
    // fetch("/api/Org/listjob")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Fetched jobs:", data);
    //     if (data.success) setJobs(data.data);
    //     else console.error("Fetch error:", data.message);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error("Failed to fetch jobs", err);
    //     setLoading(false);
    //   });
  }, [])

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobCategory.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || job.jobCategory === filterCategory
    const matchesLocation = filterLocation === "all" || job.jobLocation === filterLocation

    return matchesSearch && matchesCategory && matchesLocation
  })

  // Get unique categories and locations for filters (from mock data for consistency)
  const categories = [...new Set(jobs.map((job) => job.jobCategory))]
  const locations = [...new Set(jobs.map((job) => job.jobLocation))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-lg text-emerald-700 font-semibold">Loading job listings...</p>
          <p className="text-emerald-600 mt-2 text-sm">Please wait while we fetch your data</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar /> {/* The sidebar component */}
      <SidebarInset className="flex flex-col bg-gradient-to-br from-emerald-50 to-green-100">
        {" "}
        {/* Added background here */}
        {/* Header for the main content area */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-sm px-4 shadow-sm">
          <SidebarTrigger className="-ml-1 text-emerald-700 hover:bg-emerald-100" />
          <div className="w-px h-4 bg-gray-300 mr-2" />

          {/* Custom Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Home className="size-4" />
            <ChevronRight className="size-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Manage Jobs</span>
            <ChevronRight className="size-4 text-gray-400" />
            <span className="text-gray-900 font-semibold">All Jobs</span>
          </nav>
        </header>
        <div className="flex-1 p-8">
          {" "}
          {/* Removed max-w-7xl mx-auto */}
          {/* Job Table */}
          {filteredJobs.length === 0 ? (
            <Card className="bg-white border border-emerald-100 rounded-lg shadow-md">
              <CardContent className="p-12 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="size-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-6">
                  {jobs.length === 0
                    ? "You haven't posted any jobs yet. Start by creating your first job posting!"
                    : "No jobs match your current search criteria. Try adjusting your filters."}
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium">
                  <Plus className="size-4 mr-2" />
                  Post Your First Job
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white border border-emerald-100 rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="bg-white border-b border-gray-100">
                      <th className="text-left p-3 font-medium text-gray-700 text-sm w-[15%]">Position</th>{" "}
                      {/* Re-added Position column */}
                      <th className="text-left p-3 font-medium text-gray-700 text-sm w-[12%]">Category</th>
                      <th className="text-left p-3 font-medium text-gray-700 text-sm w-[10%]">Employees</th>
                      <th className="text-left p-3 font-medium text-gray-700 text-sm w-[15%]">Location</th>
                      <th className="text-left p-3 font-medium text-gray-700 text-sm w-[18%]">Salary</th>
                      <th className="text-left p-3 font-medium text-gray-700 text-sm w-[18%]">Posted By</th>
                      <th className="text-center p-3 font-medium text-gray-700 text-sm w-[12%]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job, index) => (
                      <tr
                        key={job._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <div className="bg-emerald-100 p-1.5 rounded-lg">
                              <Building2 className="size-3 text-emerald-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{job.position}</div>
                              <div className="flex items-center space-x-1 text-xs text-gray-500 mt-0.5">
                                <Clock className="size-2.5" />
                                <span>Posted recently</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full">
                            {job.jobCategory}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-1.5 text-gray-700">
                            <Users className="size-3.5" />
                            <span className="text-sm">{job.requiredEmployees} positions</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-1.5 text-gray-700">
                            <MapPin className="size-3.5" />
                            <span className="text-sm">{job.jobLocation}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="bg-emerald-50 text-emerald-800 p-2 rounded-md text-sm font-medium">
                            {job.currency} {job.minimum} - {job.maximum}
                            <span className="block text-xs text-emerald-600">{job.salaryType}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <div className="bg-emerald-600 text-white rounded-full size-6 flex items-center justify-center text-xs font-medium">
                              {job.postedBy.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-gray-800 text-sm">{job.postedBy}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center justify-center space-x-1">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-emerald-600 p-1.5">
                              <Eye className="size-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600 p-1.5">
                              <Edit className="size-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-600 p-1.5">
                              <Trash2 className="size-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-1.5">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Table Footer */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-100 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-emerald-700">
                    Showing <span className="font-semibold">{filteredJobs.length}</span> of{" "}
                    <span className="font-semibold">{jobs.length}</span> jobs
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent text-xs px-3 py-1"
                    >
                      Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-emerald-600 text-white hover:bg-emerald-700 w-6 h-6 text-xs"
                      >
                        1
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-700 hover:bg-emerald-50 w-6 h-6 text-xs"
                      >
                        2
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-700 hover:bg-emerald-50 w-6 h-6 text-xs"
                      >
                        3
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent text-xs px-3 py-1"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
