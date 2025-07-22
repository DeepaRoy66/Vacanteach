
'use client'; // Required for client-side hooks in App Router

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isWelcomePage = pathname === '/welcome';

  // Fetch user details when on /welcome page
  useEffect(() => {
    if (isWelcomePage) {
      const fetchUserDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/user/details', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            if (response.status === 401) throw new Error('Unauthorized');
            if (response.status === 404) throw new Error('User not found');
            throw new Error('Failed to fetch user details');
          }

          const data = await response.json();
          setUserData(data);
        } catch (err) {
          setError(err.message);
          // Fallback data in case of error
          setUserData({
            name: 'Guest User',
            phone: 'N/A',
            email: 'N/A',
          });
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [isWelcomePage]);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">VacanTeach</div>
        <div className="space-x-4 flex items-center">
          <Link href="/find-work">Find Work</Link>
          <Link href="/enterprise">Enterprise</Link>
          {isWelcomePage ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
                disabled={loading}
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A4.992 4.992 0 0112 15c2.21 0 4.045 1.436 4.879 3.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{loading ? 'Loading...' : userData?.name || 'User'}</span>
              </button>
              {isProfileOpen && !loading && !error && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-4 z-10">
                  <p className="text-sm">Name: {userData?.name || 'N/A'}</p>
                  <p className="text-sm">Phone: {userData?.phone || 'N/A'}</p>
                  <p className="text-sm">Email: {userData?.email || 'N/A'}</p>
                </div>
              )}
              {error && isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-4 z-10">
                  <p className="text-sm text-red-500">Error: {error}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth">Login</Link>
              <button className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
