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

// 🔥 Modern, Amazon-style My Orders Page
const MyOrders = () => {
  const { currency, getToken, user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Please log in to view orders");
        setLoading(false);
        return;
      }

      const { data } = await axios.get("/api/order/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders(data.orders.reverse());
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  // Helper to format date as MM/DD/YYYY
  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      : "N/A";
  };

  return (
    <>
      <Navbar />

      <main className="px-4 sm:px-6 md:px-20 lg:px-40 py-14 min-h-screen bg-gray-50">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 flex items-center gap-3">
          <PackageSearch className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" aria-hidden="true" />
          My Orders
        </h1>

        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Image
              src={assets.box_icon}
              alt="No orders"
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
                className="bg-white rounded-2xl shadow border border-gray-100 p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6 items-start"
              >
                {/* Product Summary */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Image
                      src={order.items[0]?.product?.image || assets.box_icon}
                      alt={order.items[0]?.product?.name || "Order item"}
                      width={45}
                      height={45}
                      className="object-contain opacity-80"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      {order.items
                        ?.map(
                          (item) =>
                            `${item.product?.name || "Unknown Product"} × ${item.quantity || 1}`
                        )
                        .join(", ") || "No items"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {order.items?.length || 0} item(s)
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="min-w-[140px] sm:min-w-[160px] text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    <User className="w-4 h-4" aria-hidden="true" />
                    {order.address?.fullName || "N/A"}
                  </p>
                  <p className="mt-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    {order.address?.area || "N/A"},
                  </p>
                  <p className="ml-5 text-gray-600">
                    {order.address?.city || "N/A"}, {order.address?.state || "N/A"}
                  </p>
                  <p className="mt-1 flex items-center gap-1">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    {order.address?.phoneNumber || "N/A"}
                  </p>
                </div>

                {/* Amount */}
                <div className="font-bold text-gray-900 text-base sm:text-lg min-w-[80px]">
                  {currency}
                  {order.amount || "0.00"}
                </div>

                {/* Order Meta */}
                <div className="text-sm text-gray-600 min-w-[120px] sm:min-w-[140px]">
                  <p className="flex items-center gap-1">
                    <span className="font-medium">Method:</span>{" "}
                    {order.paymentMethod || "COD"}
                  </p>
                  <p className="flex items-center gap-1 mt-1">
                    <CalendarDays className="w-4 h-4" aria-hidden="true" />
                    {formatDate(order.date)}
                  </p>
                  <p className="mt-1">
                    <span className="font-medium">Payment:</span>{" "}
                    {order.paymentStatus || "Pending"}
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