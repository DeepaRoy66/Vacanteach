"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Update condition to include both /organization and /teacher
  const isWelcomePage = pathname === "/organization" || pathname === "/teacher";
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

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center text-white">
        <div className="text-3xl font-extrabold tracking-wide">VacanTeach</div>

        <div className="space-x-6 flex items-center">
          <Link href="/find-work" className="hover:text-yellow-300 transition duration-300">Find Work</Link>
          <Link href="/enterprise" className="hover:text-yellow-300 transition duration-300">Enterprise</Link>

          {isWelcomePage && isAuthenticated ? (
            <div className="relative">
              <button
                onClick={handleToggleDropdown}
                className="flex items-center space-x-3 focus:outline-none hover:opacity-90 transition duration-300"
              >
                {session?.user?.image && (
                  <img
                    src={session?.user?.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                  />
                )}
                <span className="text-lg font-semibold">{session?.user?.name || "User"}</span>
              </button>

              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-3 w-72 bg-white text-gray-800 border border-gray-200 rounded-xl shadow-2xl p-5 z-10 animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    {session.user.image && (
                      <img
                        src={session?.user?.image}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                      />
                    )}
                    <div>
                      <p className="font-bold text-lg">{session?.user?.name}</p>
                      <p className="text-sm text-gray-600">{session.user.email}</p>
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