import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Home,
  Package,
  Users,
  Repeat,
  User,
  LogOut,
  Settings,
} from "lucide-react";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
}

const Header = ({ userName = "Jane Doe", userAvatar = "" }: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center mr-2">
              <Repeat className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-teal-700">Trueque</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" icon={<Home size={18} />} label="Dashboard" />
          <NavLink
            to="/my-items"
            icon={<Package size={18} />}
            label="My Items"
          />
          <NavLink
            to="/community"
            icon={<Users size={18} />}
            label="Community Items"
          />
          <NavLink
            to="/swap-builder"
            icon={<Repeat size={18} />}
            label="Swap Builder"
            active
          />
        </nav>

        {/* User Profile */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-teal-100 text-teal-800">
                    {userName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userName.toLowerCase().replace(" ", ".") + "@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavLink = ({ to, icon, label, active = false }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
        active
          ? "bg-teal-50 text-teal-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span className="mr-2">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default Header;
