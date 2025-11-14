"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, ListChecks, ShoppingBag } from "lucide-react";

// 🔥 COMPLETE REDESIGN — Seller Sidebar (Modern Admin UI)
// Collapsible, icon-first, premium dashboard style

const SideBar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Add Product", path: "/seller", icon: <PlusCircle className="w-5 h-5" /> },
    { name: "Product List", path: "/seller/product-list", icon: <ListChecks className="w-5 h-5" /> },
    { name: "Orders", path: "/seller/orders", icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  return (
    <aside className="md:w-64 w-20 bg-white border-r border-gray-200 min-h-screen py-6 flex flex-col shadow-sm">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const active = pathname === item.path;

          return (
            <Link href={item.path} key={item.name}>
              <div
                className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition rounded-r-full
                ${active ? "bg-green-600/10 text-green-700 border-r-4 border-green-600 font-semibold" : "hover:bg-gray-100 text-gray-700"}`}
              >
                <div className={`${active ? "text-green-700" : "text-gray-500"}`}>{item.icon}</div>
                <span className="hidden md:block text-sm tracking-wide">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;