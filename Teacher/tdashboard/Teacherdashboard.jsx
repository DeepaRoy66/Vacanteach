"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Bell, Search, ChevronDown, MapPin, Clock, DollarSign, Star, TrendingUp, Users, BookOpen, Award, Target, Calendar, Briefcase, Eye, Heart, ArrowUpRight, ArrowDownRight, MoreHorizontal, Filter, Download, CheckCircle, XCircle, AlertCircle, Activity, Zap, Globe, LogOut, User, Settings, BarChart } from 'lucide-react';
import { Button } from "../../app/components/ui/button";
import { Input } from "../../app/components/ui/input";
import { Card, CardContent, CardTitle, CardHeader } from "../../app/components/ui/card";
import { Badge } from "../../app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../app/components/ui/avatar";
import { Progress } from "../../app/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../app/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../app/components/ui/chart";
import { Bar,  Line, LineChart, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, RadialBarChart, RadialBar } from "recharts";

// Enhanced static data
const jobCategories = [
  "Mathematics", "Science", "English", "History", "Art", "Music", "Physical Education", "Computer Science"
];

const performanceData = [
  { month: "Jan", applications: 45, interviews: 32, hired: 18, success: 40 },
  { month: "Feb", applications: 52, interviews: 38, hired: 22, success: 58 },
  { month: "Mar", applications: 48, interviews: 35, hired: 20, success: 57 },
  { month: "Apr", applications: 61, interviews: 45, hired: 28, success: 62 },
  { month: "May", applications: 55, interviews: 42, hired: 25, success: 60 },
  { month: "Jun", applications: 67, interviews: 50, hired: 32, success: 64 }
];

const skillsData = [
  { skill: "Mathematics", proficiency: 95, demand: 88 },
  { skill: "Science", proficiency: 87, demand: 92 },
  { skill: "English", proficiency: 92, demand: 85 },
  { skill: "Technology", proficiency: 78, demand: 95 },
  { skill: "Leadership", proficiency: 85, demand: 80 }
];

const categoryData = [
  { name: "Elementary", value: 35, color: "#8884d8" },
  { name: "Middle School", value: 28, color: "#82ca9d" },
  { name: "High School", value: 25, color: "#ffc658" },
  { name: "Special Ed", value: 12, color: "#ff7c7c" }
];

const recentActivity = [
  { id: 1, type: "application", title: "Applied to Lincoln High School", time: "2 hours ago", status: "pending" },
  { id: 2, type: "interview", title: "Interview scheduled with Sunshine Elementary", time: "1 day ago", status: "scheduled" },
  { id: 3, type: "offer", title: "Job offer from EduTech Solutions", time: "2 days ago", status: "received" },
  { id: 4, type: "profile", title: "Profile viewed by Roosevelt Middle School", time: "3 days ago", status: "viewed" }
];

const topSchools = [
  { name: "Lincoln High School", logo: "LH", rating: 4.9, jobs: 12, salary: "$65k" },
  { name: "Sunshine Elementary", logo: "SE", rating: 4.8, jobs: 8, salary: "$52k" },
  { name: "Roosevelt Middle", logo: "RM", rating: 4.7, jobs: 15, salary: "$58k" },
  { name: "Tech Academy", logo: "TA", rating: 4.9, jobs: 6, salary: "$72k" }
];

const jobPostings = [
  {
    id: 1,
    title: "Senior Mathematics Teacher",
    school: "Lincoln High School",
    location: "New York, NY",
    type: "Full-time",
    salary: "$65,000 - $80,000",
    posted: "2 days ago",
    description: "Lead mathematics department and teach advanced calculus and statistics courses.",
    requirements: ["Master's degree in Mathematics", "5+ years teaching experience", "Department leadership experience"],
    rating: 4.9,
    applicants: 23,
    urgent: true,
    remote: false,
    benefits: ["Health Insurance", "Retirement Plan", "Professional Development"]
  },
  {
    id: 2,
    title: "STEM Coordinator",
    school: "Innovation Academy",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$70,000 - $85,000",
    posted: "1 day ago",
    description: "Coordinate STEM programs across K-12 and develop innovative curriculum.",
    requirements: ["STEM Education degree", "Curriculum development", "Project management skills"],
    rating: 4.8,
    applicants: 31,
    urgent: false,
    remote: true,
    benefits: ["Stock Options", "Flexible Hours", "Learning Budget"]
  },
  {
    id: 3,
    title: "Online ESL Instructor",
    school: "Global Education Hub",
    location: "Remote",
    type: "Contract",
    salary: "$30 - $45/hour",
    posted: "3 hours ago",
    description: "Teach English as a Second Language to international students online.",
    requirements: ["TESOL Certification", "Online teaching experience", "Cultural sensitivity"],
    rating: 4.7,
    applicants: 18,
    urgent: true,
    remote: true,
    benefits: ["Flexible Schedule", "Global Network", "Training Provided"]
  }
];

