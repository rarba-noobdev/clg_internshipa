"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "@/components/seller/Navbar";
import Sidebar from "@/components/seller/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const SellerLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 bg-white border-r shadow-sm">
          <Sidebar />
        </aside>

        {/* Mobile Drawer */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-20 left-4 z-50 lg:hidden bg-white/90 backdrop-blur-sm shadow-md hover:bg-white"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-0">
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 lg:pl-0">
          <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 min-h-[calc(100vh-8rem)]">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default SellerLayout;