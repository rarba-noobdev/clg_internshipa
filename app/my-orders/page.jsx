"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { assets } from "@/assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";
import { PackageSearch, CalendarDays, MapPin, Phone, User } from "lucide-react";

// 🔥 COMPLETE REDESIGN — My Orders Page
// Clean, modern, Amazon-style order history UI

const MyOrders = () => {
  const { currency, getToken, user } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders(data.orders.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <>
      <Navbar />

      <main className="px-6 md:px-20 lg:px-40 py-14 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 flex items-center gap-3">
          <PackageSearch className="w-7 h-7 text-green-600" />
          My Orders
        </h1>

        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Image
              src={assets.box_icon}
              alt="empty"
              width={80}
              height={80}
              className="mx-auto mb-4 opacity-70"
            />
            <p className="text-lg text-gray-600">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center"
              >
                {/* Product Summary */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Image
                      src={assets.box_icon}
                      alt="order"
                      width={45}
                      height={45}
                      className="opacity-80"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                      {order.items
                        .map((item) => `${item.product.name} × ${item.quantity}`)
                        .join(", ")}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {order.items.length} item(s)
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="min-w-[180px] text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    <User className="w-4 h-4" /> {order.address.fullName}
                  </p>
                  <p className="mt-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {order.address.area},
                  </p>
                  <p className="ml-5 text-gray-600">
                    {order.address.city}, {order.address.state}
                  </p>
                  <p className="mt-1 flex items-center gap-1">
                    <Phone className="w-4 h-4" /> {order.address.phoneNumber}
                  </p>
                </div>

                {/* Amount */}
                <div className="font-bold text-gray-900 text-lg min-w-[100px]">
                  {currency}
                  {order.amount}
                </div>

                {/* Order Meta */}
                <div className="text-sm text-gray-600 min-w-[150px]">
                  <p className="flex items-center gap-1">
                    <span className="font-medium">Method:</span> COD
                  </p>
                  <p className="flex items-center gap-1 mt-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="mt-1">
                    <span className="font-medium">Payment:</span> Pending
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default MyOrders;
