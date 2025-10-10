"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { usePathname, useParams } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
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
  ChevronDown,
} from "lucide-react"

export default function SidebarLayout({ onMobileMenuChange }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeUrl, setActiveUrl] = useState("")
  const [openDropdown, setOpenDropdown] = useState(null)

  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const { data: session, status } = useSession()

  const orgId = params?.id

  useEffect(() => {
    setActiveUrl(pathname)
  }, [pathname])

  useEffect(() => {
    if (onMobileMenuChange) onMobileMenuChange(isSidebarOpen)
  }, [isSidebarOpen, onMobileMenuChange])

  const handleNavigation = (url, closeDropdown = false) => {
    if (!orgId) return
    let finalUrl = url
    if (url.startsWith("/organization") && !url.includes(orgId)) {
      finalUrl = url.replace("/organization", `/organization/${orgId}`)
    }
    router.push(finalUrl)
    setActiveUrl(finalUrl)
    setIsSidebarOpen(false)
    if (closeDropdown) setOpenDropdown(null)
  }

  const toggleDropdown = (title) => {
    setOpenDropdown(openDropdown === title ? null : title)
  }

  const isActive = (item) => {
    const expectedPath =
      orgId && item.url.startsWith("/organization") && !item.url.includes(orgId)
        ? item.url.replace("/organization", `/organization/${orgId}`)
        : item.url

    if (expectedPath === activeUrl) return true
    if (
      item.items &&
      item.items.some((subItem) => {
        const subExpectedPath =
          orgId && subItem.url.startsWith("/organization") && !subItem.url.includes(orgId)
            ? subItem.url.replace("/organization", `/organization/${orgId}`)
            : subItem.url
        return subExpectedPath === activeUrl
      })
    )
      return true
    return false
  }

  const data = {
    navMain: [
      { title: "Dashboard", url: "/organization", icon: LayoutDashboard },
      {
        title: "Manage Jobs",
        url: "#",
        icon: BriefcaseBusiness,
        items: [
          { title: "All Jobs", url: "/organization/Jobpage" },
          { title: "Active Jobs", url: "/organization/Activejob" },
          { title: "Pending Jobs", url: "/organization/Pendingpage" },
        ],
      },
      {
        title: "Applicants",
        url: "#",
        icon: Users,
        items: [
          { title: "All Applicants", url: "/organization/Applicants" },
          { title: "Shortlisted", url: "#" },
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

  const NavButton = ({ item, onClick, isActive, isSubItem = false, hasDropdown = false }) => {
    const commonClasses = `flex items-center justify-between p-3 rounded-lg w-full text-left font-medium transition-colors duration-200
      ${isSubItem ? "pl-9 text-sm" : ""}
      ${isActive ? "bg-emerald-100 text-emerald-900" : "text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900"}`
    return (
      <button className={commonClasses} onClick={onClick}>
        <div className="flex items-center">
          {item.icon && !isSubItem && <item.icon className="size-4 mr-3" />}
          <span>{item.title}</span>
        </div>
        {hasDropdown && (
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${openDropdown === item.title ? "rotate-180" : ""}`}
          />
        )}
      </button>
    )
  }

  const Submenu = ({ items, parentTitle }) => (
    <div className={`ml-6 mt-1 space-y-1 ${openDropdown === parentTitle ? "block" : "hidden"}`}>
      {items.map((subItem) => {
        const subExpectedPath =
          orgId && subItem.url.startsWith("/organization") && !subItem.url.includes(orgId)
            ? subItem.url.replace("/organization", `/organization/${orgId}`)
            : subItem.url

        return (
          <NavButton
            key={subItem.title}
            item={subItem}
            onClick={() => handleNavigation(subItem.url)}
            isActive={activeUrl === subExpectedPath}
            isSubItem={true}
          />
        )
      })}
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full text-emerald-600 bg-white shadow-md hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
        >
          {isSidebarOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-70 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 lg:z-10 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-3 relative">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white transition-colors"
          >
            <X className="size-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white ">
              <Building2 className="size-6" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-bold text-xl">SikshakRojgar</span>
              <span className="truncate text-sm text-emerald-100">Recruitment Platform</span>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto max-h-screen p-6 space-y-6">
          <style>{`
            .overflow-y-auto::-webkit-scrollbar { width: 8px; }
            .overflow-y-auto::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
            .overflow-y-auto::-webkit-scrollbar-thumb { background: #a7f3d0; border-radius: 4px; }
            .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
            .overflow-y-auto::-webkit-scrollbar-button { display: none; }
          `}</style>

          {/* 🔥 Removed the entire mobile profile + logout section */}

          {/* Main navigation */}
          <div className="space-y-4">
            <h4 className="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Platform</h4>
            <ul className="space-y-1">
              {data.navMain.map((item) => (
                <li key={item.title}>
                  {item.items ? (
                    <>
                      <NavButton
                        item={item}
                        onClick={() => toggleDropdown(item.title)}
                        isActive={isActive(item)}
                        hasDropdown={true}
                      />
                      <Submenu items={item.items} parentTitle={item.title} />
                    </>
                  ) : (
                    <NavButton item={item} onClick={() => handleNavigation(item.url, true)} isActive={isActive(item)} />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary navigation */}
          <div className="space-y-4">
            <h4 className="text-emerald-700 font-semibold text-xs uppercase tracking-wider">Account</h4>
            <ul className="space-y-1">
              {data.navSecondary.map((item) => (
                <li key={item.title}>
                  <NavButton
                    item={item}
                    onClick={() => handleNavigation(item.url, true)}
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
