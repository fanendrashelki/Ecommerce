import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const token = localStorage.getItem("token");

  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get("/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(res.data.wishlist); // ✅ expects an array of full product objects
    } catch (err) {
      console.error("Failed to load wishlist", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (productId) => {
    try {
      const res = await axiosInstance.post(
        "/wishlist/add",
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setWishlist((prev) => [...prev, res.data.product]); // ✅ add full product object
      await fetchWishlist();
    } catch (err) {
      console.error("Add to wishlist failed", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axiosInstance.delete(`/wishlist/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((item) => item._id !== productId)); // ✅ filter by _id
    } catch (err) {
      console.error("Remove from wishlist failed", err);
    }
  };

  const isWishlisted = (productId) =>
    wishlist.some(
      (item) => item && item._id?.toString() === productId?.toString()
    );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
