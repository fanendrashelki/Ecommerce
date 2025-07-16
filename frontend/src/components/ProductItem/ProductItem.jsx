import React, { useContext, useState, useMemo } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button, Tooltip } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdZoomOutMap } from "react-icons/md";
import { MyProductContext } from "../../AppWrapper";
import ProductDetailsDialog from "./ProductDetailsDialog";
import { useWishlist } from "../../context/WishlistContext";

const ProductItem = ({ product }) => {
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const context = useContext(MyProductContext);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();

  const liked = useMemo(
    () => isWishlisted(product._id),
    [product._id, isWishlisted]
  );

  const toggleWishlist = async () => {
    if (!context.isLogin) {
      context.alertBox("error", "You are not logged in. Please login first.");
      return;
    }
    try {
      if (liked) {
        await removeFromWishlist(product._id);
        context.alertBox("success", "Removed from wishlist");
      } else {
        await addToWishlist(product._id);
        context.alertBox("success", "Added to wishlist");
      }
    } catch (error) {
      context.alertBox("error", "Something went wrong");
      console.error("Wishlist toggle failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full shadow-lg rounded-lg border border-gray-200 transition-all duration-300 bg-white">
        {/* Image Section */}
        <div className="group w-full relative overflow-hidden">
          <Link to={`/product-details/${product._id}`}>
            <div className="imgWrapper w-full overflow-hidden rounded-md rounded-bl-none rounded-br-none relative">
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={product?.images?.[0]?.url || "/default-product.jpg"}
                  alt={product.name || "Product Image"}
                  className="w-full h-full object-cover object-top rounded-t-lg transition-transform duration-500 group-hover:scale-105"
                />
                {product?.images?.[1]?.url && (
                  <img
                    src={product.images[1].url}
                    alt="Hover Preview"
                    className="w-full h-full object-cover object-top rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                )}
              </div>
            </div>
          </Link>

          {/* Discount Badge */}
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 z-10 bg-[#35ac75] text-white text-xs font-semibold px-2 py-1 rounded">
              {product.discount}%
            </span>
          )}

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 z-10 flex flex-col items-center gap-2 w-[50px] md:top-[-200px] md:group-hover:top-4 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700">
            {/* View Product - Desktop only */}
            <Button
              aria-label="Quick view"
              className="!hidden md:!flex !w-[35px] !h-[35px] !min-w-[35px] shadow !text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white"
              onClick={() => setOpenProductDetails(true)}
            >
              <MdZoomOutMap className="text-[18px]" />
            </Button>

            {/* Wishlist Toggle */}
            <Tooltip title={liked ? "Remove from Wishlist" : "Add to Wishlist"}>
              <Button
                onClick={toggleWishlist}
                aria-label={liked ? "Remove from Wishlist" : "Add to Wishlist"}
                className="!w-[35px] !h-[35px] !min-w-[35px] shadow !text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white"
              >
                {liked ? (
                  <FaHeart className="text-[20px] text-red-500" />
                ) : (
                  <FaRegHeart className="text-[20px]" />
                )}
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          {/* Brand */}
          <h6 className="text-[11px] sm:text-sm text-gray-500 font-medium truncate">
            <Link
              to={`/product-details/${product._id}`}
              className="hover:text-[#35ac75]"
            >
              {product.brand}
            </Link>
          </h6>

          {/* Name */}
          <h3 className="text-[13px] sm:text-sm font-semibold mt-1 min-h-[40px] text-black line-clamp-2">
            <Link
              to={`/product-details/${product._id}`}
              className="hover:text-[#35ac75]"
            >
              {product.name}
            </Link>
          </h3>

          {/* Rating */}
          <Rating
            name="product-rating"
            defaultValue={product.rating}
            size="small"
            readOnly
            className="my-2"
          />

          {/* Price */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="line-through text-[12px] sm:text-sm text-gray-500 font-medium">
              ₹{product.oldPrice}
            </span>
            <span className="text-[#35ac75] text-[14px] sm:text-base font-bold">
              ₹{product.price}
            </span>
          </div>

          {/* Add to Cart */}
          <Button
            fullWidth
            variant="contained"
            className="!bg-[#35ac75] hover:!bg-[#2e9b66] !text-white !rounded-md !py-2 text-[11px] sm:text-sm !capitalize mt-3"
            aria-label="Add to Cart"
            onClick={() => context.addToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Quick View Modal */}
      <ProductDetailsDialog
        open={openProductDetails}
        product={product}
        onClose={() => setOpenProductDetails(false)}
      />
    </>
  );
};

export default ProductItem;
