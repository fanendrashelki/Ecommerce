import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const CartlistContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartlist, setCartlist] = useState([]);
  const token = localStorage.getItem("token");
  const fetchCartlist = async () => {
    try {
      const res = await axiosInstance.get("/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartlist(res.data.cart);
    } catch (err) {
      console.error("Failed to load wishlist", err);
    }
  };

  useEffect(() => {
    fetchCartlist();
  }, []);

  const addToCart = async (productId, quantity, userId) => {
    console.log(productId);
    console.log(quantity);
    console.log(userId);

    try {
      const res = await axiosInstance.post(
        "/cart/add",
        { productId, quantity, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCartlist((prev) => [...prev, res.data.cart]);
      await fetchCartlist();
    } catch (err) {
      console.error("Add to Cart failed", err);
    }
  };

  const removeFromCartlist = async (productId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartlist((prev) => prev.filter((item) => item._id !== productId)); // ✅ filter by _id
    } catch (err) {
      console.error("Remove from wishlist failed", err);
    }
  };

  const updateCart = async (productId, quantity, userId) => {
    console.log(productId);
    console.log(quantity);
    console.log(userId);
    try {
      if (quantity <= 0) {
        await removeFromCartlist(productId);
        return;
      }

      const res = await axiosInstance.put(
        "/cart/update",
        { cartItemId: productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("update", res);

      await fetchCartlist();
    } catch (err) {
      console.error("Update cart failed", err);
    }
  };

  const isCartlisted = (productId) =>
    cartlist.some(
      (item) => item && item._id?.toString() === productId?.toString()
    );
  const clearCartlist = () => {
    setCartlist([]);
  };

  return (
    <CartlistContext.Provider
      value={{
        cartlist,
        addToCart,
        removeFromCartlist,
        updateCart,
        clearCartlist,
        isCartlisted,
      }}
    >
      {children}
    </CartlistContext.Provider>
  );
};
export const usecartlist = () => useContext(CartlistContext);
