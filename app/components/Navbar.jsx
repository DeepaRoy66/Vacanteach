
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  
  useEffect(() => {
    console.log("Current pathname:", pathname);
    console.log("Session status:", status, "Session data:", session);
  }, [pathname, status, session]);

  // Include /organization/post-job in isWelcomePage for profile dropdown
  const isWelcomePage = pathname === "/organization" || pathname === "/teacher" || pathname === "/organization/post-job";
  // Include /organization/post-job in organization-related pages for "Post Job" link
  const isOrganizationPage = pathname === "/organization" || pathname === "/organization/post-job";
  // Wait for session to be fully loaded before determining authentication
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const handleClickOutside = () => setIsProfileOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setIsProfileOpen((prev) => !prev);
  };

  // Avoid rendering the link until session status is resolved
  if (status === "loading") {
    return (
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center text-white">
          <div className="text-3xl font-extrabold tracking-wide">VacanTeach</div>
          <div className="space-x-6 flex items-center">
            <span className="text-white">Loading...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center text-white">
        <div className="text-3xl font-extrabold tracking-wide">VacanTeach</div>

        <div className="space-x-6 flex items-center">
          <Link
            href={isAuthenticated && isOrganizationPage ? "/organization/post-job" : "/find-work"}
            className="hover:text-yellow-300 transition duration-300"
            onClick={() => console.log("Navigating to:", isAuthenticated && isOrganizationPage ? "/organization/post-job" : "/find-work")}
          >
            {isAuthenticated && isOrganizationPage ? "Post Job" : "Find Work"}
          </Link>
          <Link href="/enterprise" className="hover:text-yellow-300 transition duration-300">Enterprise</Link>

          {isWelcomePage && isAuthenticated ? (
            <div className="relative">
              <button
                onClick={handleToggleDropdown}
                className="flex items-center space-x-3 focus:outline-none hover:opacity-90 transition duration-300"
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                    onError={(e) => {
                      console.log("Profile image error, using fallback");
                      e.target.src = "/default-profile.png";
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center border-2 border-yellow-400">
                    <span className="text-white font-semibold">
                      {session?.user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                <span className="text-lg font-semibold">{session?.user?.name || "User"}</span>
              </button>

              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-3 w-72 bg-white text-gray-800 border border-gray-200 rounded-xl shadow-2xl p-5 z-10 animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                        onError={(e) => {
                          console.log("Dropdown image error, using fallback");
                          e.target.src = "/default-profile.png";
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center border-2 border-indigo-500">
                        <span className="text-white font-semibold">
                          {session?.user?.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-lg">{session?.user?.name || "User"}</p>
                      <p className="text-sm text-gray-600">{session?.user?.email || "N/A"}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-2">
                    <strong className="text-indigo-700">Phone:</strong> {session?.user?.phone || "N/A"}
                  </p>
                  <p className="text-sm mb-4">
                    <strong className="text-indigo-700">Role:</strong> {session?.user?.role || "N/A"}
                  </p>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth" className="hover:text-yellow-300 transition duration-300">Login</Link>
              <Link href="/auth">
                <button className="bg-yellow-400 text-indigo-900 px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition duration-300">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
