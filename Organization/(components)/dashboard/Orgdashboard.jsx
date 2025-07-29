"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card,CardContent,CardTitle,CardDescription,CardHeader } from "../../../app/components/ui/card"
import { Button } from "../../../app/components/ui/button"
import { Select,SelectValue,SelectTrigger,SelectContent,SelectItem } from "../../../app/components/ui/select"
import { SidebarProvider,SidebarInset,SidebarTrigger } from "../../../app/components/ui/sidebar"
import { AppSidebar } from "../../Sidebar"
import { X, ShoppingCart } from "lucide-react"

export default function OrganizationDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showWelcome, setShowWelcome] = React.useState(true)

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  const user = session?.user

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        {/* Sticky Navbar */}
        <header>
            <SidebarTrigger />
        </header>

        {/* Main Content with Sidebar and Dashboard */}
        <div className="flex flex-1">
          {/* Sticky Sidebar with Controlled Height */}
          <div className="w-80 bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <AppSidebar />
          </div>

          {/* Dashboard Content */}
          <SidebarInset>
            <div className="flex-1 bg-gray-100 p-8">
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Welcome Message */}
                {showWelcome && (
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
                    <button
                      onClick={() => setShowWelcome(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <p className="text-gray-600 pr-8">
                      Welcome, {user?.name || "asdfgh"}! We're excited to have you on board. To get started, you can post
                      your first job to attract top talent, view and manage applications. Let's get started on finding the
                      best candidates for your team! But first, let's{" "}
                      <span className="text-blue-600 underline cursor-pointer">complete your profile</span>.
                    </p>
                  </div>
                )}

                {/* Jobseeker Insight Section */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-semibold text-gray-900">Jobseeker Insight</CardTitle>
                    <CardDescription className="text-gray-500">
                      Discover key information of person searching for a job as of now
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-8">
                      <Select defaultValue="">
                        <SelectTrigger className="w-full">
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Total Jobseekers */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Total Jobseekers</h3>
                        <div className="space-y-2">
                          <p className="text-4xl font-bold text-gray-900">1,003,163</p>
                          <p className="text-3xl font-bold text-gray-700">
                            80,818<span className="text-yellow-500 ml-1">⚡</span>
                          </p>
                          <p className="text-sm font-medium text-gray-700">Active Jobseekers:</p>
                          <p className="text-sm text-gray-600">Active Since 90 Days</p>
                        </div>
                      </div>

                      {/* Job Level */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Job Level</h3>
                        <p className="text-sm text-gray-600">Applicants across different job experience levels.</p>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Top Level</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div className="bg-blue-800 h-3 rounded-full" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Senior Level</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div className="bg-blue-600 h-3 rounded-full" style={{ width: "25%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Mid Level</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div className="bg-blue-400 h-3 rounded-full" style={{ width: "45%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Entry Level</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div className="bg-blue-300 h-3 rounded-full" style={{ width: "60%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Gender */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Gender</h3>
                        <p className="text-sm text-gray-600">Actively jobseekers across all genders</p>
                        <div className="flex justify-center items-center h-48">
                          <div className="relative w-32 h-32">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="3"
                              />
                              <path
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                strokeDasharray="75, 25"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 text-center">Overview of the applicant pool by gender.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bottom Section */}
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">26</div>
                      <div className="text-xs text-gray-500">July</div>
                      <div className="text-xs text-gray-500">2025</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Saturday</div>
                      <div>11:51:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <ShoppingCart className="h-5 w-5 text-gray-400" />
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6">Post a Job</Button>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">HM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hiring Needs Section */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardContent className="text-center py-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Fulfill your Hiring needs Quick & Easy</h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Streamline your recruitment process with our platform. Post job openings and search for skilled
                      candidates with ease to meet your hiring needs efficiently.
                    </p>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8 py-3">
                      Post a Job
                    </Button>
                  </CardContent>
                </Card>

                {/* Footer Placeholder */}
                <footer className="bg-gray-800 text-white p-4 text-center mt-6">
                  <p>© 2025 Upwork. Terms of Service | Privacy Policy | [A Notice of Collection] | [Cookie Settings] | Accessibility</p>
                </footer>
              </div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}