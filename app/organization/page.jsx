// This file contains JSX for the OrganizationDashboard component.
"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Select,SelectValue,SelectTrigger,SelectContent,SelectItem } from "../components/ui/select"
import { Progress } from "../components/ui/progress"
import { Users, BriefcaseBusiness, CircleDollarSign } from "lucide-react"

export default function OrganizationDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

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

  const user = session.user

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Message Card */}
        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900">Welcome, {user?.name || "Deepa"}!</CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-2">
              We're excited to have you on board. To get started, you can post your first job to attract top talent,
              view and manage applications. Let's get started on finding the best candidates for your team! But first,
              let's complete your profile.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Jobseeker Insight Section */}
        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">Jobseeker Insights</CardTitle>
            <CardDescription className="text-gray-600">
              Discover key information about people searching for jobs right now.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-1/2 lg:w-1/3">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Jobseekers Card */}
              <Card className="p-6 bg-white shadow-md border-none">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Total Jobseekers</h3>
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    {new Date().toLocaleTimeString("en-US")}
                  </p>
                  <p className="text-4xl font-extrabold text-gray-900 mt-4">
                    80,876<span className="text-yellow-500 ml-2">⚡</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Active Jobseekers: Active Since 90 Days</p>
                </CardContent>
              </Card>

              {/* Job Level Card */}
              <Card className="p-6 bg-white shadow-md border-none">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Job Level</h3>
                    <BriefcaseBusiness className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600">Applicants across different job experience levels.</p>
                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 font-medium">Mid Level</span>
                        <span className="text-sm text-gray-500">60%</span>
                      </div>
                      <Progress value={60} className="h-2 bg-gray-200" indicatorClassName="bg-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 font-medium">Entry Level</span>
                        <span className="text-sm text-gray-500">80%</span>
                      </div>
                      <Progress value={80} className="h-2 bg-gray-200" indicatorClassName="bg-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 font-medium">Senior Level</span>
                        <span className="text-sm text-gray-500">40%</span>
                      </div>
                      <Progress value={40} className="h-2 bg-gray-200" indicatorClassName="bg-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gender Card */}
              <Card className="p-6 bg-white shadow-md border-none">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">Gender Distribution</h3>
                    <CircleDollarSign className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600">Overview of the applicant pool by gender.</p>
                  <div className="mt-6 flex justify-center items-center h-32 bg-gray-100 rounded-lg border border-dashed border-gray-300 text-gray-500 text-center text-sm">
                    <p>Placeholder for Gender Distribution Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Fulfill Hiring Needs Section */}
        <Card className="bg-white shadow-lg border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Fulfill your Hiring needs Quick & Easy
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Streamline your recruitment process with our platform. Post job openings and search for skilled candidates
              with ease to meet your hiring needs efficiently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="mt-4 px-6 py-3 bg-yellow-500 text-white hover:bg-yellow-600 text-base font-semibold">
              Post a Job
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
