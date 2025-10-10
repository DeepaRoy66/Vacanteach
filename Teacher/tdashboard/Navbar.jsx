"use client";
import { useState, useEffect } from "react";
import { Bell, Search, ChevronDown, MapPin, BookOpen, TrendingUp, User, Settings, BarChart, LogOut, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/app/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import Link from "next/link";

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
  const [seenReplies, setSeenReplies] = useState(new Set());
  const [selectedReply, setSelectedReply] = useState(null);

  const fetchReplies = async () => {
    if (!session?.user?.email) return;
    setIsLoadingReplies(true);
    try {
      const url = `/api/applicant/replies?email=${session.user.email}`;
      const res = await fetch(url);
      const data = await res.json();
      setReplies(data.replies || []);
      // Reset seen state for new replies only if they are truly new (compare lengths or IDs)
      const newSeen = new Set(seenReplies);
      data.replies?.forEach(reply => {
        if (!seenReplies.has(reply._id)) {
          // Optionally persist to localStorage for cross-session
        }
      });
      setSeenReplies(newSeen);
    } catch (err) {
      console.error("Failed to fetch replies:", err);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  // Initial fetch and polling
  useEffect(() => {
    if (!session?.user?.email) return;
    fetchReplies();
    const interval = setInterval(() => fetchReplies(), 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [session?.user?.email]);

  const unreadCount = replies.filter(reply => !seenReplies.has(reply._id)).length;

  const handleReplyClick = (reply) => {
    setSeenReplies(prev => new Set([...prev, reply._id]));
    setSelectedReply(reply);
  };

  const closePopup = () => {
    setSelectedReply(null);
  };

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
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 max-h-96 overflow-y-auto bg-white shadow-xl rounded-xl border border-gray-200 p-0">
                <DropdownMenuLabel className="px-4 py-3 border-b border-gray-100 font-semibold text-gray-800 flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadCount > 0 && <span className="text-sm text-blue-600">{unreadCount} new</span>}
                </DropdownMenuLabel>
                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                  {isLoadingReplies ? (
                    <p className="text-gray-500 text-center py-8">Loading...</p>
                  ) : replies.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No new notifications</p>
                  ) : (
                    replies.map((reply) => {
                      const isSeen = seenReplies.has(reply._id);
                      return (
                        <DropdownMenuItem 
                          key={reply._id} 
                          className={`items-start space-x-3 p-4 hover:bg-gray-50 rounded-none cursor-pointer border-l-4 ${isSeen ? 'border-gray-200' : 'border-blue-500 bg-blue-50'}`}
                          onClick={() => handleReplyClick(reply)}
                        >
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!isSeen ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                              {reply.message}
                            </p>
                            <p className={`text-xs ${!isSeen ? 'text-gray-500' : 'text-gray-400'} mt-1`}>
                              {new Date(reply.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      );
                    })
                  )}
                </div>
                {replies.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link href="/replies" className="block w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      See all notifications
                    </Link>
                  </div>
                )}
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

      {/* Notification Popup Dialog */}
      <Dialog open={!!selectedReply} onOpenChange={closePopup}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Notification Details</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={closePopup}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-4 mt-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {selectedReply?.message || ''}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedReply ? new Date(selectedReply.createdAt).toLocaleString() : ''}
                  </p>
                </div>
                {/* If you have more fields like sender, job title, etc., add them here */}
                {/* Example: <p className="text-sm text-gray-600">From: {selectedReply?.sender}</p> */}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </nav>
  );
}