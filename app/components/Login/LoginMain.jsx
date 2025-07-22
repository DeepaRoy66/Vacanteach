"use client";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function LoginMain() {
  const { status, data: session } = useSession();
  const router = useRouter();

  // Function to handle login
  function login(provider) {
    if (provider === "google") {
      signIn("google", { callbackUrl: "/select-role" });
    } else {
      toast.error("This login feature is not available yet. Please try again later.");
    }
  }

  // Check user status and redirect if authenticated and profile is complete
  useEffect(() => {
    const checkUserStatus = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch("/api/user/details", {
            method: "GET", // Use GET to check user status
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Ensure session cookie is sent
          });

          const result = await response.json();

          if (response.ok && result.profileCompleted) {
            router.push("/organization");
          } else if (response.ok && !result.profileCompleted) {
            router.push("/select-role");
          } else {
            console.error("Error checking user status:", result.message);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    checkUserStatus();
  }, [status, session, router]);

  // Show loading state or login UI
  if (status === "loading") {
    return null; // or a loading spinner
  }

  // Show login UI if not authenticated
  return (
    <div
      className="flex justify-center items-center p-5"
      style={{
        background: "linear-gradient(145deg, #2e2e2e, #1f1f1f)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Toaster />
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/30 text-white">
        <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
        <p className="text-sm text-center text-gray-100">Login to your account to get started with Vacanteach.</p>
        <div className="my-6 space-y-4">
          <button
            onClick={() => login("google")}
            className="flex items-center justify-center w-full p-4 space-x-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all duration-200 border border-gray-500 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.25 1.53 7.69 2.82l5.66-5.66C33.36 3.16 28.97 1 24 1 14.97 1 7.26 6.75 3.9 14.35l6.63 5.15C12.43 13.16 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.64 24.5c0-1.56-.14-2.7-.42-3.88H24v7.36h12.78c-.26 2.08-1.67 5.23-4.82 7.35l7.4 5.71c4.33-4 6.28-9.84 6.28-16.54z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.5c-.46-1.4-.73-2.9-.73-4.5s.27-3.1.73-4.5l-6.63-5.15C2.78 17.1 1 20.38 1 24s1.78 6.9 4.9 9.65l6.63-5.15z"
              />
              <path
                fill="#34A853"
                d="M24 47c5.97 0 10.97-1.97 14.63-5.36l-7.4-5.71c-2.03 1.37-4.8 2.57-7.23 2.57-6.26 0-11.57-3.66-13.48-8.85l-6.63 5.15C7.26 41.25 14.97 47 24 47z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <p>Login with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginMain;