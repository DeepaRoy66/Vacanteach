'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrganization() {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch('/api/user/organizationdata', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // important to include cookies for authentication
          });
          const data = await response.json();
          if (response.ok) {
            setOrganization(data.organization);
            setError(null);
          } else {
            setError(data.message || 'Failed to fetch organization data');
            setOrganization(null);
          }
        } catch (err) {
          setError('Error fetching organization data');
          setOrganization(null);
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else if (status !== 'loading') {
        // Only set error and loading if status is not loading
        setError('User not authenticated');
        setOrganization(null);
        setLoading(false);
      }
      // If status is loading, do nothing here (wait for next effect)
    }

    fetchOrganization();
  }, [session, status]);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">VacanTeach</div>
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
                {organization?.organizationName || session?.user?.email}
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
              {!organization && (
                <Link href="/create-organization" className="text-blue-600 hover:underline">
                  Create Organization
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
