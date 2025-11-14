"use client";

import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Zap,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Headphones,
  Laptop,
  Smartphone,
} from "lucide-react";

// Fully redesigned – clean, modern, premium
const Home = () => {
  const { products } = useAppContext();
  const featured = products?.slice(0, 8) || [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden">
          <HeaderSlider />
        </section>

        {/* TRUST BADGES */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-8 mt-4 border-y">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: <Zap className="h-6 w-6" />, text: "2-Hour Delivery" },
              { icon: <Shield className="h-6 w-6" />, text: "100% Genuine Products" },
              { icon: <Truck className="h-6 w-6" />, text: "Easy Free Returns" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition"
              >
                <div className="p-2 rounded-full bg-green-100 text-green-700 border">
                  {item.icon}
                </div>
                <span className="font-semibold text-gray-800">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="container mx-auto px-4 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="outline" className="text-green-700 border-green-700 mb-2">
                Popular Picks
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Products
              </h2>
            </div>
            <Button variant="ghost" className="hidden md:flex">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Button variant="outline">View All Products</Button>
          </div>
        </section>

        <Separator className="max-w-5xl mx-auto" />

        {/* CATEGORIES */}
        <section className="container mx-auto px-4 py-14">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Headphones className="h-12 w-12" />, label: "Audio", href: "/categories#Earphone" },
              { icon: <Laptop className="h-12 w-12" />, label: "Laptops", href: "/categories#Laptop" },
              { icon: <Smartphone className="h-12 w-12" />, label: "Phones", href: "/categories#Smartphone" },
              { icon: <Zap className="h-12 w-12" />, label: "More", href: "/categories" },
            ].map((cat) => (
              <a key={cat.label} href={cat.href} className="group">
                <Card className="p-8 text-center hover:shadow-lg transition-all group-hover:scale-105 border rounded-2xl">
                  <div className="text-green-600 mb-3 group-hover:text-green-700">
                    {cat.icon}
                  </div>
                  <p className="font-semibold text-gray-800">{cat.label}</p>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* BANNER */}
        <section className="my-12 md:my-16">
          <Banner />
        </section>

        {/* NEWSLETTER */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-14">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get 10% Off Your First Order
            </h2>
            <p className="text-lg mb-6 opacity-95">
              Subscribe and never miss exclusive deals.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button size="lg" variant="secondary">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;