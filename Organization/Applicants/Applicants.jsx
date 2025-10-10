"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Search, Eye, Send, Clock, BriefcaseBusiness, MapPin } from "lucide-react";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/components/ui/dialog";

function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default function Applicants({ orgId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Fetch applicants from secure API
  useEffect(() => {
    const fetchApplicants = async () => {
      if (!orgId) return;
      try {
        setIsLoading(true);
        const res = await fetch(`/api/Org/${orgId}/JobApplications`);
        const data = await res.json();
        setApplicants(data);
        setFilteredApplicants(data);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplicants();
  }, [orgId]);

  // Filter applicants by search term
  useEffect(() => {
    const filtered = applicants.filter(
      (app) =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.jobId?.position || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplicants(filtered);
  }, [searchTerm, applicants]);

  const handleReply = (app) => {
    setCurrentApplicant(app);
    setReplyMessage("");
    setIsReplyOpen(true);
  };

  const sendReply = async () => {
    if (!replyMessage.trim()) return alert("Message cannot be empty!");
    setIsSending(true);
    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: currentApplicant._id,
          applicantEmail: currentApplicant.email,
          applicantName: currentApplicant.fullName,
          message: replyMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send reply");
      alert("Reply sent successfully!");
      setIsReplyOpen(false);
      setReplyMessage("");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to send reply.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">All Applicants</h1>
      <p className="text-gray-600 mb-6">See which job each applicant applied to</p>

      {/* Search */}
      <div className="mb-4 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search applicants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Applicants List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
        </div>
      ) : filteredApplicants.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No applicants found.</div>
      ) : (
        <div className="space-y-4">
          {filteredApplicants.map((app) => (
            <Card
              key={app._id}
              className="border border-gray-200 hover:shadow-md transition-all rounded-lg"
            >
              <CardContent className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{app.fullName}</h3>
                  <p className="text-gray-600 text-sm">{app.email}</p>
                  <div className="flex flex-wrap items-center gap-2 text-gray-500 mt-1 text-sm">
                    <BriefcaseBusiness className="h-4 w-4" />
                    <span>{app.jobId?.position || "Unknown Job"}</span>
                    <MapPin className="h-4 w-4" />
                    <span>{app.jobId?.jobLocation || "Unknown Location"}</span>
                    <Clock className="h-4 w-4" />
                    <span>{timeAgo(app.createdAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-2 md:mt-0">
                  {app.cv && (
                    <Button
                      variant="outline"
                      className="gap-1 text-gray-600 border-gray-300"
                      onClick={() => window.open(app.cv, "_blank")}
                    >
                      <Eye className="h-4 w-4" />
                      View CV
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    className="gap-1 text-blue-600"
                    onClick={() => handleReply(app)}
                  >
                    <Send className="h-4 w-4" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Reply to Applicant</DialogTitle>
            <DialogDescription>
              Send a message to <span className="font-semibold">{currentApplicant?.fullName}</span>
              {currentApplicant?.email && <> ({currentApplicant.email})</>}
            </DialogDescription>
          </DialogHeader>

          <Textarea
            placeholder="Write your reply..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            className="min-h-[120px] mt-4"
            disabled={isSending}
          />

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsReplyOpen(false)}
              className="mr-2"
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button
              onClick={sendReply}
              className="bg-blue-600 text-white"
              disabled={isSending || !replyMessage.trim()}
            >
              {isSending ? "Sending..." : "Send Reply"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
