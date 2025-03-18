import React from "react";
import { Link } from "react-router-dom";
import { Search, User, Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  username?: string;
  avatarUrl?: string;
  notificationCount?: number;
}

const Navbar = ({
  username = "JohnDoe",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  notificationCount = 3,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="w-full h-[70px] bg-teal-600 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold">Trueque</span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex relative w-1/3">
          <Input
            type="text"
            placeholder="Search items..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/browse" className="hover:text-white/80 transition-colors">
            Browse
          </Link>
          <Link
            to="/my-items"
            className="hover:text-white/80 transition-colors"
          >
            My Items
          </Link>
          <Link
            to="/swap-builder"
            className="hover:text-white/80 transition-colors"
          >
            Swap Builder
          </Link>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Button>
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <img
                  src={avatarUrl}
                  alt={username}
                  className="h-10 w-10 rounded-full object-cover border-2 border-white/20"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/logout" className="w-full">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-teal-700 absolute w-full transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden",
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <div className="relative w-full mb-2">
            <Input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
          </div>
          <Link
            to="/browse"
            className="py-2 px-4 hover:bg-teal-800 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse
          </Link>
          <Link
            to="/my-items"
            className="py-2 px-4 hover:bg-teal-800 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            My Items
          </Link>
          <Link
            to="/swap-builder"
            className="py-2 px-4 hover:bg-teal-800 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Swap Builder
          </Link>
          <Link
            to="/profile"
            className="py-2 px-4 hover:bg-teal-800 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            to="/settings"
            className="py-2 px-4 hover:bg-teal-800 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </Link>
          <Link
            to="/logout"
            className="py-2 px-4 hover:bg-teal-800 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
