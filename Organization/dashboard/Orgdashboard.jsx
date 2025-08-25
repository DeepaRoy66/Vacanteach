"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "../../app/components/ui/card";
import { Button } from "../../app/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../../app/components/ui/select";
import { SidebarProvider, SidebarInset } from "../../app/components/ui/sidebar";
import { AppSidebar } from "../../app/(pages)/organization/Sidebar";
import {
  X,
  Users,
  TrendingUp,
  Calendar,
  Sparkles,
  Bell,
  Target,
  Settings,
  Plus,
  BarChart3,
  FileText,
  Search,
  Filter,
  UserCheck,
  Badge,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  Edit,
  MoreVertical,
  Award,
  BriefcaseBusiness,
  AlertCircle,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrganizationDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push("/auth"),
  });
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeJobs, setActiveJobs] = useState([]);
  const [jobApplications, setJobApplications] = useState([]); // New state for applications
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isLoadingApplications, setIsLoadingApplications] = useState(true); // New loading state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "organization") {
      fetchActiveJobs();
      fetchJobApplications(); // Fetch applications
    } else if (status === "authenticated" && session?.user?.role !== "organization") {
      router.push("/unauthorized");
    }
  }, [status, session]);

  const fetchActiveJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const response = await fetch(
        `/api/Org/listjob?active=true&postedBy=${encodeURIComponent(session?.user?.email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const jobs = await response.json();
      setActiveJobs(jobs);
    } catch (error) {
      console.error("Error fetching active jobs:", error);
      toast.error("Failed to load active jobs. Please try again.");
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const fetchJobApplications = async () => {
    setIsLoadingApplications(true);
    try {
      const response = await fetch(
        `/api/Org/JobApplications?postedBy=${encodeURIComponent(session?.user?.email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch applications");
      const applications = await response.json();
      setJobApplications(applications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      toast.error("Failed to load job applications. Please try again.");
    } finally {
      setIsLoadingApplications(false);
    }
  };

  const filteredJobs = activeJobs.filter((job) => {
    const matchesCategory = selectedCategory === "all" || job.jobCategory === selectedCategory;
    const matchesSearch =
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobLocation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredApplications = jobApplications.filter((app) => {
    const job = app.jobId || {};
    return (
      job.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobLocation?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated" && session?.user?.role !== "organization") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-xl">Unauthorized: Only organizations can view this dashboard.</div>
      </div>
    );
  }

  const user = session?.user;

  return (
    <SidebarProvider>
      <ToastContainer />
      <div className="flex min-h-screen bg-gray-50">
        <div className="fixed top-0 left-0 w-80 h-screen overflow-y-auto bg-white border-r border-gray-200 z-10">
          <AppSidebar />
        </div>
        <SidebarInset className="ml-80 flex-1">
          <div className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Existing Header and Welcome Banner */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-gray-600 mt-1">
                    Welcome back, {user?.name || "there"}! Here's what's happening with your jobs.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Bell className="h-4 w-4" />
                    Notifications
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    className="gap-2 bg-green-600 hover:bg-green-700"
                    onClick={() => router.push("/organization/postjob")}
                  >
                    <Plus className="h-4 w-4" />
                    Post New Job
                  </Button>
                </div>
              </div>
              {showWelcome && (
                <Card className="bg-gradient-to-r from-green-600 to-green-600 text-white border-0 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  <CardContent className="p-6 relative z-10">
                    <button
                      onClick={() => setShowWelcome(false)}
                      className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <div className="flex items-start gap-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h1 className="text-xl font-bold mb-2">
                          Welcome back, {user?.name || "there"}! Here's what's happening with your jobs.
                        </h1>
                        <p className="text-sm text-gray-600">You have {activeJobs.length} active job postings.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {/* Existing Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{activeJobs.length}</p>
                        <p className="text-xs text-green-600 mt-2 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +12% from last month
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-xl">
                        <Target className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Applications</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{jobApplications.length}</p>
                        <p className="text-xs text-green-600 mt-2 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +8% from last month
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-xl">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Interviews Scheduled</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">89</p>
                        <p className="text-xs text-green-600 mt-2 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +23% from last month
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-xl">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Successful Hires</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">34</p>
                        <p className="text-xs text-green-600 mt-2 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +15% from last month
                        </p>
                      </div>
                      <div className="bg-orange-100 p-3 rounded-xl">
                        <Award className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Existing Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Manage your recruitment process efficiently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex-col gap-2 bg-transparent"
                      onClick={() => router.push("/organization/postjob")}
                    >
                      <Plus className="h-5 w-5" />
                      Post New Job
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Users className="h-5 w-5" />
                      Browse Candidates
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <FileText className="h-5 w-5" />
                      View Applications
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* Job Applications Section */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Job Applications
                      </CardTitle>
                      <CardDescription>Review applications for your job postings</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search applications..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingApplications ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                      <span className="ml-3 text-gray-600">Loading applications...</span>
                    </div>
                  ) : filteredApplications.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm
                          ? "Try adjusting your search criteria"
                          : "No applications have been submitted for your jobs yet."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredApplications.map((app) => (
                        <Card key={app._id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h3 className="text-xl font-semibold text-gray-900">{app.fullName}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <BriefcaseBusiness className="h-4 w-4" />
                                    {app.jobId?.position || "Unknown Job"}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    {app.jobId?.jobLocation || "Unknown Location"}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    Applied {new Date(app.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                  <span className="font-medium">Email:</span> {app.email}
                                </div>
                                {app.coverLetter && (
                                  <div className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Cover Letter:</span>{" "}
                                    {app.coverLetter.substring(0, 100)}...
                                  </div>
                                )}
                                <div className="text-sm text-gray-600">
                                  <span className="font-medium">CV:</span>{" "}
                                  <a
                                    href={app.cv}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                  >
                                    View CV
                                  </a>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(app.cv, "_blank")}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View CV
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Respond
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
              {/* Existing Job Management and Insights Sections */}
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
              {/* Existing Insights Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Candidate Pool Insights
                    </CardTitle>
                    <CardDescription>Overview of available talent in your industry</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div>
                          <p className="text-2xl font-bold text-green-900">80,818</p>
                          <p className="text-sm text-green-600">Active Job Seekers</p>
                        </div>
                        <UserCheck className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Experience Level Distribution</h4>
                        {[
                          { level: "Entry Level", percentage: 60, count: "48,491" },
                          { level: "Mid Level", percentage: 45, count: "36,368" },
                          { level: "Senior Level", percentage: 25, count: "20,205" },
                          { level: "Executive", percentage: 15, count: "12,123" },
                        ].map((item) => (
                          <div key={item.level} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium text-gray-700">{item.level}</span>
                              <span className="text-gray-500">{item.count}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Your Performance
                    </CardTitle>
                    <CardDescription>How your jobs are performing this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-900">94%</p>
                          <p className="text-sm text-green-600">Application Rate</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-900">4.8</p>
                          <p className="text-sm text-green-600">Company Rating</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Top Performing Jobs</h4>
                        <div className="space-y-2">
                          {filteredJobs.slice(0, 3).map((job, index) => (
                            <div key={job._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">{job.position}</p>
                                <p className="text-sm text-gray-600">{job.jobLocation}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900">{Math.floor(Math.random() * 50) + 20}</p>
                                <p className="text-sm text-gray-600">applications</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-gradient-to-r from-green-600 to-green-600 text-white border-0">
                <CardContent className="text-center py-12">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Great Hire?</h2>
                    <p className="text-green-100 text-lg mb-8 leading-relaxed">
                      Join thousands of companies using our platform to connect with top talent. Post your job today and
                      start receiving applications from qualified candidates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-white text-green-600 hover:bg-green-50 font-semibold"
                        onClick={() => router.push("/organization/postjob")}
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Post a Job Now
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                      >
                        <Users className="h-5 w-5 mr-2" />
                        Browse Talent Pool
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}