import React from "react";
import { Card, CardContent } from "../../app/components/ui/card";
import { Sparkles, X } from "lucide-react";

export default function WelcomeBanner({ user, setShowWelcome, activeJobs }) {
  return (
    <Card className="bg-gradient-to-r from-green-600 to-green-600 text-white border-0 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      <CardContent className="p-6 relative z-10">
        <button
          onClick={() => setShowWelcome(false)}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold mb-2">
              Welcome back, {user?.name || "there"}! Here's what's happening with your jobs.
            </h1>
            <p className="text-sm text-gray-600">You have {activeJobs.length} active job postings.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}