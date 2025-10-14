"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserRedirect } from "./useUserRedirect";
import { Users, Mail, Home as HomeIcon } from "lucide-react"; // Added Home icon

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useUserRedirect();
  useEffect(() => setIsMounted(true), []);

  // Hide Navbar for /organization and /teacher
  const shouldRenderNavbar =
    !pathname.startsWith("/organization") && !pathname.startsWith("/teacher");
  if (!isMounted || !shouldRenderNavbar) return null;

  const isAuthenticated = status === "authenticated";

  return (
    <nav className="bg-gradient-to-r from-green-300 via-green-100 to-green-300 shadow-lg sticky top-0 z-50 w-full animate-pulse-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo */}
        <Link href="/">
          <img
            src="https://i.ibb.co/0pBMhDC6/siksshakrojgar-logo.png"
            alt="SikshakRojgar Logo"
            className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center space-x-2 text-green-900 font-medium hover:text-green-700 transition-all duration-300"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Home</span>
          </Link>
         
          <Link
            href="/Contactus"
            className="flex items-center space-x-2 text-green-900 font-medium hover:text-green-700 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            <span>Contact Us</span>
          </Link>

          {/* User Section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-green-500"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center border-2 border-green-500">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
              )}
              <span className="text-sm font-medium text-green-900">
                {session?.user?.name || "User"}
              </span>
            </div>
          ) : (
            <Link href="/auth">
              <button className="bg-green-500 text-white font-medium text-sm px-6 py-1.5 rounded-md shadow-md hover:bg-green-600 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">
                Sign Up
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden space-x-6">
          <Link
            href="/"
            className="flex flex-col items-center text-green-900 font-medium text-xs hover:text-green-700 transition-all duration-300"
          >
            <HomeIcon className="w-6 h-6 mb-1" />
            Home
          </Link>
         
          <Link
            href="/contact-us"
            className="flex flex-col items-center text-green-900 font-medium text-xs hover:text-green-700 transition-all duration-300"
          >
            <Mail className="w-6 h-6 mb-1" />
            Contact Us
          </Link>
          {isAuthenticated ? (
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center border-2 border-green-500 text-white font-medium">
              {session?.user?.name?.charAt(0) || "U"}
            </div>
          ) : (
            <Link href="/auth">
              <button className="bg-green-500 text-white px-6 py-3 rounded-md text-xs hover:bg-green-600 transition-all duration-300">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-bg {
          0%,
          100% {
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
