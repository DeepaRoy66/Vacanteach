"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../../components/ui/sidebar";
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
} from "lucide-react";

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
};

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (item) => {
    if (item.url && item.url !== "#") {
      router.push(item.url);
    }
  };

  const isActive = (item) => {
    if (item.url === pathname) return true;
    if (item.items?.some((sub) => sub.url === pathname)) return true;
    return false;
  };

  return (
    <Sidebar
      variant="inset"
      className="w-72 h-[calc(100vh-4rem)] fixed top-16 left-0 bg-gradient-to-b from-emerald-50 to-green-100 shadow-xl z-10 border-r border-emerald-200"
    >
      {/* Header */}
      <SidebarHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-lg mx-2 mt-2 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-emerald-700/20 text-white">
              <a href="/organization">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white shadow-lg">
                  <Building2 className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-lg">VacanTeach</span>
                  <span className="truncate text-xs text-emerald-100">
                    Recruitment Platform
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent
        className="overflow-y-auto px-2"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#a7f3d0 #e5e7eb" }}
      >
        {/* Scrollbar Styles */}
        <style>
          {`
            .overflow-y-auto::-webkit-scrollbar {
              width: 8px;
            }
            .overflow-y-auto::-webkit-scrollbar-track {
              background: #e5e7eb;
              border-radius: 4px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb {
              background: #a7f3d0;
              border-radius: 4px;
            }
            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
              background: #6ee7b7;
            }
            .overflow-y-auto::-webkit-scrollbar-button {
              display: none;
            }
          `}
        </style>

        {/* Main Navigation */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-emerald-700 font-semibold text-xs uppercase tracking-wider mb-2">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive(item)}
                    className={`rounded-lg transition-all duration-200 ${
                      isActive(item)
                        ? "bg-emerald-600 text-white shadow-md hover:bg-emerald-700"
                        : "text-emerald-800 hover:bg-emerald-200/60 hover:text-emerald-900"
                    }`}
                    onClick={() => handleNavigation(item)}
                  >
                    <item.icon className="size-4" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>

                  {/* Sub Items */}
                  {item.items?.length ? (
                    <SidebarMenu className="ml-6 mt-2 space-y-1 border-l-2 border-emerald-300 pl-4">
                      {item.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            size="sm"
                            className={`text-emerald-700 hover:bg-emerald-200/60 hover:text-emerald-900 rounded-md transition-colors duration-150 ${
                              pathname === subItem.url ? "bg-emerald-600 text-white" : ""
                            }`}
                            onClick={() => handleNavigation(subItem)}
                          >
                            <span className="text-sm">{subItem.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup className="mt-8">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size="sm"
                    className="text-emerald-700 hover:bg-emerald-200/60 hover:text-emerald-900 rounded-lg transition-all duration-200"
                    onClick={() => handleNavigation(item)}
                  >
                    <item.icon className="size-4" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-emerald-700/20 text-white">
              <a href="/organization"></a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
