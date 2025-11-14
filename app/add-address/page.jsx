"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { MapPin, User, Phone, Mail, Home, Landmark } from "lucide-react";

// 🔥 COMPLETE PREMIUM REDESIGN — Modern, Clean, Minimal
// Apple-like layout + Amazon checkout flow

const AddAddress = () => {
  const { getToken, router } = useAppContext();

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/add-address",
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        router.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Navbar />

      <main className="px-6 md:px-20 lg:px-40 py-14 min-h-screen bg-gray-50">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-10">
          Add <span className="text-green-600">Shipping Address</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg border border-gray-100 rounded-2xl p-8 w-full max-w-xl"
          >
            <div className="space-y-4">
              {/* Full Name */}
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl border">
                <User className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full bg-transparent focus:outline-none text-gray-800"
                />
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl border">
                <Phone className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={address.phoneNumber}
                  onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                  className="w-full bg-transparent focus:outline-none text-gray-800"
                />
              </div>

              {/* Pincode */}
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl border">
                <Mail className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full bg-transparent focus:outline-none text-gray-800"
                />
              </div>

              {/* Area */}
              <div className="flex items-start gap-3 bg-gray-100 px-4 py-3 rounded-xl border">
                <Home className="w-5 h-5 text-gray-500 mt-1" />
                <textarea
                  placeholder="Address (Area and Street)"
                  rows="3"
                  value={address.area}
                  onChange={(e) => setAddress({ ...address, area: e.target.value })}
                  className="w-full bg-transparent focus:outline-none text-gray-800 resize-none"
                ></textarea>
              </div>

              {/* City + State */}
              <div className="flex gap-3">
                <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl border w-full">
                  <Landmark className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                  />
                </div>

                <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl border w-full">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="mt-8 w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Save Address
            </button>
          </form>

          {/* ILLUSTRATION */}
          <div className="hidden lg:block">
            <Image
              src={assets.my_location_image}
              alt="Location Illustration"
              className="w-[420px]"
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AddAddress;