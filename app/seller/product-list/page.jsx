"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import Footer from "@/components/seller/Footer";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, Tag, Package2, IndianRupee } from "lucide-react";

// 🔥 COMPLETE REDESIGN — Seller Product List
// Clean, modern table with icons, better spacing, admin UI polish

const ProductList = () => {
  const { router, getToken, user } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/product/seller-list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchSellerProduct();
  }, [user]);

  return (
    <div className="flex-1 min-h-screen bg-gray-50 flex flex-col">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full p-6 md:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Products</h1>

          <div className="overflow-hidden rounded-2xl bg-white shadow border border-gray-200">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left w-1/2 flex items-center gap-2">
                    <Package2 className="w-4 h-4" /> Product
                  </th>
                  <th className="px-6 py-4 text-left max-sm:hidden flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Category
                  </th>
                  <th className="px-6 py-4 text-left flex items-center gap-2">
                    <IndianRupee className="w-4 h-4" /> Price
                  </th>
                  <th className="px-6 py-4 text-left max-sm:hidden">Action</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-700">
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    {/* PRODUCT */}
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="bg-gray-100 rounded-xl p-2 w-16 h-16 flex items-center justify-center">
                        <Image
                          src={product.image[0]}
                          alt="product"
                          width={70}
                          height={70}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium text-gray-900 truncate">
                        {product.name}
                      </span>
                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-4 max-sm:hidden text-gray-600">
                      {product.category}
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-4 font-medium text-gray-900">
                      ₹{product.offerPrice}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 max-sm:hidden">
                      <button
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductList;