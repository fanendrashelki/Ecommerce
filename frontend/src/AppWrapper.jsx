import { useState, createContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./Pages/Home/Home";
import ProductListing from "./Pages/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

import Cart from "./Pages/Cart";

import CartDrawer from "./components/Cart/CartDrawer";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import VerifyOtp from "./Pages/Auth/VerifyOtp";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/Profile";
import Wishlist from "./Pages/Wishlist";
import Orders from "./components/Orders/Orders";
import Addresspage from "./Pages/AddressPage";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "./utils/axiosInstance";
import Pageloader from "./utils/Pageloader";
import PrivateRoute from "./PrivateRoute";
import MobileNav from "./components/Header/Navigation/MobileNav";
import ScrollToTop from "./utils/ScrollToTop";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/cartContext";
import ProfileImageProvider from "./context/ProfileImageContext";
import Address from "./components/address/Address";
import OrderSuccess from "./Pages/OrderSuccess";

const alertBox = (type, msg) => {
  if (type === "success") {
    toast.success(msg);
  } else if (type === "error") {
    toast.error(msg);
  } else {
    toast(msg);
  }
};

export const MyProductContext = createContext();

function AppWrapper() {
  const [openCart, setOpenCart] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [User, setUser] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [category, setCategories] = useState([]);
  const [pageloader, setPageLoader] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (
        token &&
        token !== "undefined" &&
        token !== "null" &&
        token.trim() !== ""
      ) {
        try {
          const res = await axiosInstance.get("/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(res?.data?.user);
          setLogin(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLogin(false);
        }
      } else {
        setLogin(false);
      }
    };

    checkAuth();
  }, [isLogin]);

  const contextValues = {
    setOpenCart,
    setOpenAddress,
    openAddress,
    alertBox,
    setUser,
    setLogin,
    isLogin,
    User,
    setPageLoader,
    category,
  };
  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res?.data?.data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <MyProductContext.Provider value={contextValues}>
      <WishlistProvider>
        <CartProvider>
          <ProfileImageProvider>
            <Header />

            <main>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductListing />} />

                <Route
                  path="/product-details/:id"
                  element={<ProductDetails />}
                />
                <Route
                  path="/login"
                  element={isLogin ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/register"
                  element={isLogin ? <Navigate to="/" /> : <Register />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />
                <Route path="/change-password" element={<ResetPassword />} />
                {/* Protected Routes */}
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <PrivateRoute>
                      <Wishlist />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/order"
                  element={
                    <PrivateRoute>
                      <Orders />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/order-success/:id"
                  element={
                    <PrivateRoute>
                      <OrderSuccess />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/address"
                  element={
                    <PrivateRoute>
                      <Addresspage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <MobileNav />
            <Footer />
            <Toaster />
            {/* cart list fro checkout */}
            <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
            <Address open={openAddress} onClose={() => setOpenAddress(false)} />
            <Pageloader open={pageloader} />
          </ProfileImageProvider>
        </CartProvider>
      </WishlistProvider>
    </MyProductContext.Provider>
  );
}

export default AppWrapper;
