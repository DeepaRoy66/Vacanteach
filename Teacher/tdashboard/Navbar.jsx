"use client";

import { useState, useEffect } from "react";
import { Bell, Search, ChevronDown, MapPin, BookOpen, TrendingUp, User, Settings, BarChart, LogOut } from "lucide-react";
import { Button } from "../../app/components/ui/button";
import { Input } from "../../app/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../app/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "../../app/components/ui/dropdown-menu";

export default function NavBar({
  session,
  jobCategories,
  searchQuery,
  setSearchQuery,
  searchLocation,
  setSearchLocation,
  signOut,
}) {
  const [replies, setReplies] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);

  // Fetch replies whenever session.user.email changes
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchReplies = async () => {
      setIsLoadingReplies(true);
      try {
        const res = await fetch(`/api/applicant/replies?email=${session.user.email}`);
        const data = await res.json();
        setReplies(data.replies || []);
      } catch (err) {
        console.error("Failed to fetch replies:", err);
      } finally {
        setIsLoadingReplies(false);
      }
    };

    fetchReplies();
  }, [session?.user?.email]);

  return (
    <nav className="bg-green-600/95 backdrop-blur-md shadow-lg border-b border-green-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">SikshakRojgar</h1>
          </div>

          {/* Search & Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Job category dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 hover:bg-green-700 text-white">
                  <span>Browse Jobs</span>
                  <ChevronDown className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-green-50 shadow-lg rounded-md border border-green-100">
                {jobCategories.map((category) => (
                  <DropdownMenuItem key={category} className="hover:bg-green-100 px-4 py-2 cursor-pointer text-gray-800">
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

          {/* Notifications & User */}
          <div className="flex items-center space-x-4">
            {/* Replies Notification */}
            <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-green-700 text-white"
                >
                  <Bell className="h-5 w-5 text-white" />
                  {replies.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {replies.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto bg-white shadow-lg rounded-lg p-2">
                <DropdownMenuLabel className="font-semibold text-gray-800">Replies</DropdownMenuLabel>
                <div className="divide-y divide-gray-200">
                  {isLoadingReplies ? (
                    <p className="text-gray-500 text-center py-4">Loading...</p>
                  ) : replies.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No new replies</p>
                  ) : (
                    replies.map((reply) => (
                      <DropdownMenuItem key={reply._id} className="flex flex-col p-3 hover:bg-gray-50 rounded-md cursor-default">
                        <p className="text-gray-800">{reply.message}</p>
                        <span className="text-xs text-gray-500 mt-1">
                          {new Date(reply.createdAt).toLocaleString()}
                        </span>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-green-700 rounded-lg p-2 text-white">
                  <Avatar className="h-8 w-8 ring-2 ring-green-300">
                    <AvatarImage src={session?.user?.image || "/placeholder.svg"} />
                    <AvatarFallback>{session?.user?.name?.[0] || "JD"}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-medium">{session?.user?.name}</span>
                  <ChevronDown className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-green-50 shadow-xl rounded-xl border border-green-100 p-2 mt-2">
                <DropdownMenuLabel className="px-4 py-3 border-b border-green-100">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-green-300">
                      <AvatarImage src={session?.user?.image || "/placeholder.svg"} />
                      <AvatarFallback>{session?.user?.name?.[0] || "JD"}</AvatarFallback>
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
      </div>
    </nav>
  );
}
