import React, { useContext, useEffect, useMemo, useState } from "react";
import Rating from "@mui/material/Rating";
import { IoCartOutline } from "react-icons/io5";
import {
  FaHeart,
  FaRegHeart,
  FaMinus,
  FaPlus,
  FaShield,
} from "react-icons/fa6";
import { FaTruck, FaExchangeAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { MyProductContext } from "../../context/AppContext";
import { useWishlist } from "../../context/WishlistContext";
import { usecartlist } from "../../context/cartContext";

const ProductDetailsBox = ({ productDetails }) => {
  const context = useContext(MyProductContext);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();
  const { cartlist, addToCart, updateCart } = usecartlist();

  // Find if product is in cart
  const cartItem = useMemo(
    () => cartlist.find((item) => item?.productId?._id === productDetails._id),
    [cartlist, productDetails._id]
  );

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRam, setSelectedRam] = useState("");

  const sizes = productDetails?.size || [];
  const productRam = productDetails?.productRam || [];

  // Sync selected size/RAM with cart item or reset if not in cart
  useEffect(() => {
    if (cartItem) {
      setSelectedSize(cartItem.selectedSize || "");
      setSelectedRam(cartItem.selectedRam || "");
    } else {
      setSelectedSize("");
      setSelectedRam("");
    }
  }, [cartItem, productDetails._id]);

  const liked = useMemo(
    () => isWishlisted(productDetails._id),
    [productDetails._id, isWishlisted]
  );

  const toggleWishlist = async () => {
    if (!context.isLogin) {
      context.alertBox("error", "You are not logged in. Please login first.");
      return;
    }

    try {
      if (liked) {
        await removeFromWishlist(productDetails._id);
        context.alertBox("success", "Removed from wishlist");
      } else {
        await addToWishlist(productDetails._id);
        context.alertBox("success", "Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist toggle failed:", error);
      context.alertBox("error", "Something went wrong");
    }
  };

  const handleCart = async (productId, q = 1) => {
    const hasSize = sizes.length > 0;
    const hasRam = productRam.length > 0;

    if (!context.isLogin) {
      context.alertBox("error", "You are not logged in. Please login first.");
      return;
    }

    if ((hasSize && !selectedSize) || (hasRam && !selectedRam)) {
      context.alertBox(
        "error",
        `Please select ${hasSize && !selectedSize ? "Size" : ""}${hasSize && hasRam ? " and " : ""
        }${hasRam && !selectedRam ? "RAM" : ""} to continue.`
      );
      return;
    }

    try {
      if (cartItem) {
        // Update only if size/RAM changed
        if (
          cartItem.selectedSize !== selectedSize ||
          cartItem.selectedRam !== selectedRam
        ) {
          await updateCart(
            cartItem._id,
            cartItem.quantity,
            context?.User?._id,
            selectedSize,
            selectedRam
          );
          context.alertBox("success", "Cart updated with new selection");
        } else {
          context.alertBox("info", "Product already in cart");
        }
      } else {
        await addToCart(
          productId,
          q,
          context?.User?._id,
          selectedSize,
          selectedRam
        );
        context.alertBox("success", "Added to cart");
      }
    } catch (error) {
      console.error("Cart operation failed:", error);
      context.alertBox("error", "Something went wrong");
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-8 w-full max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
        {productDetails.name}
      </h1>

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

      <p className="text-gray-600 text-sm">{productDetails.description}</p>
      <p className="text-sm text-black font-medium">
        🚚 Free Shipping (Est. Delivery Time 2-3 Days)
      </p>

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
                className={`px-4 py-1 border rounded-md text-sm font-medium w-[64px] sm:w-auto transition-all ${selectedSize === size
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
                className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${selectedRam === ram
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

      {cartItem && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Quantity:
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <div className="w-full flex items-center justify-evenly">
                <Button
                  className="w-8 bg-gray-100 font-semibold hover:bg-[#35ac75] hover:text-white"
                  onClick={() =>
                    updateCart(
                      cartItem._id,
                      cartItem.quantity - 1,
                      context?.User?._id,
                      selectedSize,
                      selectedRam
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
                      context?.User?._id,
                      selectedSize,
                      selectedRam
                    )
                  }
                >
                  <FaPlus className="text-[#35ac75]" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          className="w-full sm:flex-1 !bg-[#35ac75] hover:bg-green-500 !text-white py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2"
          onClick={() => handleCart(productDetails._id)}
        >
          <IoCartOutline className="text-lg" />
          {cartItem ? "Update Cart" : "Add to Cart"}
        </Button>

        <button className="w-full sm:flex-1 bg-white border border-[#35ac75] text-[#35ac75] hover:bg-green-50 py-3 px-6 rounded-md font-medium flex items-center justify-center gap-2">
          <i className="fas fa-bolt"></i> Buy Now
        </button>

        <button
          onClick={toggleWishlist}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition self-center"
        >
          {liked ? (
            <FaHeart className="text-[20px] !text-red-500 transition-transform duration-150 active:scale-125" />
          ) : (
            <FaRegHeart className="text-[20px] transition-transform duration-150 active:scale-125" />
          )}
        </button>
      </div>

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
