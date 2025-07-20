"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function SelectRole() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);

  async function handleRoleSelection() {
    if (!selectedRole) {
      toast.error("Please select a role.");
      return;
    }

    try {
      const response = await fetch("/api/user/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (response.ok) {
        toast.success("Role selected successfully!");
        router.push("/welcome");
      } else {
        toast.error("Failed to save role. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }

  if (status === "loading") {
    return null;
  }

  if (status !== "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Join as a client or teacher</h2>
        <div className="space-y-4">
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="role"
              value="client"
              checked={selectedRole === "client"}
              onChange={() => setSelectedRole("client")}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">I'm a client, hiring for a project</span>
          </label>
          <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={selectedRole === "teacher"}
              onChange={() => setSelectedRole("teacher")}
              className="mr-3 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">I'm a teacher, looking for work</span>
          </label>
          <button
            onClick={handleRoleSelection}
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
            disabled={!selectedRole}
          >
            Create Account
          </button>
          <p className="text-center text-sm text-green-600 mt-4">
            Already have an account? <a href="/login" className="underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SelectRole;