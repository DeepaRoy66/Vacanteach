import React from "react";
import { Button } from "../../app/components/ui/button";
import { Plus, Search, Users } from "lucide-react";

export default function QuickActions({ router }) {
  return (
    <div className="mt-8 w-full">
      {/* Heading */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
        Quick Actions
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
        Manage your recruitment process efficiently
      </p>

      {/* Actions */}
      <div className="mt-4 flex flex-col md:flex-row gap-3 sm:gap-4 w-full">
        {/* Post New Job */}
        <Button
          variant="outline"
          className="flex-1 min-h-[48px] sm:min-h-[52px] gap-2 border-dashed border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors text-sm sm:text-base"
          onClick={() => router.push("/organization/postjob")}
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          Post New Job
        </Button>

        {/* Browse Applicants */}
        <Button
          variant="outline"
          className="flex-1 min-h-[48px] sm:min-h-[52px] gap-2 border-dashed border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors text-sm sm:text-base"
          onClick={() => router.push("/organization/Applicants")}
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          Browse Applicants
        </Button>

        {/* View Applications */}
        <Button
          variant="outline"
          className="flex-1 min-h-[48px] sm:min-h-[52px] gap-2 border-dashed border-gray-400 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors text-sm sm:text-base"
          onClick={() => router.push("/organization/applications")}
        >
          <Users className="h-4 w-4 sm:h-5 sm:w-5" />
          View Applications
        </Button>
      </div>
    </div>
  );
}
