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

  // Verify authentication and authorization
  useEffect(() => {
    async function verifyAccess() {
      console.log("OrganizationDashboard - Verifying access for orgId:", orgId)
      console.log("OrganizationDashboard - Session status:", status)
      console.log("OrganizationDashboard - Session data:", session?.user)

      // Wait for session to load
      if (status === "loading") {
        console.log("OrganizationDashboard - Session still loading")
        return
      }
      
      // Check if user is authenticated
      if (status === "unauthenticated" || !session?.user?.email) {
        console.log("OrganizationDashboard - User not authenticated, redirecting to /auth")
        router.push("/auth")
        return
      }

      // Check if user has completed profile setup
      if (!session.user.role || !session.user.profileCompleted) {
        console.log("OrganizationDashboard - Profile not completed, redirecting to /select-role")
        router.push("/select-role")
        return
      }

      // Check if user is an organization
      if (session.user.role !== "organization") {
        console.log("OrganizationDashboard - User is not an organization, redirecting to home")
        toast.error("Access denied. Organization role required.")
        router.push("/")
        return
      }

      try {
        console.log("OrganizationDashboard - Fetching organization data")
        const response = await fetch("/api/user/organizationdata")
        
        if (!response.ok) {
          console.error("OrganizationDashboard - Failed to fetch organization data")
          toast.error("Failed to load organization data")
          router.push("/select-role")
          return
        }

        const orgData = await response.json()
        console.log("OrganizationDashboard - Organization data:", orgData)

        // CRITICAL FIX: Use the correct field name from API response
        const userOrgId = orgData.id || orgData._id?.toString()
        const requestedOrgId = orgId?.toString()
        
        console.log("OrganizationDashboard - Comparing IDs:", {
          userOrgId,
          requestedOrgId,
          apiResponse: orgData,
          match: userOrgId === requestedOrgId
        })

        if (userOrgId !== requestedOrgId) {
          console.error("OrganizationDashboard - Organization ID mismatch")
          toast.error("You don't have access to this organization")
          // FIXED: Redirect to home instead of /auth to break the loop
          router.push("/")
          return
        }

        console.log("OrganizationDashboard - Authorization successful")
        setIsAuthorized(true)
        setAuthError(null)

      } catch (error) {
        console.error("OrganizationDashboard - Error verifying access:", error)
        setAuthError(error.message)
        toast.error("Failed to verify access")
        // FIXED: Redirect to home instead of /auth
        router.push("/")
      } finally {
        setIsVerifyingAuth(false)
      }
    }

    verifyAccess()
  }, [status, session, orgId, router])

  // Fetch data only after authorization is confirmed
  useEffect(() => {
    if (isAuthorized && !isVerifyingAuth) {
      console.log("OrganizationDashboard - Fetching dashboard data")
      fetchActiveJobs()
      fetchJobApplications()
    }
  }, [isAuthorized, isVerifyingAuth, orgId])

  const fetchActiveJobs = async () => {
    setIsLoadingJobs(true)
    try {
      console.log("OrganizationDashboard - Fetching active jobs for orgId:", orgId)
      const response = await fetch(
        `/api/Org/listjob?active=true&orgId=${encodeURIComponent(orgId)}`
      )
      if (!response.ok) throw new Error("Failed to fetch jobs")
      const jobs = await response.json()
      console.log("OrganizationDashboard - Active jobs loaded:", jobs.length)
      setActiveJobs(jobs)
    } catch (error) {
      console.error("OrganizationDashboard - Error fetching active jobs:", error)
      toast.error("Failed to load active jobs. Please try again.")
    } finally {
      setIsLoadingJobs(false)
    }
  }

  const fetchJobApplications = async () => {
    setIsLoadingApplications(true)
    try {
      console.log("OrganizationDashboard - Fetching job applications for orgId:", orgId)
      const response = await fetch(
        `/api/Org/JobApplications?orgId=${encodeURIComponent(orgId)}`
      )
      if (!response.ok) throw new Error("Failed to fetch applications")
      const applications = await response.json()
      console.log("OrganizationDashboard - Job applications loaded:", applications.length)
      setJobApplications(applications)
    } catch (error) {
      console.error("OrganizationDashboard - Error fetching job applications:", error)
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

  // Show loading state while verifying
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

  // Show error state if authorization failed
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