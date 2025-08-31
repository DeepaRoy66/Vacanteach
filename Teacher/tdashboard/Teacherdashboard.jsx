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

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query params
      const query = new URLSearchParams({
        search: searchQuery,
        location: searchLocation,
        teacherId, // Include teacherId in query
      }).toString();

      // Fetch all jobs
      const jobsResponse = await fetch(`/api/Org/getjob?${query}`);
      if (jobsResponse.status === 404) {
        setJobs([]);
        toast({ message: "No jobs found", variant: "info" });
      } else if (!jobsResponse.ok) {
        throw new Error(`Failed to fetch jobs: ${jobsResponse.status}`);
      } else {
        const jobsData = await jobsResponse.json();
        if (Array.isArray(jobsData)) {
          setJobs(jobsData);
        } else {
          throw new Error("Invalid jobs data format");
        }
      }

      // Fetch top jobs
      const topJobsResponse = await fetch(`/api/Org/getjobs?sortBy=views&limit=4`);
      if (topJobsResponse.status === 404) {
        setTopJobs([]);
        toast({ message: "No top jobs found", variant: "info" });
      } else if (!topJobsResponse.ok) {
        throw new Error("Failed to fetch top jobs");
      } else {
        const topJobsData = await topJobsResponse.json();
        if (Array.isArray(topJobsData)) {
          setTopJobs(topJobsData);
        } else {
          throw new Error("Invalid top jobs data format");
        }
      }

      // Fetch previous month job stats
      const currentDate = new Date();
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
        .toISOString()
        .slice(0, 7);
      const statsResponse = await fetch(`/api/Org/jobstats?month=${previousMonth}`);
      if (!statsResponse.ok) {
        setPreviousMonthJobs(0);
        toast({ message: "No job stats available for previous month", variant: "info" });
      } else {
        const statsData = await statsResponse.json();
        setPreviousMonthJobs(statsData.jobCount || 0);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load data. Please try again.");
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
    } catch (err) {
      console.error("Error incrementing job view:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, searchLocation, teacherId]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const currentJobs = jobs.length;
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
          <TopJobs topJobs={topJobs} />
        </div>
        <JobListings
          jobs={jobs}
          loading={loading}
          incrementJobView={incrementJobView}
        />
      </div>
    </div>
  );
}