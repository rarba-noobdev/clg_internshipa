"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import OrderSummary from "@/components/OrderSummary";
import { useAppContext } from "@/context/AppContext";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  // Build cart array safely
  const cartList = Object.keys(cartItems)
    .map((id) => {
      const product = products.find((p) => p._id === id);
      return {
        product,
        qty: cartItems[id],
      };
    })
    .filter((item) => item.product && item.qty > 0);

  return (
    <>
      <Navbar />

      <main className="px-4 md:px-12 lg:px-28 xl:px-40 py-14 min-h-screen bg-gray-50">
        {/* Title */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart
            <span className="text-green-600"> ({getCartCount()})</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT — CART ITEMS */}
          <div className="flex-1 bg-white rounded-2xl shadow p-6 border border-gray-100">
            {cartList.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
                <button
                  onClick={() => router.push("/all-products")}
                  className="text-green-600 hover:underline"
                >
                  Browse Products →
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartList.map(({ product, qty }) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-5 bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-white rounded-xl border flex items-center justify-center">
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm md:text-base">
                        {product.name}
                      </p>
                      <p className="text-green-600 font-bold mt-1 text-sm md:text-base">
                        ₹{product.offerPrice}
                      </p>

                      {/* Remove */}
                      <button
                        className="flex items-center gap-1 text-red-500 text-xs md:text-sm mt-2 hover:underline"
                        onClick={() => updateCartQuantity(product._id, 0)}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-white rounded-full shadow border px-3 py-1">
                      <button
                        onClick={() =>
                          updateCartQuantity(product._id, qty - 1)
                        }
                        className="text-lg font-bold text-gray-700"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={qty}
                        onChange={(e) =>
                          updateCartQuantity(product._id, Number(e.target.value))
                        }
                        className="w-10 text-center text-gray-800 focus:outline-none"
                      />
                      <button
                        onClick={() => addToCart(product._id)}
                        className="text-lg font-bold text-gray-700"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right font-semibold text-gray-800 text-sm md:text-base w-20">
                      ₹{(product.offerPrice * qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Continue Shopping */}
            <button
              onClick={() => router.push("/all-products")}
              className="mt-6 text-green-600 font-medium hover:underline"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <OrderSummary />
        </div>
      </main>
    </>
  );
};

export default Cart;
