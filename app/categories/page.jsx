"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { LucideIcon, Headphones, Laptop, Watch, Smartphone, Camera, Plug, Package } from "lucide-react";

const CATEGORIES = [
  { id: "Earphone", name: "Earphones", icon: Headphones },
  { id: "Headphone", name: "Headphones", icon: Headphones },
  { id: "Laptop", name: "Laptops", icon: Laptop },
  { id: "Watch", name: "Watches", icon: Watch },
  { id: "Smartphone", name: "Smartphones", icon: Smartphone },
  { id: "Camera", name: "Cameras", icon: Camera },
  { id: "Accessories", name: "Accessories", icon: Plug },
];

export default function Categories() {
  const { products } = useAppContext();
  const hasProducts = products?.length > 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
        {/* Hero Section */}
        <section className="relative py-20 text-center bg-white shadow-sm">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
            Explore All Categories
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
            Browse by category and discover products curated just for you.
          </p>
        </section>

        <div className="container mx-auto px-4 mt-16 space-y-24">

          {/* Floating Category Nav */}
          {hasProducts && (
            <div className="sticky top-20 z-40">
              <div className="flex gap-3 p-3 overflow-x-auto bg-white/80 backdrop-blur-md shadow-md rounded-xl border scrollbar-hide">
                {CATEGORIES.filter(cat => products.some(p => p.category === cat.id)).map(cat => {
                  const Icon = cat.icon;
                  return (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className="flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-green-100 hover:text-green-800 transition border text-sm font-medium"
                    >
                      <Icon className="w-4 h-4" /> {cat.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category Sections */}
          {hasProducts ? (
            CATEGORIES.map(cat => {
              const catProducts = products.filter(p => p.category === cat.id);
              if (catProducts.length === 0) return null;
              const Icon = cat.icon;

              return (
                <section key={cat.id} id={cat.id} className="scroll-mt-28">

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-green-100 text-green-700 rounded-2xl shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                      {cat.name}
                      <span className="text-sm text-gray-500 font-medium">({catProducts.length})</span>
                    </h2>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {catProducts.map(product => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Package className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700">No products available</h3>
              <p className="text-gray-500 mt-1">Please check back later.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Hide Scrollbars + Smooth Scroll */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </>
  );
}
