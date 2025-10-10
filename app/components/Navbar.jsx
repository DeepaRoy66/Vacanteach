"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useUserRedirect } from "./useUserRedirect";
import { Briefcase, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useUserRedirect();
  useEffect(() => setIsMounted(true), []);

  const shouldRenderNavbar =
    !pathname.startsWith("/organization") && !pathname.startsWith("/teacher");
  if (!isMounted || !shouldRenderNavbar) return null;

  const isAuthenticated = status === "authenticated";

  const toggleProfile = (e) => {
    e.stopPropagation();
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-green-300 via-green-100 to-green-300 shadow-lg sticky top-0 z-50 w-full animate-pulse-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo */}
       <Link href="/">
  <img
    src="https://i.ibb.co/0pBMhDC6/siksshakrojgar-logo.png" // <-- Your Imgbb direct link here
    alt="SikshakRojgar Logo"
    className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
  />
</Link>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/find-work" className="flex items-center space-x-2 text-green-900 font-medium hover:text-green-700 transition-all duration-300">
            <Home className="w-5 h-5" />
            <span>Find Work</span>
          </Link>
          <Link href="/enterprise" className="flex items-center space-x-2 text-green-900 font-medium hover:text-green-700 transition-all duration-300">
            <Briefcase className="w-5 h-5" />
            <span>Enterprise</span>
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <button onClick={toggleProfile} className="flex items-center space-x-2 focus:outline-none hover:opacity-90 transition-all duration-300">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full object-cover border-2 border-green-500 hover:scale-110 transition-transform duration-300" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center border-2 border-green-500 hover:scale-110 transition-transform duration-300">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <span className="text-sm font-medium text-green-900 hover:text-green-700">{session?.user?.name || "User"}</span>
              </button>
              {isProfileOpen && (
                <div onClick={(e) => e.stopPropagation()} className="absolute right-0 mt-2 w-64 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-xl p-4 z-40 animate-fadeIn">
                  <div className="flex items-center space-x-3 mb-3">
                    {session?.user?.image ? (
                      <img src={session.user.image} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-green-600" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center border-2 border-green-600">
                        {session?.user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-base">{session?.user?.name || "User"}</p>
                      <p className="text-xs text-gray-600">{session?.user?.email || "N/A"}</p>
                    </div>
                  </div>
                  <p className="text-xs mb-2"><strong className="text-green-800">Phone:</strong> {session?.user?.phone || "N/A"}</p>
                  <p className="text-xs mb-3"><strong className="text-green-800">Role:</strong> {session?.user?.role || "N/A"}</p>
                  <button onClick={() => signOut()} className="w-full text-center bg-red-500 text-white py-1.5 rounded-md hover:bg-red-600 transition-all duration-300">Logout</button>
                </div>
              )}
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
          <Link href="/find-work" className="flex flex-col items-center text-green-900 font-medium text-xs hover:text-green-700 transition-all duration-300">
            <Home className="w-6 h-6 mb-1" />
            Find Work
          </Link>
          <Link href="/enterprise" className="flex flex-col items-center text-green-900 font-medium text-xs hover:text-green-700 transition-all duration-300">
            <Briefcase className="w-6 h-6 mb-1" />
            Enterprise
          </Link>
          {isAuthenticated ? (
            <button onClick={toggleProfile} className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center border-2 border-green-500 hover:scale-110 transition-transform duration-300 text-white font-medium">
              {session?.user?.name?.charAt(0) || "U"}
            </button>
          ) : (
            <Link href="/auth">
              <button className="bg-green-500 text-white px-6 py-3 rounded-md text-xs hover:bg-green-600 transition-all duration-300">Sign Up</button>
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-bg {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-pulse-bg { animation: pulse-bg 6s ease-in-out infinite; background-size: 200% 100%; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </nav>
  );
}
