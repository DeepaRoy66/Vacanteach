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

export default function OrganizationDashboard({ orgId }) {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [showWelcome, setShowWelcome] = useState(true)
  const [activeJobs, setActiveJobs] = useState([])
  const [jobApplications, setJobApplications] = useState([])
  const [isLoadingJobs, setIsLoadingJobs] = useState(true)
  const [isLoadingApplications, setIsLoadingApplications] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isVerifyingAuth, setIsVerifyingAuth] = useState(true)
  const [authError, setAuthError] = useState(null)

  // ---------------- Verify Access ----------------
  useEffect(() => {
    async function verifyAccess() {
      if (status === "loading") return
      if (status === "unauthenticated" || !session?.user?.email) {
        router.push("/auth")
        return
      }
      if (!session.user.role || !session.user.profileCompleted) {
        router.push("/select-role")
        return
      }
      if (session.user.role !== "organization") {
        toast.error("Access denied. Organization role required.")
        router.push("/")
        return
      }
      try {
        setIsAuthorized(true)
      } catch (error) {
        setAuthError(error.message)
        toast.error("Failed to verify access")
        router.push("/")
      } finally {
        setIsVerifyingAuth(false)
      }
    }
    verifyAccess()
  }, [status, session, orgId, router])

  // ---------------- Fetch dashboard data ----------------
  useEffect(() => {
    if (isAuthorized && !isVerifyingAuth) {
      fetchActiveJobs()
      fetchJobApplications()
    }
  }, [isAuthorized, isVerifyingAuth, orgId])

  const fetchActiveJobs = async () => {
    setIsLoadingJobs(true)
    try {
      const response = await fetch(`/api/Org/listjob?active=true&orgId=${encodeURIComponent(orgId)}`)
      if (!response.ok) throw new Error("Failed to fetch jobs")

      const data = await response.json()
      console.log("Fetched jobs:", data)

      // Ensure it's always an array
      const jobsArray = Array.isArray(data) ? data : data.jobs || []
      setActiveJobs(jobsArray)
    } catch (error) {
      toast.error("Failed to load active jobs. Please try again.")
      setActiveJobs([]) // fallback
    } finally {
      setIsLoadingJobs(false)
    }
  }

  const fetchJobApplications = async () => {
    setIsLoadingApplications(true)
    try {
      const response = await fetch(`/api/Org/JobApplications?orgId=${encodeURIComponent(orgId)}`)
      if (!response.ok) throw new Error("Failed to fetch applications")

      const data = await response.json()
      console.log("Fetched applications:", data)

      // Ensure it's always an array
      const applicationsArray = Array.isArray(data) ? data : data.applications || []
      setJobApplications(applicationsArray)
    } catch (error) {
      toast.error("Failed to load job applications. Please try again.")
      setJobApplications([]) // fallback
    } finally {
      setIsLoadingApplications(false)
    }
  }

  const filteredJobs = activeJobs.filter((job) => {
    const matchesCategory = selectedCategory === "all" || job.jobCategory === selectedCategory
    const matchesSearch =
      job.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobLocation?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredApplications = jobApplications.filter((app) => {
    const job = app.jobId || {}
    return (
      job.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.jobLocation?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // ---------------- Loading or Error ----------------
  if (status === "loading" || isVerifyingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {status === "loading" ? "Loading your dashboard..." : "Verifying access..."}
          </p>
        </div>
      </div>
    )
  }

  if (authError || !isAuthorized) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            {authError || "You don't have permission to access this organization"}
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <ToastContainer />
      <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-white">
        <Header user={session?.user} router={router} orgId={orgId} />
        {showWelcome && (
          <div className="mt-4">
            <WelcomeBanner user={session?.user} setShowWelcome={setShowWelcome} activeJobs={activeJobs} />
          </div>
        )}
        <div className="mt-6">
          <StatsGrid activeJobs={activeJobs} jobApplications={jobApplications} />
        </div>
        <div className="mt-6">
          <QuickActions router={router} orgId={orgId} />
        </div>
        <div className="mt-8">
          <JobApplications
            isLoadingApplications={isLoadingApplications}
            filteredApplications={filteredApplications}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            orgId={orgId}
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
            orgId={orgId}
          />
        </div>
        <div className="mt-8">
          <Insights filteredJobs={filteredJobs} />
        </div>
        <div className="mt-8">
          <CallToAction router={router} orgId={orgId} />
        </div>
      </div>
    </>
  )
}
