// app/(pages)/select-role/page.js
"use client";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
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
    organizationName: "",
    industry: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function checkProfile() {
      if (status !== "authenticated" || !session?.user?.email) {
        console.log("SelectRole: Not authenticated or no email");
        return;
      }

      console.log("SelectRole: Session data", {
        role: session.user.role,
        profileCompleted: session.user.profileCompleted,
      });

      // Set form data from session
      setFormData((prev) => ({
        ...prev,
        email: session.user.email,
        name: session.user.name || "",
      }));

      // Trust session data if available
      if (session.user.role && session.user.profileCompleted && session.user.role !== "user") {
        const redirectPath = session.user.role === "organization" ? "/organization" : "/teacher";
        console.log("SelectRole: Redirecting to", redirectPath);
        router.push(redirectPath);
        return;
      }

      // Fallback to API check
      try {
        const res = await fetch("/api/user/check-role");
        if (!res.ok) {
          console.error("SelectRole: API error", { status: res.status, text: await res.text() });
          toast.error("Error checking profile. Please try again.");
          return;
        }
        const { role, profileCompleted } = await res.json();
        console.log("SelectRole: API response", { role, profileCompleted });
        if (role && profileCompleted && role !== "user") {
          const redirectPath = role === "organization" ? "/organization" : "/teacher";
          console.log("SelectRole: Redirecting to", redirectPath);
          router.push(redirectPath);
        }
      } catch (error) {
        console.error("SelectRole: Error checking role", error);
        toast.error("Error checking profile. Please try again.");
      }
    }
    checkProfile();
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading session...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    console.log("SelectRole: Redirecting to /auth");
    router.push("/auth");
    return <div>Redirecting to login...</div>;
  }

  const handleRoleSelection = () => {
    if (!selectedRole) {
      toast.error("Please select a role.");
      return;
    }
    console.log("SelectRole: Role selected", selectedRole);
    setIsFormVisible(true);
  };

  const handleFormSubmit = async () => {
    if (!selectedRole) {
      toast.error("Please select a role.");
      return;
    }
    if (selectedRole === "organization") {
      if (
        !formData.organizationName ||
        !formData.industry ||
        !formData.phone ||
        !formData.name
      ) {
        toast.error(
          "Please fill all fields: Full Name, Organization Name, Phone Number, Industry."
        );
        return;
      }
      if (!/^\d{10}$/.test(formData.phone)) {
        toast.error("Phone number must be exactly 10 digits.");
        return;
      }
    } else {
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error("Please fill all fields: Full Name, Email, Phone Number.");
        return;
      }
      if (!/^\d{10}$/.test(formData.phone)) {
        toast.error("Phone number must be exactly 10 digits.");
        return;
      }
      if (formData.email !== session.user.email) {
        toast.error("Email cannot be changed.");
        return;
      }
    }
    setIsSubmitting(true);
    try {
      console.log("SelectRole: Submitting form", formData);
      const res = await fetch("/api/user/rolepost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: selectedRole,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organizationName: selectedRole === "organization" ? formData.organizationName : undefined,
          industry: selectedRole === "organization" ? formData.industry : undefined,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "Profile created successfully!");
        await getSession();
        const redirectPath = selectedRole === "organization" ? "/organization" : "/teacher";
        console.log("SelectRole: Redirecting to", redirectPath);
        router.push(redirectPath);
      } else {
        toast.error(result.message || "Failed to create profile.");
        console.error("SelectRole: API Error:", result);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
      console.error("SelectRole: Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const industries = ["Tech", "Healthcare", "Education", "Finance", "Retail"];

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
              Already have an account? <a href="/login" className="underline">Log In</a>
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
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                <button
                  onClick={handleFormSubmit}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Continue"}
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                  Want to change your role?{" "}
                  <span onClick={() => setIsFormVisible(false)} className="underline cursor-pointer">
                    Go back
                  </span>
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
                  <span onClick={() => setIsFormVisible(false)} className="underline cursor-pointer">
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