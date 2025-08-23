'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState, useRef } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  // Close dropdown if clicked outside
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
    <nav className="sticky top-0 bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://i.ibb.co/tcwbH6R/vacanteach-logo.png"
            alt="VacanTeach Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl font-bold text-green-800">VacanTeach</span>
        </div>

        {/* Right: PostJob + Profile */}
        <div className="flex items-center space-x-4">
          <Link
            href="/organization/postjob"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            PostJob
          </Link>

          {status === 'loading' || loading ? (
            <span>Loading session...</span>
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
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg py-2 z-50">
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
      </div>
    </nav>
  );
}
