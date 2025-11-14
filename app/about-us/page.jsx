"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Shield, 
  Truck, 
  Headphones, 
  Laptop, 
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Building2
} from "lucide-react";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 text-center">
          <Badge variant="outline" className="mb-4 text-green-600 border-green-600">
            About Level
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Level Up Your Tech Game
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We don't just sell gadgets — we deliver <span className="text-green-600 font-semibold">experiences</span>. 
            Premium quality. Lightning speed. Zero hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-green-50 py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "75K+", label: "Happy Customers" },
                { value: "99.9%", label: "Uptime SLA" },
                { value: "24/7", label: "Support" },
                { value: "2H", label: "Avg. Delivery" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-bold text-green-600">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Level?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-green-600" />,
                title: "Blazing Fast",
                desc: "Same-day dispatch. 2-hour delivery in 20+ cities.",
              },
              {
                icon: <Shield className="h-8 w-8 text-green-600" />,
                title: "100% Authentic",
                desc: "Direct from Apple, Sony, Samsung. Full warranty.",
              },
              {
                icon: <Truck className="h-8 w-8 text-green-600" />,
                title: "Free & Easy Returns",
                desc: "30-day return window. Free pickup. No questions.",
              },
            ].map((feature) => (
              <Card key={feature.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Company Info */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-xl">
                <Building2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Level Technologies Pvt. Ltd.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              <strong>Registered Office:</strong> 3rd Floor, Tech Tower, Hitech City, Hyderabad, Telangana 500081, India<br />
              <strong>CIN:</strong> U52399TG2023PTC178901 | <strong>GST:</strong> 36AAACL1234A1Z5
            </p>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Headphones className="h-10 w-10" />, label: "Audio" },
                { icon: <Laptop className="h-10 w-10" />, label: "Laptops" },
                { icon: <Smartphone className="h-10 w-10" />, label: "Phones" },
                { icon: <Zap className="h-10 w-10" />, label: "More" },
              ].map((cat) => (
                <Card
                  key={cat.label}
                  className="p-8 text-center hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="text-green-600 mb-3 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <p className="font-medium">{cat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-16 text-center">
          <Card className="max-w-2xl mx-auto p-8 md:p-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join 75,000+ customers who trust Level for their tech needs.
            </p>
            <Button size="lg" variant="secondary">
              Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutUs;