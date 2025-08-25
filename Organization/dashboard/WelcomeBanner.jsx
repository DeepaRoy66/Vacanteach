import React from "react";
import { Card, CardContent } from "../../app/components/ui/card";
import { Sparkles, X } from "lucide-react";

export default function WelcomeBanner({ user, setShowWelcome, activeJobs }) {
  return (
    <Card className="bg-gradient-to-r from-green-600 to-green-600 text-white border-0 relative overflow-hidden w-full">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full -translate-y-12 sm:-translate-y-16 translate-x-12 sm:translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/10 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
      
      <CardContent className="p-4 sm:p-6 relative z-10">
        {/* Close Button */}
        <button
          onClick={() => setShowWelcome(false)}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white/80 hover:text-white transition-colors"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Content */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* Icon */}
          <div className="bg-white/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 leading-snug">
              Welcome back, {user?.name || "there"}!{" "}
              <span className="block sm:inline">
                Here's what's happening with your jobs.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-200">
              You have {activeJobs.length} active job postings.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
