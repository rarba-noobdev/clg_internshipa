"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, User } from "lucide-react";

const SellerNavbar = () => {
  const { router } = useAppContext();

  const handleLogout = () => {
    // Add logout logic here (clear token, etc.)
    router.push("/seller/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3">

        {/* Logo */}
        <div
          onClick={() => router.push("/seller")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-md group-hover:bg-green-700 transition">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="hidden sm:block text-xl font-bold text-foreground">
            Level <span className="text-green-600">Seller</span>
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
            onClick={() => router.push("/seller/profile")}
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            className="hidden sm:flex bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>

          {/* Mobile Logout */}
          <Button
            onClick={handleLogout}
            size="icon"
            className="sm:hidden bg-red-600 hover:bg-red-700"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SellerNavbar;