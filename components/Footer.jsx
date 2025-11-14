"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand & Description */}
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold text-green-600">Level</h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Level up your tech game with premium electronics — fast delivery, authentic products, and zero hassle. 
              Your next upgrade starts here.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Button
                  key={i}
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-full hover:bg-green-100 hover:text-green-600 transition"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Categories", href: "/categories" },
                { label: "Contact Us", href: "/contact-us" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-green-600 hover:underline transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { icon: <Phone className="h-3 w-3" />, text: "+91 800 888 1234" },
                { icon: <Mail className="h-3 w-3" />, text: "support@level.in" },
                { icon: <MapPin className="h-3 w-3" />, text: "Hyderabad, India" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get exclusive deals and new arrivals first.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button className="bg-green-600 hover:bg-green-700 whitespace-nowrap">
                Subscribe <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} <strong>Level Technologies Pvt. Ltd.</strong> All Rights Reserved. 
            CIN: U52399TG2023PTC178901
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;