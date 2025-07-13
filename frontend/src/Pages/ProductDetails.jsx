import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

import ProductDetailsBox from "../components/ProductItem/ProductDetailsBox";
import ZoomImage from "../components/ZoomImage/ZoomImage";

// Static tab labels
const TABS = ["Product Description", "Specifications", "Reviews"];

// Dummy reviews data
const reviews = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    comment: "Absolutely loved the product! Highly recommend it.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    comment: "Good quality but delivery was delayed by 2 days.",
    rating: 4,
  },
  {
    name: "Raj Patel",
    email: "raj.patel@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    comment: "Average experience. Expected better packaging.",
    rating: 3,
  },
  {
    name: "Aisha Khan",
    email: "aisha.khan@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    comment: "Great service and quality. Will purchase again!",
    rating: 5,
  },
];

// Dummy specification table
const productSpecs = [
  ['Apple MacBook Pro 17"', "Silver", "Laptop", "$2999"],
  ["Microsoft Surface Pro", "White", "Laptop PC", "$1999"],
  ["Magic Mouse 2", "Black", "Accessories", "$99"],
];

const ProductDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-600 font-medium">
        Loading product details...
      </div>
    );
  }

  return (
    <>
      {/* Product Image and Details */}
      <section className="py-5 mt-5">
        <div className="container px-4 sm:px-6 flex flex-col lg:flex-row gap-6 mx-auto py-8 lg:py-12 product-card bg-white rounded-lg overflow-hidden">
          <div className="w-full lg:w-[40%]">
            <ZoomImage images={productDetails?.images} />
          </div>
          <div className="w-full lg:w-[60%] space-y-4 py-6">
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
                className={`cursor-pointer text-[16px] font-[500] transition ${
                  activeTab === index ? "text-[#35ac75]" : "text-gray-800"
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
            <div className="w-full shadow-md p-5 rounded-md">
              <h5 className="text-xl font-bold mb-4 text-gray-900">
                Latest Customer Reviews
              </h5>
              <ul className="divide-y divide-gray-200">
                {reviews.map((review, idx) => (
                  <li key={idx} className="py-4 flex gap-4">
                    <img
                      src={review.avatar}
                      className="w-14 h-14 rounded-full shadow-md"
                      alt={review.name}
                    />
                    <div className="flex-1">
                      <p className="text-[16px] font-semibold text-gray-900">
                        {review.name}
                      </p>
                      <p className="text-gray-500 text-sm">{review.email}</p>
                      <p className="text-gray-700 text-sm mt-1">
                        {review.comment}
                      </p>
                      <Rating value={review.rating} size="small" readOnly />
                    </div>
                  </li>
                ))}
              </ul>

              {/* Add Review Form */}
              <div className="mt-6">
                <h6 className="mb-2 text-[17px] font-semibold">Add Review</h6>
                <form className="space-y-4">
                  <TextField
                    required
                    label="Your Review"
                    fullWidth
                    multiline
                    minRows={3}
                    sx={{
                      "& label": { color: "#35ac75" },
                      "& label.Mui-focused": { color: "#ff1744" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#35ac75" },
                        "&:hover fieldset": { borderColor: "#ff8a80" },
                        "&.Mui-focused fieldset": { borderColor: "#ff1744" },
                      },
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <label className="text-gray-700">Rating:</label>
                    <Rating
                      name="review-rating"
                      defaultValue={4}
                      size="small"
                      readOnly
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    className="!bg-[#35ac75] hover:!bg-[#000000]"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
