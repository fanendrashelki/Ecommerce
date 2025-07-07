import React, { useContext } from "react";
import "../ProductItem/style.css";
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
    <div className="productItem shadow-lg rounded-md overflow-hidden border border-[rgba(0,0,0,0.1)] transition-all duration-300 bg-white">
      {/* Image Section */}
      <div className="group imgWrapper w-full relative overflow-hidden">
        <Link to={`/product-details/${product._id}`}>
          <div className="relative overflow-hidden aspect-[1/1]">
            <img
              src={product?.images?.[0]?.url || ""}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product?.images?.[1]?.url && (
              <img
                src={product.images[1].url}
                alt="Hover"
                className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              />
            )}
          </div>
        </Link>

        {/* Discount Badge */}
        {product.discount !== 0 && (
          <span className="discount absolute top-2 left-2 z-10 bg-[#35ac75] text-white text-xs font-semibold px-2 py-1 rounded">
            {product.discount}%
          </span>
        )}

        {/* Action Buttons */}
        <div className="actions absolute top-[-200px] right-2 z-10 flex flex-col items-center gap-2 w-[50px] transition-all duration-700 group-hover:top-4 opacity-0 group-hover:opacity-100">
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white"
            onClick={() => context.setOpenProductDetails(true)}
          >
            <MdZoomOutMap className="text-[18px]" />
          </Button>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white">
            <FaRegHeart className="text-[18px]" />
          </Button>
          <Button className="!w-[35px] !h-[35px] !min-w-[35px] text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white">
            <IoGitCompareOutline className="text-[18px]" />
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="info p-3 sm:p-4">
        <h6 className="text-xs sm:text-sm text-gray-500 font-medium truncate">
          <Link to="/" className="hover:text-[#35ac75]">
            {product.brand}
          </Link>
        </h6>
        <h3 className="text-sm sm:text-base font-semibold mt-1 text-black line-clamp-2 min-h-[40px]">
          <Link to="/" className="hover:text-[#35ac75]">
            {product.name}
          </Link>
        </h3>
        <Rating
          name="size-medium"
          defaultValue={product.rating}
          size="small"
          readOnly
          className="my-2"
        />
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="line-through text-gray-500 text-sm font-medium">
            {product.oldPrice}
          </span>
          <span className="text-[#35ac75] text-base font-bold">
            {product.price}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          fullWidth
          variant="contained"
          className="!mt-3 !bg-[#35ac75] hover:!bg-[#2e9b66] !text-white !rounded-md !py-2 !text-sm sm:!text-base"
          onClick={() => context.addToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
