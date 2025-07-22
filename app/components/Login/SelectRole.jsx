"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SelectRole() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      setFormData((prev) => ({ ...prev, email: session.user.email }));
    }
  }, [status, session]);

  // Redirect to welcome or teacher if role is already selected
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      if (session.user.role === "client") {
        router.push("/welcome");
      } else if (session.user.role === "teacher") {
        router.push("/teacher");
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading session...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleRoleSelection = () => {
    if (!selectedRole) {
      toast.error("Please select a role.");
      return;
    }
    setIsFormVisible(true);
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all fields.");
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/user/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: selectedRole }),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Profile created successfully!");
        await signIn("google", { redirect: false });
        if (selectedRole === "client") {
          router.push("/welcome");
        } else if (selectedRole === "teacher") {
          router.push("/teacher");
        }
      } else {
        toast.error(result.message || "Failed to create profile.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Join as a client or teacher
        </h2>
        {!isFormVisible ? (
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
              Already have an account?{" "}
              <a href="/login" className="underline">
                Log In
              </a>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
              Complete Your Profile
            </h3>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleFormSubmit}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Want to change your role?{" "}
              <span
                onClick={() => setIsFormVisible(false)}
                className="underline cursor-pointer"
              >
                Go back
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}