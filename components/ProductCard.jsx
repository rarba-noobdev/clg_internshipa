"use client";

import React from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { Heart, Star } from "lucide-react";

// Minimal, premium, Amazon-style product card
const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  const handleClick = () => {
    router.push(`/product/${product._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleClick}
      className="group w-full max-w-[210px] cursor-pointer rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square bg-white p-4 flex items-center justify-center overflow-hidden rounded-t-xl">
        <Image
          src={product.image[0]}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Wishlist:", product._id);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition"
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span>4.5</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <p className="font-bold text-base text-gray-900">
          {currency}{product.offerPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;