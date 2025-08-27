"use client";

import {
  Bell, Search, ChevronDown, MapPin, BookOpen, TrendingUp, User, Settings, BarChart, LogOut
} from "lucide-react";
import { Button } from "../../app/components/ui/button";
import { Input } from "../../app/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../app/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuLabel
} from "../../app/components/ui/dropdown-menu";

export default function NavBar({
  session,
  jobCategories,
  searchQuery,
  setSearchQuery,
  searchLocation,
  setSearchLocation,
  signOut
}) {
  return (
    <nav className="bg-green-600/95 backdrop-blur-md shadow-lg border-b border-green-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">
                  VacanTeach
                </h1>
              </div>
            </div>
          </div>

          {/* Search & Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Browse Jobs */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 hover:bg-green-700 text-white">
                  <span>Browse Jobs</span>
                  <ChevronDown className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-green-50 shadow-lg rounded-md border border-green-100">
                {jobCategories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    className="hover:bg-green-100 px-4 py-2 cursor-pointer text-gray-800"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Trending Jobs */}
            <Button variant="ghost" className="hover:bg-green-700 text-white flex items-center space-x-1">
              <TrendingUp className="h-4 w-4 text-white mr-1" />
              <span>Trending Jobs</span>
            </Button>

            {/* Search Inputs */}
            <div className="flex items-center space-x-2 bg-white-500/20 rounded-lg p-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-10 w-64 border-0 bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-white-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Location"
                  className="pl-10 w-40 border-0 bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-green-300"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <Button className="bg-green-800 hover:bg-green-900 text-white px-4">
                Search
              </Button>
            </div>
          </div>

          {/* User & Notifications */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-green-700 text-white">
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-green-700 rounded-lg p-2 text-white">
                  <Avatar className="h-8 w-8 ring-2 ring-green-300">
                    <AvatarImage src={session?.user?.image || "/placeholder.svg?height=32&width=32"} />
                    <AvatarFallback className="bg-green-700 text-white">
                      {session?.user?.name?.[0] || "JD"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-medium">{session?.user?.name}</span>
                  <ChevronDown className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-green-50 shadow-xl rounded-xl border border-green-100 p-2 mt-2">
                <DropdownMenuLabel className="px-4 py-3 border-b border-green-100">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-green-300">
                      <AvatarImage src={session?.user?.image || "/placeholder.svg?height=40&width=40"} />
                      <AvatarFallback className="bg-green-700 text-white">
                        {session?.user?.name?.[0] || "JD"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{session?.user?.name || "John Doe"}</p>
                      <p className="text-sm text-gray-600 truncate">{session?.user?.email || "Not available"}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <div className="py-2">
                  <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-green-100 rounded-lg cursor-pointer transition-colors text-gray-800">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-green-100 rounded-lg cursor-pointer transition-colors text-gray-800">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-green-100 rounded-lg cursor-pointer transition-colors text-gray-800">
                    <BarChart className="h-4 w-4" />
                    <span>Analytics</span>
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="h-px bg-green-200 my-1" />

                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                    onClick={() => signOut({ callbackUrl: "/auth" })}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search/Menu */}
        <div className="md:hidden mt-2 flex flex-col space-y-2">
          <div className="flex items-center space-x-2 bg-green-500/20 rounded-lg p-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              <Input
                type="text"
                placeholder="Search jobs..."
                className="pl-10 w-full border-0 bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-green-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
              <Input
                type="text"
                placeholder="Location"
                className="pl-10 w-full border-0 bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-green-300"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <Button className="bg-green-800 hover:bg-green-900 text-white px-4">
              Search
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
