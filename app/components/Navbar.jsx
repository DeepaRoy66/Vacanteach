"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isWelcomePage = pathname === "/welcome";
  const isAuthenticated = status === "authenticated";

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">VacanTeach</div>
        <div className="space-x-4 flex items-center">
          <Link href="/find-work">Find Work</Link>
          <Link href="/enterprise">Enterprise</Link>

          {isWelcomePage && isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
                disabled={status === "loading"}
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A4.992 4.992 0 0112 15c2.21 0 4.045 1.436 4.879 3.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{session.user.name || "User"}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-4 z-10">
                  <p className="text-sm">Name: {session.user.name || "N/A"}</p>
                  <p className="text-sm">Phone: {session.user.phone || "N/A"}</p>
                  <p className="text-sm">Email: {session.user.email || "N/A"}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth">Login</Link>
              <Link href="/auth">
                <button className="bg-green-500 text-white px-4 py-2 rounded">
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
