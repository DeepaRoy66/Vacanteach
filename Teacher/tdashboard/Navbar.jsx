
"use client";

import {
  Bell, Search, ChevronDown, MapPin, BookOpen, TrendingUp, User, Settings, BarChart, LogOut
} from "lucide-react";
import { Button } from "../../app/components/ui/button";
import { Input } from "../../app/components/ui/input";
import { Avatar,AvatarFallback,AvatarImage } from "../../app/components/ui/avatar";
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
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
                  VacanTeach
                </h1>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1 hover:bg-blue-50">
                    <span>Browse Jobs</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md border border-gray-100">
                  {jobCategories.map((category) => (
                    <DropdownMenuItem key={category} className="hover:bg-blue-50 px-4 py-2 cursor-pointer">
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="hover:bg-blue-50">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending Jobs
              </Button>

              <div className="flex items-center space-x-2 bg-white/50 rounded-lg p-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search jobs..."
                    className="pl-10 w-64 border-0 bg-transparent focus:ring-2 focus:ring-green-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Location"
                    className="pl-10 w-40 border-0 bg-transparent focus:ring-2 focus:ring-blue-500"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button className="bg-gradient-to-r from-green-600 to-green-600 hover:from-green-700 hover:to-green-700">
                  Search
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50 rounded-lg p-2">
                  <Avatar className="h-8 w-8 ring-2 ring-blue-200">
                    <AvatarImage src={session?.user?.image || "/placeholder.svg?height=32&width=32"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                      {session?.user?.name?.[0] || "JD"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-medium">{session?.user?.name }</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white shadow-xl rounded-xl border border-gray-100 p-2 mt-2">
                <DropdownMenuLabel className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-blue-200">
                      <AvatarImage src={session?.user?.image || "/placeholder.svg?height=40&width=40"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                        {session?.user?.name?.[0] || "JD"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{session?.user?.name || "John Doe"}</p>
                      <p className="text-sm text-gray-500 truncate">{session?.user?.email || "Not available"}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <div className="py-2">
                  <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                    <User className="h-4 w-4 text-gray-600" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                    <Settings className="h-4 w-4 text-gray-600" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer transition-colors">
                    <BarChart className="h-4 w-4 text-gray-600" />
                    <span>Analytics</span>
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

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
      </div>
    </nav>
  );
}
