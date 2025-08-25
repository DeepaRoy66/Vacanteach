import React from "react";
import { Button } from "../../app/components/ui/button";
import { Bell, Settings, Plus } from "lucide-react";

export default function Header({ user, router }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.name || "there"}! Here's what's happening with your jobs.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Bell className="h-4 w-4" />
          Notifications
        </Button>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Button
          className="gap-2 bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/organization/postjob")}
        >
          <Plus className="h-4 w-4" />
          Post New Job
        </Button>
      </div>
    </div>
  );
}