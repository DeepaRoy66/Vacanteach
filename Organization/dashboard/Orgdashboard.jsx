"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
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
import Link from "next/link"

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
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // ---------------- Navbar Component ----------------
  const Navbar = ({ orgId, user }) => {
    return (
      <nav className="sticky top-0 bg-green-600 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-2 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl">
            SikshakRojgar
          </Link>

          <div className="hidden lg:flex items-center space-x-4">
            {orgId && (
              <Link
                href={`/organization/${orgId}/postjob`}
                className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 hover:text-green-700 font-medium transition-colors"
              >
                PostJob
              </Link>
            )}

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:bg-green-700 p-2 rounded-lg transition-colors"
              >
                {user?.image ? (
                  <img src={user.image} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 font-bold">
                    {user?.email?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <span className="text-white font-medium">{user?.organizationName || user?.email}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }
  // ---------------- End Navbar ----------------

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
  // ---------------- End Verify ----------------

  // Fetch dashboard data after authorization
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
      const jobs = await response.json()
      setActiveJobs(jobs)
    } catch (error) {
      toast.error("Failed to load active jobs. Please try again.")
    } finally {
      setIsLoadingJobs(false)
    }
  }

  const fetchJobApplications = async () => {
    setIsLoadingApplications(true)
    try {
      const response = await fetch(`/api/Org/JobApplications?orgId=${encodeURIComponent(orgId)}`)
      if (!response.ok) throw new Error("Failed to fetch applications")
      const applications = await response.json()
      setJobApplications(applications)
    } catch (error) {
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
      <Navbar orgId={orgId} user={session?.user} />
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
