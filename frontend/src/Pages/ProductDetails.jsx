import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import { Button, TextField } from "@mui/material";

import ProductDetailsBox from "../components/ProductItem/ProductDetailsBox";
import ZoomImage from "../components/ZoomImage/ZoomImage";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ProductDetails = () => {
  const { id } = useParams();
  const [ActiveTab, setActiveTab] = useState(0);
  const [productDetails, setProductDetails] = useState([]);
  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const res = await axiosInstance.get(`/product/${productId}`);

      setProductDetails(res?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
    }
  };

  return (
    <>
      {/* Product Image and Details */}
      <section className="bg-white py-5 mt-5">
        <div className="container px-4 sm:px-6 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[40%]">
            <ZoomImage images={productDetails.images} />
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
            {["Description", "Product Details", "Reviews (1)"].map(
              (label, i) => (
                <span
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`cursor-pointer text-[16px] font-[500] transition ${
                    ActiveTab === i ? "text-[#35ac75]" : "text-gray-800"
                  }`}
                >
                  {label}
                </span>
              )
            )}
          </div>

          {/* Tab 0: Description */}
          {ActiveTab === 0 && (
            <div className="w-full shadow-md p-5 rounded-md text-sm sm:text-base">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry...
              </p>
            </div>
          )}

          {/* Tab 1: Product Details Table */}
          {ActiveTab === 1 && (
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
                  {[
                    ['Apple MacBook Pro 17"', "Silver", "Laptop", "$2999"],
                    ["Microsoft Surface Pro", "White", "Laptop PC", "$1999"],
                    ["Magic Mouse 2", "Black", "Accessories", "$99"],
                  ].map(([name, color, category, price], idx) => (
                    <tr key={idx} className="bg-white border-b border-gray-200">
                      <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {name}
                      </th>
                      <td className="px-6 py-4">{color}</td>
                      <td className="px-6 py-4">{category}</td>
                      <td className="px-6 py-4">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 2: Reviews */}
          {ActiveTab === 2 && (
            <div className="w-full lg:w-[80%] mx-auto shadow-md p-5 rounded-md">
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
                      <Rating
                        name={`rating-${idx}`}
                        value={review.rating}
                        size="small"
                        readOnly
                      />
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
