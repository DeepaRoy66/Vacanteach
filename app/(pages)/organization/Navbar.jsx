"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef()
  const params = useParams()
  const orgId = params?.id // matches /organization/[id] route

  // Debug orgId
  useEffect(() => {
    console.log("Navbar params:", params, "orgId:", orgId)
  }, [params, orgId])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="sticky top-0 bg-green-600 z-50 shadow-md">
      <div className="container mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-xl">
          VacanTeach
        </Link>

        {/* Desktop & Mobile menu */}
        <div className="flex items-center space-x-4">
          {orgId && (
            <Link
              href={`/organization/${orgId}/postjob`}
              className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-100 hover:text-green-700 font-medium transition-colors"
            >
              Post Job
            </Link>
          )}

          {/* Session / Profile */}
          {status === "loading" ? (
            <span className="text-white">Loading...</span>
          ) : status === "unauthenticated" ? (
            <Link href="/auth" className="text-white hover:text-green-200">
              Sign In
            </Link>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:bg-green-700 p-2 rounded-lg transition-colors"
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    onError={(e) => {
                      e.target.src = "/default-profile.png"
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 font-bold">
                    {session?.user?.email?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-sm text-gray-800">
                    {session.user.email}
                  </div>
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
      </div>
    </nav>
  )
}
