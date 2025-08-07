
"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sidebar,SidebarInset,SidebarProvider } from "../../app/components/ui/sidebar";
import { AppSidebar } from "../../app/(pages)/organization/Sidebar";
import { Button } from "../../app/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "../../app/components/ui/card";
import { BriefcaseBusiness, AlertCircle } from "lucide-react";



export default function ActiveJobs() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => router.push("/auth"),
  });
  const router = useRouter();
  const [activeJobs, setActiveJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "organization") {
      fetchActiveJobs();
    }
  }, [status, session]);

  const fetchActiveJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/Org/listjob?active=true&postedBy=${encodeURIComponent(session?.user?.email)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const jobs = await response.json();
      setActiveJobs(jobs);
    } catch (error) {
      console.error("Error fetching active jobs:", error);
      alert("Failed to load active jobs");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse text-blue-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (session?.user?.role !== "organization") {
    router.push("/unauthorized");
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600 text-xl">Unauthorized: Only organizations can view active jobs.</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex-1">
        <div className="flex flex-1">
          <div className="w-80 bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <AppSidebar />
          </div>
          <SidebarInset>
            <div className="flex-1 bg-gray-100 py-10 flex justify-center">
              <div className="container mx-auto max-w-5xl bg-white rounded-xl shadow-lg p-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Active Jobs</h1>
                    <p className="text-gray-500 text-sm mt-1">
                      View all active job listings posted by your organization.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 text-gray-700 bg-transparent border-gray-300 hover:bg-gray-100"
                    onClick={() => router.push("/organization/PostJob")}
                  >
                    <BriefcaseBusiness className="h-4 w-4" /> Post New Job
                  </Button>
                </div>
                {isLoading ? (
                  <div className="text-center text-gray-600">Loading active jobs...</div>
                ) : activeJobs.length === 0 ? (
                  <div className="text-center text-gray-600">No active jobs found.</div>
                ) : (
                  <div className="grid gap-6">
                    {activeJobs.map((job) => (
                      <Card key={job._id} className="border border-gray-200 rounded-lg shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            {job.position}
                            {job.urgent && <AlertCircle className="h-5 w-5 text-red-500" title="Urgent" />}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-sm text-gray-600"><strong>Category:</strong> {job.jobCategory}</p>
                          <p className="text-sm text-gray-600"><strong>Location:</strong> {job.jobLocation}</p>
                          <p className="text-sm text-gray-600"><strong>Type:</strong> {job.jobType}</p>
                          <p className="text-sm text-gray-600">
                            <strong>Salary:</strong>{" "}
                            {job.hideSalary
                              ? "Salary Non Disclosed"
                              : `${job.currency} ${job.minimum}${job.offeredSalaryType === "Range" ? ` - ${job.maximum}` : ""} ${job.salaryType}`}
                          </p>
                          <p className="text-sm text-gray-600"><strong>Status:</strong> {job.active ? "Active" : "Inactive"}</p>
                          {job.urgent && (
                            <p className="text-sm text-red-500"><strong>Urgent:</strong> This job is marked as urgent</p>
                          )}
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => router.push(`/organization/Jobpage/${job._id}`)}
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}