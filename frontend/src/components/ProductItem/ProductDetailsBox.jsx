import React, { useContext, useState } from "react";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import { IoCartOutline, IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { Button } from "@mui/material";
import { MyProductContext } from "../../AppWrapper";
import { FaShield } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";

const ProductDetailsBox = ({ productDetails }) => {
  const context = useContext(MyProductContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedRam, setSelectedRam] = useState();
  const sizes = productDetails?.size || [];
  const productRam = productDetails?.productRam || [];

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="space-y-6 px-4 sm:px-8 w-full max-w-4xl mx-auto">
      {/* Product Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
        {productDetails.name}
      </h1>

      {/* Rating and Brand */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Rating
            name="read-only"
            value={productDetails.rating}
            size="small"
            readOnly
          />
          <span className="text-sm text-gray-500">
            ({productDetails.ratings.length})
          </span>
        </div>
        <span className="text-sm bg-green-100 text-[#35ac75] px-2 py-1 rounded">
          <span className="font-medium">Brand:</span> {productDetails.brand}
        </span>
      </div>

      {/* Pricing */}
      <div className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center flex-wrap gap-2">
        ₹{productDetails.price}
        {productDetails.oldPrice && (
          <span className="text-lg text-gray-500 line-through ml-2">
            ₹{productDetails.oldPrice}
          </span>
        )}
        {productDetails.discount !== 0 && (
          <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
            {productDetails.discount}% OFF
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm">{productDetails.description}</p>
      <p className="text-sm text-black font-medium">
        🚚 Free Shipping (Est. Delivery Time 2-3 Days)
      </p>

      {/* Size Selector */}
      {sizes.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Select Size:
          </h3>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-1 border rounded-md text-sm font-medium w-[64px] sm:w-auto transition-all ${
                  selectedSize === size
                    ? "bg-[#35ac75] text-white border-[#35ac75]"
                    : "border-gray-300 hover:border-[#35ac75] hover:text-[#35ac75]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RAM Selector */}
      {productRam.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Select RAM:
          </h3>
          <div className="flex gap-2 flex-wrap">
            {productRam.map((ram) => (
              <button
                key={ram}
                onClick={() => setSelectedRam(ram)}
                className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                  selectedRam === ram
                    ? "bg-[#35ac75] text-white border-[#35ac75]"
                    : "border-gray-300 hover:border-[#35ac75] hover:text-[#35ac75]"
                }`}
              >
                {ram} GB
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Availability */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Quantity:</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={decrement}
              className="w-10 bg-gray-100 text-lg font-semibold hover:bg-[#35ac75] hover:text-white"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-12 text-center p-1 outline-none border-x border-gray-300"
            />
            <button
              onClick={increment}
              className="w-10 bg-gray-100 text-lg font-semibold hover:bg-[#35ac75] hover:text-white"
            >
              +
            </button>
          </div>
          <span className="text-sm text-[#35ac75]">
            <span className="font-medium">Availability:</span> 15 in stock
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          className="w-full sm:flex-1 !bg-[#35ac75] hover:bg-green-500 !text-white py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2"
          onClick={() => context.addToCart(productDetails)}
        >
          <IoCartOutline className="text-lg" />
          Add to Cart
        </Button>
        <button className="w-full sm:flex-1 bg-white border border-[#35ac75] text-[#35ac75] hover:bg-green-50 py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2">
          <i className="fas fa-bolt"></i> Buy Now
        </button>
        <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition self-center">
          <FaRegHeart className="text-gray-500" />
        </button>
      </div>

      {/* Guarantees */}
      <div className="text-sm text-gray-500 border-t border-gray-200 pt-4 space-y-2">
        <div className="flex items-center gap-2">
          <FaShield className="text-[#35ac75]" />
          <span>1 Year Warranty</span>
        </div>
        <div className="flex items-center gap-2">
          <FaTruck className="text-[#35ac75]" />
          <span>Free shipping on orders over ₹50</span>
        </div>
        <div className="flex items-center gap-2">
          <FaExchangeAlt className="text-[#35ac75]" />
          <span>14-Day Free Returns</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsBox;
