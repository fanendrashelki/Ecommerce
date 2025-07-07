import React, { useContext, useState } from "react";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MyProductContext } from "../../AppWrapper";

const ProductDetailsBox = ({ productDetails }) => {
  const context = useContext(MyProductContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const sizes = productDetails?.size || [];

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-800">
        {productDetails.name}
      </h1>

      <div className="flex items-center gap-6">
        <span className="text-sm text-gray-500">
          Brand:
          <span className="ml-1 text-sm font-semibold text-gray-700">
            {productDetails.brand}
          </span>
        </span>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Rating name="read-only" value={4} size="small" readOnly />
          <span className="text-sm text-gray-600">Reviews (4)</span>
        </div>
      </div>
      <div className="flex items-center gap-4 py-1">
        <span className=" line-through text-gray-500 text-[20px] font-[500]">
          {productDetails.oldPrice}
        </span>
        <span className="ml-1 text-sm  text-[#35ac75] price text-primary text-[20px]  font-[600]">
          {productDetails.price}
        </span>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="text-[14px] text-gray-600 ">
            Available In Stock:
          </span>
          <span className="text-sm  text-green-600 text-[14px] font-bold">
            {productDetails.countInStore}
          </span>
        </div>
      </div>
      <p className="mt-3 pr-10 mb-3 text-[14px] text-gray-500">
        {productDetails.description}
      </p>
      <p class="text-[14px] mt-3 mb-2 text-[#000]">
        Free Shipping (Est. Delivery Time 2-3 Days)
      </p>
      {sizes && sizes?.length > 0 && (
        <div className="mt-3 mb-3 ">
          <h3 className="text-[14px] font-semibold mb-2">Select Size :</h3>
          <div className="flex gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-1 border rounded-md text-sm font-medium ${
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
      <div className="flex items-center gap-4 mt-4">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button
            onClick={decrement}
            className="px-3 py-1 bg-gray-100 hover:bg-[#35ac75] hover:text-white text-lg font-semibold"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="w-12 text-center p-1 outline-none"
          />
          <button
            onClick={increment}
            className="px-3 py-1 bg-gray-100 hover:bg-[#35ac75] hover:text-white text-lg font-semibold"
          >
            +
          </button>
        </div>

        <Button
          className="btn-org flex items-center gap-2 px-4 py-2 rounded-md"
          onClick={() => context.addToCart(productDetails)}
        >
          <IoCartOutline className="text-lg" />
          Add to Cart
        </Button>
      </div>
      <div className="flex items-center gap-6 mt-4">
        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="flex items-center gap-2 !text-gray-700 hover:text-orange-500 transition-colors duration-200 !no-underline"
        >
          <FaRegHeart className="text-lg !text-gray-700" />
          <span className="text-sm font-medium no-underline">
            Add to Wishlist
          </span>
        </Link>

        {/* Compare */}
        <Link
          to="/compare"
          className="flex items-center gap-2 !text-gray-700 hover:text-orange-500 transition-colors duration-200 !no-underline"
        >
          <IoGitCompareOutline className="text-lg !text-gray-700" />
          <span className="text-sm font-medium ">Add to Compare</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailsBox;
