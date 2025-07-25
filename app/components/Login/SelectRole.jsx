"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function SelectRole() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasCheckedRole, setHasCheckedRole] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organizationName: "",
    industry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill email and name from session
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email,
        name: session.user.name || "",
      }));
    }
  }, [status, session]);

  // Redirect if already has role and completed profile
  useEffect(() => {
    const checkUserStatus = async () => {
      if (status !== "authenticated" || !session?.user?.email || hasCheckedRole) return;
      setHasCheckedRole(true);

      if (typeof session.user.role !== "undefined" && typeof session.user.profileCompleted !== "undefined") {
        if (session.user.role && session.user.profileCompleted) {
          if (session.user.role === "organization") {
            router.push("/orgs");
          } else if (session.user.role === "teacher") {
            router.push("/teacher");
          }
        }
      }
    };

    checkUserStatus();
  }, [status, session, router, hasCheckedRole]);

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
    if (selectedRole === "organization") {
      if (!formData.organizationName || !formData.industry || !formData.phone || !formData.name) {
        toast.error("Please fill all fields.");
        return;
      }
    } else if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      let res;

      if (selectedRole === "organization") {
        res = await fetch("/api/user/rolepost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            organizationName: formData.organizationName,
            industry: formData.industry,
            phone: formData.phone,
            email: formData.email,
            name: formData.name,
            role: "organization",
          }),
        });
      } else {
        res = await fetch("/api/user/rolepost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: "teacher",
          }),
        });
      }

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Profile created successfully!");
        const redirectPath = selectedRole === "organization" ? "/orgs" : "/teacher";
        router.push(redirectPath);
      } else {
        toast.error(result.message || "Failed to create profile.");
        console.error("API Error:", result);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Join as an Organization or Teacher
        </h2>

        {!isFormVisible ? (
          <div className="space-y-4">
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="role"
                value="organization"
                checked={selectedRole === "organization"}
                onChange={() => setSelectedRole("organization")}
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-700">I'm an organization, providing jobs</span>
            </label>
            <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={selectedRole === "teacher"}
                onChange={() => setSelectedRole("teacher")}
                className="mr-3 text-blue-600"
              />
              <span className="text-gray-700">I'm a teacher, looking for work</span>
            </label>

            <button
              onClick={handleRoleSelection}
              className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
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
            {selectedRole === "organization" ? (
              <>
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                  Organization Information
                </h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                  type="text"
                  placeholder="Organization Name"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                >
                  <option value="">Select Industry</option>
                  <option value="Tech">Tech</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                </select>
                <button
                  onClick={handleFormSubmit}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Continue"}
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an employer account?{" "}
                  <a href="/login" className="underline">
                    Login Here
                  </a>
                </p>
              </>
            ) : (
              <>
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
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
