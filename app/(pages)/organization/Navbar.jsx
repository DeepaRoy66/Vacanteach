"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useParams } from "next/navigation"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef()
  const params = useParams()
  const orgId = params?.id // Use 'id' to match /organization/[id] route

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
                      e.target.src = "/default-profile.png" // Fallback image
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 font-bold">
                    {session?.user?.email?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <span className="text-white font-medium">
                  {session?.user?.email}
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
        <div className="lg:hidden bg-green-600 text-white w-full shadow-md transition-all duration-300 ease-in-out">
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
              <Link href="/auth" className="text-white hover:text-green-200">
                Sign In
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-between w-full focus:outline-none hover:bg-green-700 p-2 rounded-lg transition-colors"
                >
                  <span>{session?.user?.email}</span>
                  <span className="text-xl">{dropdownOpen ? "▲" : "▼"}</span>
                </button>
                {dropdownOpen && (
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