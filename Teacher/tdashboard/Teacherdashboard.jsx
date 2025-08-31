"use client";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import NavBar from "./Navbar";
import { Button } from "../../app/components/ui/button";
import WelcomeSection from "./WelcomeSection";
import DashboardStats from "./DashBoardStats";
import RecentActivity from "./RecentActivity";
import TopJobs from "./TopJobs";
import JobListings from "./JobListings";
import { toast } from "react-toastify";

const jobCategories = [
  "Mathematics", "Science", "English", "History", "Art", "Music", "Physical Education", "Computer Science"
];

const recentActivity = [
  { id: 1, type: "application", title: "Applied to Lincoln High School", time: "2 hours ago", status: "pending" },
  { id: 2, type: "interview", title: "Interview scheduled with Sunshine Elementary", time: "1 day ago", status: "scheduled" },
  { id: 3, type: "offer", title: "Job offer from EduTech Solutions", time: "2 days ago", status: "received" },
  { id: 4, type: "profile", title: "Profile viewed by Roosevelt Middle School", time: "3 days ago", status: "viewed" }
];

export default function TeacherDashboard({ teacherId }) {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [topJobs, setTopJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousMonthJobs, setPreviousMonthJobs] = useState(0);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const fetchJobs = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      // Build query params for general jobs API
      const queryParams = new URLSearchParams({
        active: 'true', // Only show active jobs
        page: page.toString(),
        limit: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(searchLocation && { location: searchLocation }),
        sortBy: 'createdAt'
      });

      // Fetch all jobs from all organizations
      const jobsResponse = await fetch(`/api/jobs?${queryParams}`);
      
      if (!jobsResponse.ok) {
        throw new Error(`Failed to fetch jobs: ${jobsResponse.status}`);
      }

      const jobsData = await jobsResponse.json();
      setJobs(jobsData.jobs || []);
      setPagination(jobsData.pagination || {});

      // Fetch top jobs (most viewed)
      const topJobsParams = new URLSearchParams({
        active: 'true',
        sortBy: 'views',
        limit: '4'
      });

      const topJobsResponse = await fetch(`/api/jobs?${topJobsParams}`);
      if (topJobsResponse.ok) {
        const topJobsData = await topJobsResponse.json();
        setTopJobs(topJobsData.jobs || []);
      }

      // Calculate previous month stats
      const currentDate = new Date();
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
      const lastMonthParams = new URLSearchParams({
        active: 'true',
        // You might need to add date filtering to your API
        // For now, we'll use a rough estimate
      });
      
      // Estimate previous month jobs (you may want to enhance your API for this)
      setPreviousMonthJobs(Math.max(0, (jobsData.pagination?.totalJobs || 0) - 5));

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load jobs. Please try again.");
      setJobs([]);
      setTopJobs([]);
      setPreviousMonthJobs(0);
    } finally {
      setLoading(false);
    }
  };

  const incrementJobView = async (jobId) => {
    try {
      const response = await fetch(`/api/Org/incrementView`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      if (!response.ok) throw new Error("Failed to increment job view");
      
      // Update the job views in state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job._id === jobId 
            ? { ...job, views: (job.views || 0) + 1 }
            : job
        )
      );
    } catch (err) {
      console.error("Error incrementing job view:", err);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSearchLocation("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchJobs(newPage);
  };

  useEffect(() => {
    fetchJobs(currentPage);
  }, [searchQuery, searchLocation]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentJobs = pagination.totalJobs || 0;
  const percentageChange = previousMonthJobs
    ? ((currentJobs - previousMonthJobs) / previousMonthJobs) * 100
    : currentJobs > 0 ? 100 : 0;
  const isPositiveChange = percentageChange >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <NavBar
        session={session}
        jobCategories={jobCategories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        signOut={signOut}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
            <button 
              onClick={() => fetchJobs(currentPage)}
              className="ml-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}
        
        <WelcomeSection session={session} />
        
        <DashboardStats
          currentJobs={currentJobs}
          percentageChange={percentageChange}
          isPositiveChange={isPositiveChange}
          topJobs={topJobs}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RecentActivity recentActivity={recentActivity} />
          <TopJobs topJobs={topJobs} incrementJobView={incrementJobView} />
        </div>
        
        <JobListings
          jobs={jobs}
          loading={loading}
          incrementJobView={incrementJobView}
          searchQuery={searchQuery}
          searchLocation={searchLocation}
          resetFilters={resetFilters}
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}