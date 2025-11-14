"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Zap, Tag } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Pure Sound. Zero Noise.",
    subtitle: "Premium Headphones",
    badge: "30% OFF",
    cta1: "Shop Now",
    cta2: "Explore Audio",
    link1: "/categories#category-headphone",
    link2: "/categories#category-headphone",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop",
    gradient: "from-purple-600/90 via-blue-600/80 to-cyan-500/70",
    accent: "purple",
  },
  {
    id: 2,
    title: "Next-Gen Performance",
    subtitle: "MacBook Pro M3",
    badge: "Save ₹40,000",
    cta1: "Buy Now",
    cta2: "Learn More",
    link1: "/categories#category-laptop",
    link2: "/categories#category-laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop",
    gradient: "from-slate-800/90 via-slate-700/80 to-slate-600/70",
    accent: "blue",
  },
  {
    id: 3,
    title: "Game Without Limits",
    subtitle: "PS5 Pro + 2 Games",
    badge: "Limited Stock",
    cta1: "Grab Deal",
    cta2: "View Bundle",
    link1: "/categories#category-accessories",
    link2: "/categories#category-accessories",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop",
    gradient: "from-indigo-600/90 via-purple-600/80 to-pink-500/70",
    accent: "pink",
  },
];

const HeaderSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection('next');
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goTo = (index) => {
    setDirection(index > current ? 'next' : 'prev');
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => {
    setDirection('prev');
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const next = () => {
    setDirection('next');
    setCurrent((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlide = slides[current];

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-black">
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out
            ${current === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
          <div className="max-w-2xl">
            {/* Animated Badge */}
            <div className="mb-6 flex items-center gap-3 animate-fadeInUp">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-lg">
                <Tag className="w-4 h-4 text-white" />
                <span className="text-white font-semibold text-sm tracking-wide">
                  {currentSlide.badge}
                </span>
              </div>
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>

            {/* Subtitle */}
            <p className="text-white/90 text-lg md:text-xl font-medium mb-3 tracking-wide animate-fadeInUp animation-delay-100">
              {currentSlide.subtitle}
            </p>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-fadeInUp animation-delay-200">
              {currentSlide.title}
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-300">
              <Link
                href={currentSlide.link1}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-full hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 hover:scale-105 active:scale-95"
              >
                {currentSlide.cta1}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={currentSlide.link2}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold text-lg rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all hover:scale-105 active:scale-95"
              >
                {currentSlide.cta2}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/20 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all border border-white/20 group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative"
            aria-label={`Go to slide ${i + 1}`}
          >
            {/* Background bar */}
            <div className={`h-1.5 rounded-full transition-all duration-300
              ${i === current ? 'w-16 bg-white' : 'w-8 bg-white/40'}
            `}>
              {/* Progress fill for current slide */}
              {i === current && isAutoPlaying && (
                <div className="h-full bg-white rounded-full origin-left animate-progressBar" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hidden md:block">
        <span className="text-white font-semibold text-sm">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressBar {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animate-progressBar {
          animation: progressBar 5s linear;
        }
      `}</style>
    </section>
  );
};

export default HeaderSlider;