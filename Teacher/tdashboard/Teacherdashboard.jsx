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

export default function TeacherDashboard() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [topJobs, setTopJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousMonthJobs, setPreviousMonthJobs] = useState(0);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      console.log("Fetching jobs from /api/Org/getjob");
      const query = new URLSearchParams({ search: searchQuery, location: searchLocation }).toString();
      const jobsResponse = await fetch(`/api/Org/getjob?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      console.log("Jobs response status:", jobsResponse.status);
      if (!jobsResponse.ok) {
        const text = await jobsResponse.text();
        throw new Error(`HTTP error! status: ${jobsResponse.status}, content: ${text.substring(0, 100)}...`);
      }
      const jobsData = await jobsResponse.json();
      console.log("Fetched jobs:", jobsData);
      setJobs(jobsData || []); // Ensure jobs is always an array

      const topJobsResponse = await fetch(`/api/Org/getjobs?sortBy=views&limit=4`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      if (!topJobsResponse.ok) {
        console.warn("Failed to fetch top jobs:", await topJobsResponse.text());
        setTopJobs([]);
      } else {
        const topJobsData = await topJobsResponse.json();
        console.log("Fetched top jobs:", topJobsData);
        setTopJobs(topJobsData || []);
      }

      const currentDate = new Date();
      const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1).toISOString().slice(0, 7);
      const statsResponse = await fetch(`/api/Org/jobstats?month=${previousMonth}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      if (!statsResponse.ok) {
        console.warn("No job stats available for previous month");
        setPreviousMonthJobs(0);
      } else {
        const statsData = await statsResponse.json();
        setPreviousMonthJobs(statsData.jobCount || 0);
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(null); // Don't set error to avoid showing error page
      setJobs([]); // Set empty array to show "No jobs available" in JobListings
      setTopJobs([]); // Set empty array to show "No top jobs available" in TopJobs
    } finally {
      setLoading(false);
    }
  };

  const incrementJobView = async (jobId) => {
    try {
      const response = await fetch(`/api/Org/incrementView`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ jobId }),
      });
      if (!response.ok) {
        console.warn("Failed to increment job view");
      }
    } catch (err) {
      console.error("Error incrementing job view:", err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, searchLocation]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const currentJobs = jobs.length;
  const percentageChange = previousMonthJobs
    ? ((currentJobs - previousMonthJobs) / previousMonthJobs) * 100
    : 0;
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