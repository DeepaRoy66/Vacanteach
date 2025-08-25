'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    async function fetchOrganization() {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch('/api/user/organizationdata', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data.user);
            setError(null);
          } else {
            setError(data.message || 'Failed to fetch organization data');
            setUser(null);
          }
        } catch (err) {
          setError('Error fetching organization data');
          setUser(null);
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchOrganization();
  }, [session, status]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://i.ibb.co/tcwbH6R/vacanteach-logo.png"
            alt="VacanTeach Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold text-green-800">VacanTeach</span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/organization/postjob"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            PostJob
          </Link>

          {status === 'loading' || loading ? (
            <span>Loading...</span>
          ) : status === 'unauthenticated' ? (
            <span className="text-red-500">Not signed in</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {session.user.email?.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
                <span className="text-gray-700">{user?.organizationName || session?.user?.email}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none">
            {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col space-y-4 px-4 py-4">
            {/* Profile Section */}
            {status === 'authenticated' && (
              <div className="flex flex-col items-center space-y-2 bg-gray-50 p-4 rounded-md">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                    {session.user.email?.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
                <span className="font-medium text-gray-800">{user?.organizationName || session.user.email}</span>
              </div>
            )}

            {/* PostJob Button */}
            <Link
              href="/organization/postjob"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-center"
            >
              PostJob
            </Link>

            {/* Sign Out Button */}
            {status === 'authenticated' && (
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
