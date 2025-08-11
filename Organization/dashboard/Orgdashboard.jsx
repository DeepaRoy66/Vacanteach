"use client"
import React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from "../../app/components/ui/card"
import { Button } from "../../app/components/ui/button"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "../../app/components/ui/select"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../app/components/ui/sidebar"
import { AppSidebar } from "../../app/(pages)/organization/Sidebar"
import {
  X,
  Users,
  TrendingUp,
  Calendar,
  Sparkles,
  Target,
  Award,
  BriefcaseBusiness,
  AlertCircle,
} from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function OrganizationDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push("/auth"),
  })
  const router = useRouter()
  const [showWelcome, setShowWelcome] = React.useState(true)
  const [activeJobs, setActiveJobs] = React.useState([])
  const [isLoadingJobs, setIsLoadingJobs] = React.useState(true)
  const [selectedCategory, setSelectedCategory] = React.useState("all")

  React.useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "organization") {
      fetchActiveJobs()
    } else if (status === "authenticated" && session?.user?.role !== "organization") {
      router.push("/unauthorized")
    }
  }, [status, session])

  const fetchActiveJobs = async () => {
    setIsLoadingJobs(true)
    try {
      const response = await fetch(
        `/api/Org/listjob?active=true&postedBy=${encodeURIComponent(session?.user?.email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
      if (!response.ok) throw new Error("Failed to fetch jobs")
      const jobs = await response.json()
      setActiveJobs(jobs)
    } catch (error) {
      console.error("Error fetching active jobs:", error)
      toast.error("Failed to load active jobs. Please try again.")
    } finally {
      setIsLoadingJobs(false)
    }
  }

  const filteredJobs = selectedCategory === "all"
    ? activeJobs
    : activeJobs.filter(job => job.jobCategory === selectedCategory)

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-lg text-emerald-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === "authenticated" && session?.user?.role !== "organization") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600 text-xl">Unauthorized: Only organizations can view this dashboard.</div>
      </div>
    )
  }

  const user = session?.user

  return (
    <SidebarProvider>
      <ToastContainer />
      <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 overflow-x-hidden">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 w-80 h-screen overflow-y-auto bg-white border-r border-gray-200 z-10">
          <AppSidebar />
        </div>

        {/* Main Content */}
        <SidebarInset className="ml-80 flex-1">
          <div className="p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Welcome Message */}
              {showWelcome && (
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  <button
                    onClick={() => setShowWelcome(false)}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <Sparkles className="h-6 w-6 text-yellow-300" />
                      <h2 className="text-xl font-bold">Welcome to HireFlow!</h2>
                    </div>
                    <p className="text-emerald-50 leading-relaxed pr-8">
                      Welcome, <span className="font-semibold">{user?.name || "there"}</span>! We're excited to have
                      you on board. To get started, you can post your first job to attract top talent, view and manage
                      applications. Let's get started on finding the best candidates for your team! But first, let's{" "}
                      <span
                        className="text-yellow-300 underline cursor-pointer hover:text-yellow-200 transition-colors"
                        onClick={() => router.push("/organization/profile")}
                      >
                        complete your profile
                      </span>
                      .
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-600">Active Jobs</p>
                      <p className="text-3xl font-bold text-gray-900">{activeJobs.length}</p>
                    </div>
                    <div className="bg-emerald-100 p-3 rounded-xl">
                      <Target className="size-6 text-emerald-600" />
                    </div>
                  </div>
                  <p className="text-xs text-emerald-600 mt-2 flex items-center">
                    <TrendingUp className="size-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="bg-white Rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-600">Applications</p>
                      <p className="text-3xl font-bold text-gray-900">1,847</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Users className="size-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-2 flex items-center">
                    <TrendingUp className="size-3 mr-1" />
                    +8% from last month
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-600">Interviews</p>
                      <p className="text-3xl font-bold text-gray-900">89</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <Calendar className="size-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-xs text-purple-600 mt-2 flex items-center">
                    <TrendingUp className="size-3 mr-1" />
                    +23% from last month
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-600">Hired</p>
                      <p className="text-3xl font-bold text-gray-900">34</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Award className="size-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-2 flex items-center">
                    <TrendingUp className="size-3 mr-1" />
                    +15% from last month
                  </p>
                </div>
              </div>

              {/* Active Jobs Section */}
              <Card className="bg-white shadow-lg border border-emerald-100 rounded-2xl overflow-hidden">
                <CardHeader className="text-center pb-6 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Active Jobs</CardTitle>
                      <CardDescription className="text-emerald-600 text-lg">
                        View all active job listings posted by your organization.
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-gray-700 bg-transparent border-gray-300 hover:bg-gray-100"
                      onClick={() => router.push("/organization/PostJob")}
                    >
                      <BriefcaseBusiness className="h-4 w-4" /> Post New Job
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-8">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full h-12 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                        <SelectValue placeholder="Filter by job category" />
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
                  {isLoadingJobs ? (
                    <div className="text-center text-gray-600">Loading active jobs...</div>
                  ) : filteredJobs.length === 0 ? (
                    <div className="text-center text-gray-600">No active jobs found.</div>
                  ) : (
                    <div className="grid gap-6">
                      {filteredJobs.map((job) => (
                        <Card key={job._id} className="border border-gray-200 rounded-lg shadow-sm">
                          <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                              {job.position}
                              {job.urgent && <AlertCircle className="h-5 w-5 text-red-500" title="Urgent" />}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-sm text-gray-600"><strong>Category:</strong> {job.jobCategory}</p>
                            <p className="text-sm text-gray-600"><strong>Location:</strong> {job.jobLocation}</p>
                            <p className="text-sm text-gray-600"><strong>Type:</strong> {job.jobType}</p>
                            <p className="text-sm text-gray-600">
                              <strong>Salary:</strong>{" "}
                              {job.hideSalary
                                ? "Salary Non Disclosed"
                                : `${job.currency} ${job.minimum}${
                                    job.offeredSalaryType === "Range" ? ` - ${job.maximum}` : ""
                                  } ${job.salaryType}`}
                            </p>
                            <p className="text-sm text-gray-600"><strong>Status:</strong> {job.active ? "Active" : "Inactive"}</p>
                            {job.urgent && (
                              <p className="text-sm text-red-500"><strong>Urgent:</strong> This job is marked as urgent</p>
                            )}
                            <Button
                              variant="outline"
                              className="mt-4"
                              onClick={() => router.push(`/organization/Jobpage/${job._id}`)}
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Jobseeker Insight Section */}
              <Card className="bg-white shadow-lg border border-emerald-100 rounded-2xl overflow-hidden">
                <CardHeader className="text-center pb-6 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Jobseeker Insights</CardTitle>
                  <CardDescription className="text-emerald-600 text-lg">
                    Discover key information about people searching for jobs right now
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-8">
                    <Select defaultValue="">
                      <SelectTrigger className="w-full h-12 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                        <SelectValue placeholder="Select a category to view insights of available Jobseekers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-100">
                      <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
                        <Users className="size-5 mr-2" />
                        Total Jobseekers
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-4xl font-bold text-gray-900">1,003,163</p>
                          <p className="text-sm text-emerald-600 font-medium">Total registered</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-emerald-200">
                          <p className="text-3xl font-bold text-emerald-700 flex items-center">
                            80,818
                            <Sparkles className="size-6 text-yellow-500 ml-2" />
                          </p>
                          <p className="text-sm font-semibold text-emerald-800">Active Jobseekers</p>
                          <p className="text-xs text-emerald-600">Active Since 90 Days</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                      <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center">
                        <TrendingUp className="size-5 mr-2" />
                        Job Level Distribution
                      </h3>
                      <p className="text-sm text-blue-600 mb-6">Applicants across different experience levels</p>
                      <div className="space-y-4">
                        {[
                          { level: "Entry Level", percentage: 60, color: "bg-blue-300" },
                          { level: "Mid Level", percentage: 45, color: "bg-blue-400" },
                          { level: "Senior Level", percentage: 25, color: "bg-blue-600" },
                          { level: "Top Level", percentage: 15, color: "bg-blue-800" },
                        ].map((item) => (
                          <div key={item.level} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-blue-800">{item.level}</span>
                              <span className="text-xs text-blue-600">{item.percentage}%</span>
                            </div>
                            <div className="w-full bg-blue-100 rounded-full h-3">
                              <div
                                className={`${item.color} h-3 rounded-full transition-all duration-500`}
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                      <h3 className="text-xl font-bold text-purple-900 mb-2">Gender Distribution</h3>
                      <p className="text-sm text-purple-600 mb-6">Active jobseekers across all genders</p>
                      <div className="flex justify-center items-center mb-4">
                        <div className="relative w-32 h-32">
                          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#8b5cf6"
                              strokeWidth="3"
                              strokeDasharray="75, 25"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-purple-700">75%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-sm text-purple-800">Male</span>
                          </div>
                          <span className="text-sm font-medium text-purple-700">75%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <span className="text-sm text-purple-800">Female</span>
                          </div>
                          <span className="text-sm font-medium text-purple-700">25%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Hiring Needs Section */}
              <Card className="bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-2xl border-0 rounded-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
                <CardContent className="text-center py-12 relative z-10">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-4">Fulfill your Hiring needs Quick & Easy</h2>
                    <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                      Streamline your recruitment process with our platform. Post job openings and search for skilled
                      candidates with ease to meet your hiring needs efficiently.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
                        onClick={() => router.push("/organization/PostJob")}
                      >
                        Post a Job
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg bg-transparent"
                      >
                        Browse Candidates
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Footer */}
              <footer className="bg-gray-900 text-white rounded-2xl p-8 text-center shadow-lg">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-emerald-600 p-2 rounded-lg mr-3">
                      <Users className="size-5" />
                    </div>
                    <span className="text-xl font-semibold">HireFlow</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    © 2025 HireFlow. Terms of Service | Privacy Policy | Cookie Settings | Accessibility
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}