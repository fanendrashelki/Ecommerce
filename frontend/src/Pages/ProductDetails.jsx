import React, { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

import ProductDetailsBox from "../components/ProductItem/ProductDetailsBox";
import ZoomImage from "../components/ZoomImage/ZoomImage";
import ProductDetailsSkeleton from "../components/Skeleton/ProductDetailsSkeleton";
import Review from "../components/Review";
import { MyProductContext } from "../context/AppContext";

// Static tab labels
const TABS = ["Product Description", "Specifications", "Reviews"];

const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const context = useContext(MyProductContext);

  useEffect(() => {
    if (id) fetchProductDetails(id);
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const res = await axiosInstance.get(`/product/${productId}`);
      setProductDetails(res?.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const productSpecs = [
    ['Apple MacBook Pro 17"', "Silver", "Laptop", "$2999"],
    ["Microsoft Surface Pro", "White", "Laptop PC", "$1999"],
    ["Magic Mouse 2", "Black", "Accessories", "$99"],
  ];

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <>
      {/* Product Image and Details */}
      <section className="py-5 mt-5">
        <div className="container px-4 sm:px-6 flex flex-col lg:flex-row gap-6 mx-auto py-8 lg:py-12 product-card bg-white rounded-lg overflow-hidden">
          <div className="w-full lg:w-[30%]">
            <ZoomImage images={productDetails?.images} />
          </div>
          <div className="w-full lg:w-[70%] space-y-4 py-6">
            <ProductDetailsBox productDetails={productDetails} />
          </div>
        </div>
      </section>

      {/* Tabs and Content */}
      <div className="bg-white py-5">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-4 mb-5">
            {TABS.map((label, index) => (
              <span
                key={index}
                onClick={() => setActiveTab(index)}
                className={`cursor-pointer text-[16px] font-[500] transition ${activeTab === index ? "text-[#35ac75]" : "text-gray-800"
                  }`}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 0 && (
            <div className="w-full shadow-md p-5 rounded-md text-sm sm:text-base">
              <p>
                {productDetails?.description || "No description available."}
              </p>
            </div>
          )}

          {activeTab === 1 && (
            <div className="w-full overflow-x-auto shadow-md p-5 rounded-md">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                  <tr>
                    <th className="px-6 py-3">Product name</th>
                    <th className="px-6 py-3">Color</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {productSpecs.map(([name, color, category, price], idx) => (
                    <tr key={idx} className="bg-white border-b border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {name}
                      </td>
                      <td className="px-6 py-4">{color}</td>
                      <td className="px-6 py-4">{category}</td>
                      <td className="px-6 py-4">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 2 && (
            <Review productId={id} userId={context?.User?._id} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
