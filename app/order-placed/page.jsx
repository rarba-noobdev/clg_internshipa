"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { CheckCircle2 } from "lucide-react";

// 🔥 COMPLETE REDESIGN — Order Placed Screen
// Clean, modern, animated confirmation screen

const OrderPlaced = () => {
  const { router } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/my-orders");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-6 text-center">
      {/* Animated Checkmark */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute">
          <CheckCircle2 className="w-24 h-24 text-green-600 animate-scaleIn" />
        </div>
        <div className="animate-spin h-28 w-28 rounded-full border-4 border-gray-200 border-t-green-400"></div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
        Order Placed Successfully
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 mt-2 text-sm md:text-base max-w-sm">
        Thank you for shopping with us! Redirecting you to your orders...
      </p>

      {/* Small Animation */}
      <div className="mt-6 animate-fadeIn text-green-600 font-medium text-sm">
        Preparing your order summary…
      </div>

      {/* Animations */}
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OrderPlaced;