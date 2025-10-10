"use client";

import { Button } from "@/app/components/ui/button";

export default function WelcomeSection({ session, jobs }) {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-green-600 via-green-600 to-green-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name || "John"}! 👋</h2>
          <p className="text-blue-100 mb-4">
            You have {jobs?.length || 0} new job matches and 3 interview requests waiting for you.
          </p>
          <div className="flex space-x-4">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              View Matches
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              Schedule Interviews
            </Button>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-green/10 rounded-full -translate-y-32 translate-x-32"></div>
      </div>
    </div>
  );
}