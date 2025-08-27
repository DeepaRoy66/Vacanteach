"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import {
  Building2,
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  Calendar,
  FileText,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/organization",
      icon: LayoutDashboard,
      items: [
        {
          title: "Organization Dashboard",
          url: "/organization",
        },
      ],
    },
    {
      title: "Manage Jobs",
      url: "#",
      icon: BriefcaseBusiness,
      items: [
        { title: "All Jobs", url: "/organization/Jobpage" },
        { title: "Active Jobs", url: "/organization/Activejob" },
        { title: "Pending Jobs", url: "/organization/Pendingpage" },
        { title: "Denied Jobs", url: "#" },
        { title: "Draft Jobs", url: "#" },
        { title: "Expired Jobs", url: "#" },
      ],
    },
    {
      title: "Candidates",
      url: "#",
      icon: Users,
      items: [
        { title: "All Candidates", url: "#" },
        { title: "Shortlisted", url: "/organization/shortlisted" },
        { title: "Interviewed", url: "#" },
        { title: "Hired", url: "#" },
      ],
    },
    { title: "Analytics", url: "#", icon: BarChart3 },
    { title: "Calendar", url: "#", icon: Calendar },
    { title: "Reports", url: "#", icon: FileText },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Help & Support", url: "#", icon: HelpCircle },
  ],
}

export default function SidebarLayout({ onMobileMenuChange }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeUrl, setActiveUrl] = useState("/dashboard")
  const [openSubmenu, setOpenSubmenu] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    async function fetchOrganization() {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch("/api/user/organizationdata", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
          const data = await response.json()
          if (response.ok) {
            setUser(data.user)
          }
        } catch (err) {
          console.error("Error fetching organization data:", err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchOrganization()
  }, [session, status])

  useEffect(() => {
    if (onMobileMenuChange) {
      onMobileMenuChange(isSidebarOpen)
    }
  }, [isSidebarOpen, onMobileMenuChange])

  const handleNavigation = (url) => {
    router.push(url)
    setActiveUrl(url)
    setIsSidebarOpen(false) // Close sidebar on mobile after navigating
  }

  const isActive = (item) => {
    if (item.url === activeUrl) return true
    if (item.items && item.items.some((subItem) => subItem.url === activeUrl)) {
      if (openSubmenu !== item.title) {
        setOpenSubmenu(item.title)
      }
      return true
    }
    return false
  }

  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  const handleDropdownClick = (e) => {
    e.stopPropagation()
  }

  const NavButton = ({ item, onClick, isActive, isSubItem = false }) => {
    const isSubmenuOpen = openSubmenu === item.title
    const hasSubItems = item.items && item.items.length > 0
    const commonClasses = `flex items-center justify-between p-3 rounded-lg transition-all duration-200 w-full text-left font-medium
      ${isSubItem ? "pl-9 text-sm" : ""}
      ${isActive ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700" : "text-emerald-800 hover:bg-emerald-200/60 hover:text-emerald-900"}
      group`

    return (
      <button className={commonClasses} onClick={onClick}>
        <div className="flex items-center gap-3">
          {item.icon && <item.icon className={`size-4 ${isSubItem ? "hidden" : ""}`} />}
          <span className="transition-all duration-200">{item.title}</span>
        </div>
        {hasSubItems &&
          (isSubmenuOpen ? (
            <ChevronDown className="size-4 transition-transform duration-200" />
          ) : (
            <ChevronRight className="size-4 transition-transform duration-200" />
          ))}
      </button>
    )
  }

  const Submenu = ({ items }) => (
    <div className="ml-6 mt-2 space-y-1 border-l-2 border-emerald-300 pl-4" onClick={handleDropdownClick}>
      {items.map((subItem) => (
        <NavButton
          key={subItem.title}
          item={subItem}
          onClick={() => handleNavigation(subItem.url)}
          isActive={activeUrl === subItem.url}
          isSubItem={true}
        />
      ))}
    </div>
  )

  return (
    <>
      {/* Mobile menu button - Fixed position */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 transform hover:scale-105"
        >
          {isSidebarOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => {
            setIsSidebarOpen(false)
            setOpenSubmenu(null) // Close any open submenus when closing sidebar
          }}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-80 bg-gradient-to-b from-emerald-50 to-green-100 shadow-xl z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 lg:z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 relative">
          <button
            onClick={() => {
              setIsSidebarOpen(false)
              setOpenSubmenu(null)
            }}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="size-5 text-white" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white shadow-lg">
              <Building2 className="size-6" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-bold text-xl">VacanTeach</span>
              <span className="truncate text-sm text-emerald-100">Recruitment Platform</span>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-6"
          onClick={() => setOpenSubmenu(null)} // Close submenus when clicking in main navigation area
        >
          <style>{`
            .overflow-y-auto::-webkit-scrollbar { width: 8px; }
            .overflow-y-auto::-webkit-scrollbar-track { background: #e5e7eb; border-radius: 4px; }
            .overflow-y-auto::-webkit-scrollbar-thumb { background: #a7f3d0; border-radius: 4px; }
            .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
            .overflow-y-auto::-webkit-scrollbar-button { display: none; }
          `}</style>

          <div
            className="lg:hidden bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-200"
            onClick={handleDropdownClick} // Prevent closing when clicking inside user profile area
          >
            {status === "authenticated" && (
              <div className="flex items-center gap-3 mb-4">
                {session.user.image ? (
                  <img
                    src={session.user.image || "/placeholder.svg"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-300"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center text-lg font-bold text-emerald-800">
                    {session.user.email?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-emerald-900 truncate">
                    {user?.organizationName || session.user.email}
                  </p>
                  <p className="text-sm text-emerald-600 truncate">{session.user.email}</p>
                </div>
              </div>
            )}

            <Link
              href="/organization/postjob"
              className="block w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-center font-medium mb-3"
              onClick={() => setIsSidebarOpen(false)}
            >
              PostJob
            </Link>

            {status === "authenticated" && (
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" })
                  setIsSidebarOpen(false)
                }}
                className="flex items-center gap-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            )}
          </div>

          <div className="space-y-4" onClick={handleDropdownClick}>
            <h4 className="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Platform</h4>
            <ul className="space-y-1">
              {data.navMain.map((item) => (
                <li key={item.title}>
                  <NavButton
                    item={item}
                    onClick={(e) => {
                      e.stopPropagation()
                      item.items ? toggleSubmenu(item.title) : handleNavigation(item.url)
                    }}
                    isActive={isActive(item)}
                  />
                  {item.items && openSubmenu === item.title && <Submenu items={item.items} />}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4" onClick={handleDropdownClick}>
            <h4 className="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Account</h4>
            <ul className="space-y-1">
              {data.navSecondary.map((item) => (
                <li key={item.title}>
                  <NavButton
                    item={item}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNavigation(item.url)
                    }}
                    isActive={activeUrl === item.url}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  )
}