export default function TeacherDashboard() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                    VacanTeach
                  </h1>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-1 hover:bg-blue-50">
                      <span>Browse Jobs</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md border border-gray-100">
                    {jobCategories.map((category) => (
                      <DropdownMenuItem key={category} className="hover:bg-blue-50 px-4 py-2 cursor-pointer">
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" className="hover:bg-blue-50">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending Jobs
                </Button>

                <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search jobs..."
                      className="pl-10 w-64 border-0 bg-transparent focus:ring-2 focus:ring-green-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Location"
                      className="pl-10 w-40 border-0 bg-transparent focus:ring-2 focus:ring-blue-500"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50 rounded-lg p-2">
                    <Avatar className="h-8 w-8 ring-2 ring-blue-200">
                      <AvatarImage src={session?.user?.image || "/placeholder.svg?height=32&width=32"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        {session?.user?.name?.[0] || "JD"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block font-medium">{session?.user?.name || "John Doe"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-white shadow-xl rounded-xl border border-gray-100 p-2 mt-2">
                  <DropdownMenuLabel className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 ring-2 ring-blue-200">
                        <AvatarImage src={session?.user?.image || "/placeholder.svg?height=40&width=40"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                          {session?.user?.name?.[0] || "JD"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{session?.user?.name || "John Doe"}</p>
                        <p className="text-sm text-gray-500 truncate">{session?.user?.email || "Not available"}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <div className="py-2">
                    <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                      <User className="h-4 w-4 text-gray-600" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                      <Settings className="h-4 w-4 text-gray-600" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                      <BarChart className="h-4 w-4 text-gray-600" />
                      <span>Analytics</span>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

                  <DropdownMenuItem asChild>
                    <Button
                      variant="ghost"
                      className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                      onClick={() => signOut({ callbackUrl: "/auth" })}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 via-green-600 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name || "John"}! 👋</h2>
              <p className="text-blue-100 mb-4">You have 5 new job matches and 3 interview requests waiting for you.</p>
              <div className="flex space-x-4">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  View Matches
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Schedule Interviews
                </Button>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Applications</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">328</div>
              <div className="flex items-center space-x-2 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+12% from last month</span>
              </div>
              <Progress value={75} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Interview Rate</CardTitle>
              <div className="p-2 bg-green-500 rounded-lg">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">74.2%</div>
              <div className="flex items-center space-x-2 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+8% from last month</span>
              </div>
              <Progress value={74} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Success Rate</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg">
                <Award className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">94.2%</div>
              <div className="flex items-center space-x-2 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+2.1% from last month</span>
              </div>
              <Progress value={94} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Avg. Salary</CardTitle>
              <div className="p-2 bg-orange-500 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">$68,400</div>
              <div className="flex items-center space-x-2 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+5.2% from last month</span>
              </div>
              <Progress value={68} className="mt-3" />
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <span>Performance Analytics</span>
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md border border-gray-100">
                    <DropdownMenuItem className="hover:bg-blue-50 px-4 py-2 cursor-pointer">Export Data</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-blue-50 px-4 py-2 cursor-pointer">View Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="success">Success Rate</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <ChartContainer
                    config={{
                      applications: { label: "Applications", color: "hsl(var(--chart-1))" },
                      interviews: { label: "Interviews", color: "hsl(var(--chart-2))" },
                      hired: { label: "Hired", color: "hsl(var(--chart-3))" }
                    }}
                    className="h-[300px]"
                  >
                    <AreaChart data={performanceData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="applications" stackId="1" stroke="var(--color-applications)" fill="var(--color-applications)" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="interviews" stackId="1" stroke="var(--color-interviews)" fill="var(--color-interviews)" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="hired" stackId="1" stroke="var(--color-hired)" fill="var(--color-hired)" fillOpacity={0.6} />
                    </AreaChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="applications" className="mt-4">
                  <ChartContainer
                    config={{
                      applications: { label: "Applications", color: "hsl(var(--chart-1))" }
                    }}
                    className="h-[300px]"
                  >
                    <BarChart data={performanceData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="applications" fill="var(--color-applications)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="success" className="mt-4">
                  <ChartContainer
                    config={{
                      success: { label: "Success Rate", color: "hsl(var(--chart-3))" }
                    }}
                    className="h-[300px]"
                  >
                    <LineChart data={performanceData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="success" stroke="var(--color-success)" strokeWidth={3} dot={{ fill: "var(--color-success)", strokeWidth: 2, r: 6 }} />
                    </LineChart>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <span>Skills Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsData.map((skill) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{skill.skill}</span>
                        <span className="text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                      <div className="flex space-x-2">
                        <Progress value={skill.proficiency} className="flex-1" />
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1" style={{ opacity: skill.demand / 100 }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-500" />
                  <span>Job Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Jobs", color: "hsl(var(--chart-1))" }
                  }}
                  className="h-[200px]"
                >
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity & Top Schools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      {activity.status === 'pending' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                      {activity.status === 'scheduled' && <Calendar className="h-5 w-5 text-blue-500" />}
                      {activity.status === 'received' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {activity.status === 'viewed' && <Eye className="h-5 w-5 text-purple-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <Badge variant={activity.status === 'received' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-gold-500" />
                <span>Top Schools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSchools.map((school, index) => (
                  <div key={school.name} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                          {school.logo}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{school.name}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-500 ml-1">{school.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{school.jobs} jobs</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{school.salary}</p>
                      <p className="text-xs text-gray-500">avg salary</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
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
            <div className="space-y-6">
              {jobPostings.map((job) => (
                <div key={job.id} className="border rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
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
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        {job.remote && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            Remote
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="font-medium text-blue-600">{job.school}</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.posted}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          {job.type}
                        </Badge>
                        <span className="text-green-600 font-semibold text-lg">{job.salary}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{job.rating}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 text-right space-y-3">
                      <div className="text-sm text-gray-500">
                        <Users className="h-4 w-4 inline mr-1" />
                        {job.applicants} applicants
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full">
                        Apply Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Heart className="h-4 w-4 mr-2" />
                        Save Job
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full text-blue-600">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" className="px-8">
                Load More Jobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}