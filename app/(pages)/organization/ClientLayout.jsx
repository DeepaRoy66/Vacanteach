"use client"

import { useState } from "react"
import { SessionProvider } from "next-auth/react"
import SidebarLayout from "./Sidebar"
import Navbar from "./Navbar"

function LayoutContent({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed on desktop, toggleable on mobile */}
      <SidebarLayout onMobileMenuChange={setIsMobileMenuOpen} />

      {/* Main content area - takes remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar at top */}
        <Navbar isMobileMenuOpen={isMobileMenuOpen} />

        {/* Page content with proper scroll */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 lg:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default function ClientLayout({ children, session }) {
  return (
    <SessionProvider session={session}>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  )
}
