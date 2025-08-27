"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./Header"
import WelcomeBanner from "./WelcomeBanner"
import StatsGrid from "./StatsGrid"
import QuickActions from "./QuickActions"
import JobApplications from "./JobApplications"
import ActiveJobListings from "./ActiveJobListings"
import Insights from "./Insights"
import CallToAction from "./CallToActions"

export default function OrganizationDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push("/auth"),
  })

  const [showWelcome, setShowWelcome] = useState(true)
  const [activeJobs, setActiveJobs] = useState([])
  const [jobApplications, setJobApplications] = useState([])
  const [isLoadingJobs, setIsLoadingJobs] = useState(true)
  const [isLoadingApplications, setIsLoadingApplications] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "organization") {
      fetchActiveJobs()
      fetchJobApplications()
    } else if (status === "authenticated" && session?.user?.role !== "organization") {
      router.push("/unauthorized")
    }
  }, [status, session])

  const fetchActiveJobs = async () => {
    setIsLoadingJobs(true)
    try {
      const response = await fetch(
        `/api/Org/listjob?active=true&postedBy=${encodeURIComponent(session?.user?.email)}`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
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

  const fetchJobApplications = async () => {
    setIsLoadingApplications(true)
    try {
      const response = await fetch(
        `/api/Org/JobApplications?postedBy=${encodeURIComponent(session?.user?.email)}`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
      )
      if (!response.ok) throw new Error("Failed to fetch applications")
      const applications = await response.json()
      setJobApplications(applications)
    } catch (error) {
      console.error("Error fetching job applications:", error)
      toast.error("Failed to load job applications. Please try again.")
    } finally {
      setIsLoadingApplications(false)
    }
  }

  const filteredJobs = activeJobs.filter((job) => {
    const matchesCategory = selectedCategory === "all" || job.jobCategory === selectedCategory
    const matchesSearch =
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobLocation.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredApplications = jobApplications.filter((app) => {
    const job = app.jobId || {}
    return (
      job.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobLocation?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-gray-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === "authenticated" && session?.user?.role !== "organization") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-red-600 text-lg sm:text-xl text-center">
          Unauthorized: Only organizations can view this dashboard.
        </div>
      </div>
    )
  }

  return (
    <>
      <ToastContainer />
      <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-white">
        <Header user={session?.user} router={router} />
        {showWelcome && (
          <div className="mt-4">
            <WelcomeBanner user={session?.user} setShowWelcome={setShowWelcome} activeJobs={activeJobs} />
          </div>
        )}
        <div className="mt-6">
          <StatsGrid activeJobs={activeJobs} jobApplications={jobApplications} />
        </div>
        <div className="mt-6">
          <QuickActions router={router} />
        </div>
        <div className="mt-8">
          <JobApplications
            isLoadingApplications={isLoadingApplications}
            filteredApplications={filteredApplications}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className="mt-8">
          <ActiveJobListings
            isLoadingJobs={isLoadingJobs}
            filteredJobs={filteredJobs}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            router={router}
          />
        </div>
        <div className="mt-8">
          <Insights filteredJobs={filteredJobs} />
        </div>
        <div className="mt-8">
          <CallToAction router={router} />
        </div>
      </div>
    </>
  )
}
