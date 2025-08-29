"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    const hideInPaths = ["/auth","/organization", "/organization/postjob", "/organization/Jobpage"];
    if (hideInPaths.some((p) => path.includes(p))) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [path]);

  if (!show) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3>For Clients</h3>
          <ul>
            <li>Find Talent</li>
            <li>Project Catalog</li>
            <li>Why SikshakRojgar</li>
            <li>Enterprise</li>
          </ul>
        </div>
        <div>
          <h3>For Talent</h3>
          <ul>
            <li>Find Freelance Jobs</li>
            <li>Why SikshakRojgar</li>
            <li>Careers with SikshakRojgar</li>
          </ul>
        </div>
        <div>
          <h3>Resources</h3>
          <ul>
            <li>Help & Support</li>
            <li>SikshakRojgar Reviews</li>
            <li>Affiliate Program</li>
            <li>Free Business Tools</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-400">
        © 2025 SikshakRojgar. Terms of Service | Privacy Policy | CA Notice of Collection | Cookie Settings | Accessibility
      </div>
    </footer>
  );
}