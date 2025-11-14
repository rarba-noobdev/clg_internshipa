"use client";

import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Upload, Tag, FileText, Package, DollarSign } from "lucide-react";

// 🔥 COMPLETE PREMIUM REDESIGN — Seller Add Product Page
// Modern, clean, card-style admin UI

const AddProduct = () => {
  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState(""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);

    files.forEach((file) => {
      if (file) formData.append("images", file);
    });

    try {
      const token = await getToken();
      const { data } = await axios.post("/api/product/add", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setFiles([]);
        setName("");
        setDescription("");
        setCategory("Earphone");
        setPrice("");
        setOfferPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 py-10 px-6 md:px-14 lg:px-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Add <span className="text-green-700">New Product</span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8 space-y-8 max-w-3xl"
      >
        {/* Images */}
        <div>
          <label className="font-semibold text-gray-700 flex items-center gap-2 text-lg">
            <Upload className="w-5 h-5 text-green-600" /> Product Images
          </label>
          <p className="text-sm text-gray-500 mb-3">Upload up to 4 images</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <label
                key={index}
                htmlFor={`image${index}`}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-3 bg-gray-100 hover:border-green-600 transition flex items-center justify-center"
              >
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updated = [...files];
                    updated[index] = e.target.files[0];
                    setFiles(updated);
                  }}
                />
                <Image
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt="upload"
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <Tag className="w-5 h-5 text-green-600" /> Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter product name"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" /> Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe your product"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none focus:ring-2 focus:ring-green-600 focus:outline-none"
          ></textarea>
        </div>

        {/* Category, Price, Offer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <Package className="w-5 h-5 text-green-600" /> Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
            >
              <option value="Earphone">Earphones</option>
              <option value="Headphone">Headphones</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" /> Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" /> Offer Price
            </label>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none"
              placeholder="0"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition shadow"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;