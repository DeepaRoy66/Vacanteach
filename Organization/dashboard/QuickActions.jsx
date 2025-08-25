import React from "react";
import { Button } from "../../app/components/ui/button";
import { Plus, Search, Users } from "lucide-react";

export default function QuickActions({ router }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
      <p className="text-gray-600 mt-1">
        Manage your recruitment process efficiently
      </p>
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        {/* Post New Job Button */}
        <Button
          variant="outline"
          className="flex-1 gap-2 border-dashed border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => router.push("/organization/postjob")}
        >
          <Plus className="h-5 w-5" />
          Post New Job
        </Button>

        {/* Browse Candidates Button */}
        <Button
          variant="outline"
          className="flex-1 gap-2 border-dashed border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => router.push("/organization/candidates")}
        >
          <Search className="h-5 w-5" />
          Browse Candidates
        </Button>

        {/* View Applications Button */}
        <Button
          variant="outline"
          className="flex-1 gap-2 border-dashed border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          onClick={() => router.push("/organization/applications")}
        >
          <Users className="h-5 w-5" />
          View Applications
        </Button>
      </div>
    </div>
  );
}