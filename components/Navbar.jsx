"use client";

import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import ClickableSearchIcon from "./ClickableSearchIcon";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, Search, ShoppingCart, Package, Home, Box, User } from "lucide-react";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Shop" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact" },
  ];

  const userMenuItems = [
    { label: "Cart", icon: <ShoppingCart className="w-4 h-4" />, path: "/cart" },
    { label: "My Orders", icon: <Package className="w-4 h-4" />, path: "/my-orders" },
  ];

  const mobileUserMenu = [
    { label: "Home", icon: <Home className="w-5 h-5" />, path: "/" },
    { label: "Products", icon: <Box className="w-5 h-5" />, path: "/all-products" },
    ...userMenuItems,
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div
          className="flex cursor-pointer items-center transition-transform hover:scale-105"
          onClick={() => router.push("/")}
        >
          levǝl
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          {isSeller && (
            <Button
              size="sm"
              onClick={() => router.push("/seller")}
              className="bg-green-600 hover:bg-green-700"
            >
              Seller Dashboard
            </Button>
          )}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <ClickableSearchIcon />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.fullName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className="cursor-pointer"
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <UserButton afterSignOutUrl="/" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" onClick={openSignIn} className="gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3 md:hidden">
          <ClickableSearchIcon />

          {isSeller && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Seller
            </Badge>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col space-y-6">
                {/* Nav Links */}
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-lg font-medium text-foreground transition-colors hover:text-green-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Seller Button */}
                {isSeller && (
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      router.push("/seller");
                      setMobileOpen(false);
                    }}
                  >
                    Seller Dashboard
                  </Button>
                )}

                <div className="border-t pt-4">
                  {user ? (
                    <div className="space-y-4">
                      {mobileUserMenu.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => {
                            router.push(item.path);
                            setMobileOpen(false);
                          }}
                          className="flex w-full items-center gap-3 text-left text-foreground transition-colors hover:text-green-600"
                        >
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                      <div className="flex justify-center pt-2">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => {
                        openSignIn();
                        setMobileOpen(false);
                      }}
                    >
                      <User className="h-4 w-4" />
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;