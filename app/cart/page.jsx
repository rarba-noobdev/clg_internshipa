"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import OrderSummary from "@/components/OrderSummary";
import { useAppContext } from "@/context/AppContext";
import { Trash2, AlertCircle } from "lucide-react";

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    productsLoaded,
    cleanCart
  } = useAppContext();

  // Build cart array with validation
  const cartList = Object.keys(cartItems)
    .map((id) => {
      // Convert both IDs to strings for comparison
      const product = products.find((p) => String(p._id) === String(id));
      
      if (!product) {
        console.warn(`Product ${id} not found in products list`);
      }
      
      return {
        id: String(id),
        product,
        qty: cartItems[id],
      };
    })
    .filter((item) => item.product && item.qty > 0);

  // Check for invalid items
  const invalidItemsCount = Object.keys(cartItems).length - cartList.length;

  if (!productsLoaded) {
    return (
      <>
        <Navbar />
        <main className="px-4 md:px-12 lg:px-28 xl:px-40 py-14 min-h-screen bg-gray-50">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

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

        {/* Warning for invalid items */}
        {invalidItemsCount > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <div className="flex items-start">
              <AlertCircle className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0" size={20} />
              <div className="flex-1">
                <p className="text-yellow-800 font-medium">
                  {invalidItemsCount} item(s) in your cart are no longer available
                </p>
                <button
                  onClick={cleanCart}
                  className="text-yellow-700 underline text-sm mt-1 hover:text-yellow-900"
                >
                  Click here to remove them
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT — CART ITEMS */}
          <div className="flex-1 bg-white rounded-2xl shadow p-6 border border-gray-100">
            {cartList.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600 mb-4">
                  {Object.keys(cartItems).length > 0 
                    ? "All items in your cart are unavailable" 
                    : "Your cart is empty"}
                </p>
                <button
                  onClick={() => router.push("/all-products")}
                  className="text-green-600 hover:underline"
                >
                  Browse Products →
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartList.map(({ id, product, qty }) => (
                  <div
                    key={id}
                    className="flex items-center gap-5 bg-gray-50 rounded-xl p-4 border border-gray-200"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-white rounded-xl border flex items-center justify-center">
                      <Image
                        src={product?.image?.[0] ?? "/placeholder.png"}
                        alt={product?.name ?? "Product"}
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm md:text-base">
                        {product?.name ?? "Unnamed Product"}
                      </p>
                      <p className="text-green-600 font-bold mt-1 text-sm md:text-base">
                        ₹{product?.offerPrice ?? 0}
                      </p>

                      {/* Remove */}
                      <button
                        className="flex items-center gap-1 text-red-500 text-xs md:text-sm mt-2 hover:underline"
                        onClick={() => updateCartQuantity(id, 0)}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-white rounded-full shadow border px-3 py-1">
                      <button
                        onClick={() => updateCartQuantity(id, qty - 1)}
                        className="text-lg font-bold text-gray-700"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={qty}
                        onChange={(e) => {
                          const newQty = Math.max(0, Number(e.target.value));
                          updateCartQuantity(id, newQty);
                        }}
                        className="w-10 text-center text-gray-800 focus:outline-none"
                        min="0"
                      />
                      <button
                        onClick={() => updateCartQuantity(id, qty + 1)}
                        className="text-lg font-bold text-gray-700"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right font-semibold text-gray-800 text-sm md:text-base w-20">
                      ₹{((product?.offerPrice ?? 0) * qty).toFixed(2)}
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