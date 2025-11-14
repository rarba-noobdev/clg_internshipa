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
  Shield
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

          {/* Brand & Copyright */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Level <span className="text-green-600">Tech</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Premium electronics with lightning-fast delivery and zero hassle.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Shield className="h-3 w-3" />
              © {new Date().getFullYear()} Level Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Categories", href: "/categories" },
                { label: "Contact", href: "/contact-us" },
                { label: "Privacy Policy", href: "/privacy-policy" },
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

          {/* Contact & Social */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  support@level.in
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  +91 800 888 1234
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  Hyderabad, India
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Follow Us</h4>
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t text-center text-xs text-muted-foreground">
          <p>
            CIN: U52399TG2023PTC178901 | GST: 36AAACL1234A1Z5
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;