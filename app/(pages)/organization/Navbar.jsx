"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState, useRef } from "react"

export default function Navbar({ onMobileMenuToggle, isMobileMenuOpen }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    async function fetchOrganization() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch("/api/user/organizationdata", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
          const data = await response.json()
          if (response.ok) {
            setUser(data.user)
            setError(null)
          } else {
            setError(data.message || "Failed to fetch organization data")
            setUser(null)
          }
        } catch (err) {
          setError("Error fetching organization data")
          setUser(null)
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchOrganization()
  }, [session, status])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 bg-green-600 z-40 lg:z-10">
      <div className="container mx-auto px-4 lg:px-6 py-2 flex items-center justify-center lg:justify-between">
        <div
          className={`flex items-center space-x-2 transition-opacity duration-300 ${isMobileMenuOpen ? "lg:flex opacity-0 lg:opacity-100" : "flex opacity-100"}`}
        >
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="/organization/postjob"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors font-medium"
          >
            PostJob
          </Link>

          {status === "loading" || loading ? (
            <span className="text-gray-600">Loading...</span>
          ) : status === "unauthenticated" ? (
            <span className="text-red-500">Not signed in</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image || "/placeholder.svg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {session.user.email?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <span className="text-gray-700 font-medium">{user?.organizationName || session?.user?.email}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className={`lg:hidden absolute right-4 flex items-center transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          {status === "authenticated" && (
            <div className="flex items-center">
              {session.user.image ? (
                <img
                  src={session.user.image || "/placeholder.svg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                  {session.user.email?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
