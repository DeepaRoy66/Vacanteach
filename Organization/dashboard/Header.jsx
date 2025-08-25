import React from "react";
import { Button } from "../../app/components/ui/button";
import { Bell, Settings, Plus } from "lucide-react";

export default function Header({ user, router }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Welcome back, {user?.name || "there"}! Here's what's happening with your jobs.
        </p>
      </div>

      {/* Right Section (Buttons) */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Notifications Button */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent text-gray-700 hover:bg-gray-200 hover:text-gray-900 w-full sm:w-auto"
        >
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Notifications</span>
        </Button>

        {/* Settings Button */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent text-gray-700 hover:bg-gray-200 hover:text-gray-900 w-full sm:w-auto"
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </Button>

        {/* Post New Job Button */}
        <Button
          className="gap-2 bg-green-600 text-white hover:bg-green-700 hover:text-white w-full sm:w-auto"
          onClick={() => router.push("/organization/postjob")}
        >
          <Plus className="h-4 w-4" />
          Post New Job
        </Button>
      </div>
    </div>
  );
}
