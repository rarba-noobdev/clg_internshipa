"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

// Sleek, cleaner, more premium redesign
const Banner = () => {
  return (
    <section className="relative w-full h-[380px] md:h-[480px] overflow-hidden rounded-3xl mx-4 md:mx-8 lg:mx-16 shadow-xl group bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1201&auto=format&fit=crop"
          alt="Tech Banner"
          className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-6 md:px-16">
        <div className="max-w-2xl text-white">
          {/* Sale Badge */}
          <div className="inline-flex items-center gap-2 bg-white text-black font-semibold px-4 py-1.5 rounded-full text-sm shadow-md mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Up to 40% OFF</span>
            <TrendingUp className="w-4 h-4" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
            Premium Electronics
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Delivered Fast
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-white/80 text-lg mb-8 max-w-lg">
            Shop the latest headphones, laptops, smart devices & more with instant delivery options.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-all"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 backdrop-blur-md text-white font-medium rounded-full hover:bg-white/20 transition-all"
            >
              View Deals
            </Link>
          </div>
        </div>
      </div>

      {/* Soft Glow Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl" />
    </section>
  );
};

export default Banner;