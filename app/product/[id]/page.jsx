"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Star, ShoppingCart, Zap, Truck, ShieldCheck } from "lucide-react";

// 🔥 COMPLETE PRODUCT PAGE REDESIGN — Premium, Modern, E-Commerce UI
// Inspired by Apple + Amazon product pages

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart, user } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const match = products.find((p) => p._id === id);
    if (match) setProductData(match);
  }, [id, products]);

  if (!productData) return <Loading />;

  return (
    <>
      <Navbar />

      <main className="px-6 md:px-16 lg:px-32 py-14 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* LEFT — IMAGES */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
              <Image
                src={mainImage || productData.image[0]}
                alt={productData.name}
                width={800}
                height={800}
                className="w-full object-contain rounded-xl"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`border rounded-xl p-2 bg-white shadow-sm hover:shadow-md transition ${mainImage === img ? "border-green-600" : "border-gray-300"}`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    width={200}
                    height={200}
                    className="object-contain rounded-lg"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — DETAILS */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {productData.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400" />
                ))}
                <Star className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-gray-600">(4.5)</span>
            </div>

            {/* Price */}
            <p className="text-4xl font-semibold text-gray-900">
              ₹{productData.offerPrice}
              <span className="text-lg text-gray-500 line-through ml-3">
                ₹{productData.price}
              </span>
            </p>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {productData.description}
            </p>

            {/* Features */}
            <div className="bg-white border rounded-2xl shadow p-5 space-y-4">
              <h3 className="font-semibold text-gray-800 mb-2">Specifications</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b py-2">
                    <td className="font-medium text-gray-700">Brand</td>
                    <td className="text-gray-600">Generic</td>
                  </tr>
                  <tr className="border-b py-2">
                    <td className="font-medium text-gray-700">Color</td>
                    <td className="text-gray-600">Multi</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-gray-700">Category</td>
                    <td className="text-gray-600">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Offers / Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {[{icon:Zap, text:"Fast 2-hour Delivery"},{icon:Truck,text:"Free Shipping"},{icon:ShieldCheck,text:"Secure Warranty"}].map((item,i)=>(
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl border shadow-sm"
                >
                  <item.icon className="w-5 h-5 text-green-600" />
                  <span className="text-gray-800 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => addToCart(productData._id)}
                className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 py-3.5 rounded-xl font-medium hover:bg-gray-100 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToCart(productData._id);
                  if (user) router.push("/cart");
                }}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <section className="mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured <span className="text-green-600">Products</span>
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.slice(0, 5).map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="px-8 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">
              See More
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Product;