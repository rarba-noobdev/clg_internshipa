"use client";

import React, { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { CheckCircle2 } from "lucide-react";

// Clean, modern, animated confirmation screen
const OrderPlaced = () => {
  const { router } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/my-orders");
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-emerald-50 px-6 text-center">
      {/* Animated Checkmark */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute">
          <CheckCircle2 className="w-24 h-24 text-green-600 animate-scaleIn" />
        </div>
        <div className="animate-spin h-28 w-28 rounded-full border-4 border-gray-200 border-t-green-500"></div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
        Order Placed Successfully! 🎉
      </h1>

      {/* Subtext */}
      <p className="text-gray-600 mt-3 text-sm md:text-base max-w-md">
        Thank you for shopping with us! Your order is being processed and you'll receive a confirmation email shortly.
      </p>

      {/* Progress Indicator */}
      <div className="mt-8 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>

      <div className="mt-4 animate-fadeIn text-green-700 font-medium text-sm">
        Redirecting to your orders in a moment...
      </div>

      {/* Manual Navigation Option */}
      <button
        onClick={() => router.push("/my-orders")}
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg"
      >
        View My Orders
      </button>

      {/* Animations */}
      <style jsx>{`
        @keyframes scaleIn {
          0% { 
            transform: scale(0.6); 
            opacity: 0; 
          }
          50% {
            transform: scale(1.1);
          }
          100% { 
            transform: scale(1); 
            opacity: 1; 
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes fadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(10px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OrderPlaced;