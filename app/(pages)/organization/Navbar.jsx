'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch('/api/user/organizationdata', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data.user); // keep same structure as ITMStaff code
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
      } else if (status !== 'loading') {
        setError('User not authenticated');
        setUser(null);
        setLoading(false);
      }
    }

    fetchUser();
  }, [session, status]);

  return (
    <nav className=" sticky top-0 bg-white shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Logo + Brand */}
        <div className="flex items-center space-x-2">
          <img
            src="https://i.ibb.co/tcwbH6R/vacanteach-logo.png" // <-- replace with your VacanTeach logo
            alt="VacanTeach Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-2xl font-bold text-green-800">VacanTeach</span>
        </div>

        {/* Right side: PostJob + User Info */}
        <div className="flex items-center space-x-4">
          <Link
            href="/organization/postjob"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            PostJob
          </Link>

          {status === 'loading' || loading ? (
            <span>Loading session...</span>
          ) : error ? (
            <span className="text-red-500">{error}</span>
          ) : !session ? (
            <span className="text-red-500">Not signed in</span>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">
                {user?.organizationName || session?.user?.email || 'No organization'}
              </span>
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
