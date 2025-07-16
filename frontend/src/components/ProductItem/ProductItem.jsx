import React, { useContext, useState, useMemo } from "react";
import "../ProductItem/style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button, Tooltip } from "@mui/material";
import { FaRegHeart, FaPlus, FaMinus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { MdZoomOutMap } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { MyProductContext } from "../../AppWrapper";
import ProductDetailsDialog from "./ProductDetailsDialog";
import { useWishlist } from "../../context/WishlistContext";
import { usecartlist } from "../../context/cartContext";

const ProductItem = ({ product }) => {
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [openvariant, setOpenvariant] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRam, setSelectedRam] = useState("");

  const sizes = product?.size || [];
  const productRam = product?.productRam || [];

  const context = useContext(MyProductContext);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { cartlist, addToCart, updateCart } = usecartlist();

  const cartItem = useMemo(
    () => cartlist.find((item) => item?.productId?._id === product._id),
    [cartlist, product._id]
  );

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

  const handleCart = async (productId, q = 1) => {
    const hasSize = sizes.length > 0;
    const hasRam = productRam.length > 0;
    if (!context.isLogin) {
      context.alertBox("error", "You are not logged in. Please login first.");
      return;
    }
    // If variants required but not selected
    if ((hasSize && !selectedSize) || (hasRam && !selectedRam)) {
      setOpenvariant(true);
      context.alertBox(
        "error",
        `Please select product ${hasSize && !selectedSize ? "size" : ""}${
          hasSize && hasRam ? " and " : ""
        }${hasRam && !selectedRam ? "RAM" : ""} before adding to cart.`
      );
      return;
    }

    try {
      await addToCart(
        productId,
        q,
        context?.User?._id,
        selectedSize,
        selectedRam
      );
      context.alertBox("success", "Added to cart");
      setOpenvariant(false);
    } catch (error) {
      console.error("Add to cart failed:", error);
      context.alertBox("error", "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col h-full shadow-lg rounded-lg border border-gray-200 transition-all duration-300 bg-white">
        {/* Image Section */}
        <div className="group w-full relative overflow-hidden">
          <Link to={`/product-details/${product._id}`}>
            <div className="imgWrapper w-full overflow-hidden rounded-t-lg relative">
              <div className="relative h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden">
                <img
                  src={product?.images?.[0]?.url || "/default-product.jpg"}
                  alt={product.name || "Product Image"}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {product?.images?.[1]?.url && (
                  <img
                    src={product.images[1].url}
                    alt="Hover Preview"
                    className="w-full h-full object-cover object-top absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                )}
              </div>
            </div>
          </Link>

          {product.discount > 0 && (
            <span className="absolute top-2 left-2 z-10 bg-[#35ac75] text-white text-xs font-semibold px-2 py-1 rounded">
              {product.discount}%
            </span>
          )}

          <div className="absolute top-2 right-2 z-10 flex flex-col items-center gap-2 w-[50px] md:top-[-200px] md:group-hover:top-4 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700">
            <Button
              aria-label="Quick view"
              className="!w-[35px] !h-[35px] !min-w-[35px] shadow !text-black !rounded-full !bg-white hover:!bg-[#35ac75] hover:!text-white"
              onClick={() => setOpenProductDetails(true)}
            >
              <MdZoomOutMap className="text-[18px]" />
            </Button>

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

          {openvariant && (
            <div className="absolute w-full rounded-t-lg h-full bg-[rgba(0,0,0,0.5)] top-0 z-100 flex flex-col gap-3 p-4 justify-center">
              {/* Size Selector */}
              {sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Select Size:
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-1 border rounded-md text-sm font-medium w-[64px] sm:w-auto transition-all ${
                          selectedSize === size
                            ? "bg-white text-[#35ac75] border-white"
                            : "text-white border-white hover:bg-white hover:text-[#35ac75]"
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
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Select RAM:
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {productRam.map((ram) => (
                      <button
                        key={ram}
                        onClick={() => setSelectedRam(ram)}
                        className={`px-4 py-1 border rounded-md text-sm font-medium w-[64px] sm:w-auto transition-all ${
                          selectedRam === ram
                            ? "bg-white text-[#35ac75] border-white"
                            : "text-white border-white hover:bg-white hover:text-[#35ac75]"
                        }`}
                      >
                        {ram} GB
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* <Button
                onClick={() => handleCart(product._id)}
                className="!bg-white !text-[#35ac75] mt-4 hover:!bg-[#35ac75] hover:!text-white !rounded-md"
              >
                Confirm and Add to Cart
              </Button> */}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-2 sm:p-4 flex flex-col flex-grow">
          <h6 className="text-xs sm:text-sm text-gray-500 font-medium truncate">
            <Link
              to={`/product-details/${product._id}`}
              className="hover:text-[#35ac75]"
            >
              {product.brand}
            </Link>
          </h6>

          <h3 className="text-sm sm:text-base font-semibold mt-1 min-h-[40px] text-black line-clamp-2">
            <Link
              to={`/product-details/${product._id}`}
              className="hover:text-[#35ac75]"
            >
              {product._id}
            </Link>
          </h3>

          <Rating
            name="product-rating"
            defaultValue={product.rating}
            size="small"
            readOnly
            className="my-2"
          />

          <div className="flex flex-wrap items-center gap-2 mt-1 mb-3">
            <span className="line-through text-xs sm:text-sm text-gray-500 font-medium">
              ₹{product.oldPrice}
            </span>
            <span className="text-[#35ac75] text-sm sm:text-base font-bold">
              ₹{product.price}
            </span>
          </div>

          {cartItem ? (
            <div className=" w-full flex items-center justify-evenly border border-gray-300 rounded-md overflow-hidden">
              <Button
                className="w-8 bg-gray-100 font-semibold hover:bg-[#35ac75] hover:text-white"
                onClick={() =>
                  updateCart(
                    cartItem._id,
                    cartItem.quantity - 1,
                    context?.User?._id
                  )
                }
              >
                <FaMinus className="text-[#35ac75]" />
              </Button>
              <input
                type="number"
                value={cartItem.quantity}
                readOnly
                className="w-10 text-center font-bold p-1 outline-none border-x border-gray-300"
              />
              <Button
                className="w-8 bg-gray-100 font-semibold hover:bg-[#35ac75] hover:text-white"
                onClick={() =>
                  updateCart(
                    cartItem._id,
                    cartItem.quantity + 1,
                    context?.User?._id
                  )
                }
              >
                <FaPlus className="text-[#35ac75]" />
              </Button>
            </div>
          ) : (
            <Button
              fullWidth
              variant="contained"
              className="!bg-[#35ac75] hover:!bg-[#2e9b66] !text-white !rounded-md !py-1 !text-[14px] sm:text-sm !capitalize mt-3 gap-2"
              aria-label="Add to Cart"
              onClick={() => handleCart(product._id)}
            >
              <IoCartOutline className="text-lg" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>

      <ProductDetailsDialog
        open={openProductDetails}
        product={product}
        onClose={() => setOpenProductDetails(false)}
      />
    </>
  );
};

export default ProductItem;
