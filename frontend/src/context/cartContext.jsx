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

  const addToCart = async (
    productId,
    quantity,
    userId,
    selectedSize,
    selectedRam
  ) => {
    try {
      const res = await axiosInstance.post(
        "/cart/add",
        { productId, quantity, userId, selectedSize, selectedRam },
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
    console.log(productId);

    try {
      await axiosInstance.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.error("Remove from wishlist failed", err);
    }
  };

  const updateCart = async (
    productId,
    quantity,
    userId,
    selectedSize,
    selectedRam
  ) => {
    try {
      if (quantity <= 0) {
        await removeFromCartlist(productId);
        return;
      }

      const res = await axiosInstance.put(
        "/cart/update",
        { cartItemId: productId, quantity, selectedSize, selectedRam },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
        fetchCartlist,
        cartlist,
        addToCart,
        removeFromCartlist,
        updateCart,
        clearCartlist,
        isCartlisted,
        cartCount: cartlist.length,
      }}
    >
      {children}
    </CartlistContext.Provider>
  );
};
export const usecartlist = () => useContext(CartlistContext);
