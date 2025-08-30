"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState, useRef } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef()
  const mobileDropdownRef = useRef()

  // Fetch organization data
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
        }
      }
    }
    fetchOrganization()
  }, [session, status])

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Only use orgId if fetched
  const orgId = user?._id

  return (
    <nav className="sticky top-0 bg-green-600 z-50">
      <div className="container mx-auto px-4 lg:px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-xl">
          SikshakRojgar
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-4">
          {orgId && (
            <Link
              href={`/organization/${orgId}/postjob`}
              className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 hover:text-green-700 font-medium transition-colors"
            >
              PostJob
            </Link>
          )}

          {status === "loading" ? (
            <span className="text-white">Loading...</span>
          ) : status === "unauthenticated" ? (
            <span className="text-red-200">Not signed in</span>
          ) : error ? (
            <span className="text-red-200">{error}</span>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:bg-green-700 p-2 rounded-lg transition-colors"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image || "/placeholder.svg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 font-bold">
                    {session.user.email?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <span className="text-white font-medium">
                  {user?.organizationName || session.user.email}
                </span>
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

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 rounded-md focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-green-600 text-white w-full shadow-md">
          <div className="flex flex-col px-4 py-3 space-y-2">
            {orgId && (
              <Link
                href={`/organization/${orgId}/postjob`}
                className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 hover:text-green-700 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                PostJob
              </Link>
            )}

            {status === "loading" ? (
              <span>Loading...</span>
            ) : status === "unauthenticated" ? (
              <span>Not signed in</span>
            ) : error ? (
              <span>{error}</span>
            ) : (
              <div className="relative" ref={mobileDropdownRef}>
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="flex items-center justify-between w-full focus:outline-none hover:bg-green-700 p-2 rounded-lg transition-colors"
                >
                  <span>{user?.organizationName || session.user.email}</span>
                  <span className="text-xl">{mobileDropdownOpen ? "▲" : "▼"}</span>
                </button>
                {mobileDropdownOpen && (
                  <div className="flex flex-col mt-1 bg-white text-green-600 rounded-md overflow-hidden">
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" })
                        setMobileMenuOpen(false)
                      }}
                      className="px-4 py-2 text-left text-red-500 hover:bg-green-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
