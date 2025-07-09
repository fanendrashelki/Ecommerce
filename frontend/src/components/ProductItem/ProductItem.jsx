import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { MyProductContext } from "../../AppWrapper";

const ProductItem = ({ product }) => {
  const context = useContext(MyProductContext);

  return (
    <div className="productItem flex flex-col shadow-md rounded-md overflow-hidden border border-gray-200 bg-white transition-all duration-300">
      {/* Image Section */}
      <div className="group relative w-full overflow-hidden">
        <Link to={`/product-details/${product._id}`}>
          <div className="relative w-full aspect-[1/1]">
            <img
              src={product?.images?.[0]?.url || ""}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product?.images?.[1]?.url && (
              <img
                src={product.images[1].url}
                alt="Hover"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            )}
          </div>
        </Link>

        {/* Discount Badge */}
        {product.discount !== 0 && (
          <span className="absolute top-2 left-2 bg-[#35ac75] text-white text-[10px] sm:text-xs font-semibold px-2 py-1 rounded z-10">
            {product.discount}%
          </span>
        )}

        {/* Action Buttons */}
        <div className="absolute top-[-200px] right-2 z-10 flex flex-col items-center gap-2 w-[42px] transition-all duration-700 group-hover:top-4 opacity-0 group-hover:opacity-100">
          <Button
            className="!w-[32px] !h-[32px] !min-w-[32px] text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white"
            onClick={() => context.setOpenProductDetails(true)}
          >
            <MdZoomOutMap className="text-[16px]" />
          </Button>
          <Button className="!w-[32px] !h-[32px] !min-w-[32px] text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white">
            <FaRegHeart className="text-[16px]" />
          </Button>
          <Button className="!w-[32px] !h-[32px] !min-w-[32px] text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white">
            <IoGitCompareOutline className="text-[16px]" />
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-2 sm:p-3 flex flex-col justify-between flex-grow">
        <h6 className="text-[11px] sm:text-xs text-gray-500 font-medium truncate">
          <Link to="/" className="hover:text-[#35ac75]">
            {product.brand}
          </Link>
        </h6>

        <h3 className="text-sm sm:text-base font-semibold mt-1 text-black line-clamp-2 min-h-[38px] sm:min-h-[40px] leading-tight">
          <Link to="/" className="hover:text-[#35ac75]">
            {product.name}
          </Link>
        </h3>

        <Rating
          name="size-small"
          defaultValue={product.rating}
          size="small"
          readOnly
          className="my-1 sm:my-2"
        />

        <div className="flex items-center flex-wrap gap-1 sm:gap-2 mt-1">
          <span className="line-through text-gray-400 text-xs sm:text-sm font-medium">
            ₹{product.oldPrice}
          </span>
          <span className="text-[#35ac75] text-sm sm:text-base font-bold">
            ₹{product.price}
          </span>
        </div>

        <Button
          fullWidth
          variant="contained"
          className="!mt-2 sm:!mt-3 !bg-[#35ac75] hover:!bg-[#2e9b66] !text-white !rounded-md !py-1.5 sm:!py-2 !text-xs sm:!text-sm"
          onClick={() => context.addToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
