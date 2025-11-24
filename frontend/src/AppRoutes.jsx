import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyProductContext } from "./context/AppContext";

import Home from "./Pages/Home/Home";
import ProductListing from "./Pages/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Cart from "./Pages/Cart";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import VerifyOtp from "./Pages/Auth/VerifyOtp";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/Profile";
import Wishlist from "./Pages/Wishlist";
import Orders from "./components/Orders/Orders";
import Addresspage from "./Pages/AddressPage";
import PrivateRoute from "./PrivateRoute";
import OrderSuccess from "./Pages/OrderSuccess";
import AuthSuccess from "./Pages/Auth/AuthSuccess";

export default function AppRoutes() {
  const { isLogin } = useContext(MyProductContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductListing />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />

      <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={isLogin ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/auth-success" element={<AuthSuccess />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/change-password" element={<ResetPassword />} />

      {/* PRIVATE ROUTES */}
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
  );
}
