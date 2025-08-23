// components/Navbar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useUserRedirect } from "./useUserRedirect";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useUserRedirect(); // Keep this to handle redirects

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log("Navbar: Current pathname:", pathname);
    console.log("Navbar: Session status:", status, "Session data:", {
      role: session?.user?.role,
      profileCompleted: session?.user?.profileCompleted,
      email: session?.user?.email,
    });
  }, [pathname, status, session]);

  useEffect(() => {
    const handleClickOutside = () => setIsProfileOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Hide navbar on all /organization routes
  const shouldRenderNavbar = !pathname.startsWith("/organization");

  if (!isMounted || !shouldRenderNavbar) return null;

  const handleToggleDropdown = (e) => {
    e.stopPropagation();
    setIsProfileOpen((prev) => !prev);
  };

  if (status === "loading") {
    return (
      <nav className="bg-gradient-to-r from-green-300 via-green-100 to-green-300 shadow-lg py-3 sticky top-0 z-30 animate-pulse-bg">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-semibold text-green-800 tracking-tight">VacanTeach</div>
          <div className="space-x-4 flex items-center">
            <span className="text-green-900 text-sm font-medium">Loading...</span>
          </div>
        </div>
      </nav>
    );
  }

  const isAuthenticated = status === "authenticated";

  return (
    <nav className="bg-gradient-to-r from-green-300 via-green-100 to-green-300 shadow-lg py-3 sticky top-0 z-30 w-full animate-pulse-bg">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-xl font-semibold text-green-800 tracking-tight hover:scale-105 transition-transform duration-300">
          VacanTeach
        </div>
        <div className="space-x-6 flex items-center">
          <Link
            href="/find-work"
            className="text-green-900 font-medium text-sm hover:text-green-700 hover:scale-105 transition-all duration-300"
          >
            Find Work
          </Link>
          <Link
            href="/enterprise"
            className="text-green-900 font-medium text-sm hover:text-green-700 hover:scale-105 transition-all duration-300"
          >
            Enterprise
          </Link>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={handleToggleDropdown}
                className="flex items-center space-x-2 focus:outline-none hover:opacity-90 transition-all duration-300"
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-green-500 hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center border-2 border-green-500 hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-medium text-sm">
                      {session?.user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                <span className="text-sm font-medium text-green-900 hover:text-green-700">
                  {session?.user?.name || "User"}
                </span>
              </button>
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-xl p-4 z-40 animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-green-600"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center border-2 border-green-600">
                        <span className="text-white font-medium text-sm">
                          {session?.user?.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-base">{session?.user?.name || "User"}</p>
                      <p className="text-xs text-gray-600">{session?.user?.email || "N/A"}</p>
                    </div>
                  </div>
                  <p className="text-xs mb-2">
                    <strong className="text-green-800">Phone:</strong> {session?.user?.phone || "N/A"}
                  </p>
                  <p className="text-xs mb-3">
                    <strong className="text-green-800">Role:</strong> {session?.user?.role || "N/A"}
                  </p>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-center bg-red-500 text-white py-1.5 rounded-md hover:bg-red-600 transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth">
              <button className="bg-green-500 text-white font-medium text-sm px-6 py-1.5 rounded-md shadow-md hover:bg-green-600 hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse-bg {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-pulse-bg {
          animation: pulse-bg 6s ease-in-out infinite;
          background-size: 200% 100%;
        }
      `}</style>
    </nav>
  );
}
