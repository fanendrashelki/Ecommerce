import React, { useState, useMemo, useContext, useEffect } from "react";
import { usecartlist } from "../context/cartContext";
import { MyProductContext } from "../AppWrapper";
import { GrLocationPin } from "react-icons/gr";
import { Button } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const PAYMENT_METHODS = ["PayPal", "Apple Pay", "Cash on Delivery"];

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { cartlist } = usecartlist();
  const context = useContext(MyProductContext);

  // Compute totals
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotal = cartlist.reduce(
      (sum, item) =>
        sum + (item?.productId?.price || 0) * (item?.quantity || 1),
      0
    );
    const shipping = subtotal > 1000 ? 0 : 100;
    const tax = subtotal * 0.0725;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  }, [cartlist]);

  const handleCompleteOrder = async () => {
    if (!paymentMethod) {
      return context.alertBox("info", "Please select a payment method");
    }
    if (!selectedAddress) {
      return context.alertBox("info", "Please select an address");
    }
    if (cartlist.length === 0) {
      return context.alertBox("info", "Your cart is empty");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "/orders",
        {
          addressId: selectedAddress._id,
          paymentMethod,
          items: cartlist,
          total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      context.alertBox("success", "Order completed successfully!");
    } catch (err) {
      context.alertBox("error", "Failed to complete order");
    } finally {
      setLoading(false);
    }
  };
  console.log(context.User?._id);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      let res; // use let instead of const

      if (context.User?._id) {
        res = await axiosInstance.get(`addresses/user/${context.User._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(res.data || []);

        if (res.data?.length > 0) {
          setSelectedAddress(res.data[0]); // auto-select first address
        }
      }
    } catch (err) {
      console.error(
        "Failed to fetch addresses:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [context.User?._id]); // rerun when user changes

  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            {/* Shipping */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-6">Billing Address</h2>
                <Button
                  className="gap-1 !bg-[#35ac75] !capitalize !text-white"
                  onClick={() => context.setOpenAddress(true)}
                >
                  <GrLocationPin /> Add Address
                </Button>
              </div>

              <div className="space-y-4 mt-4">
                {addresses.length === 0 ? (
                  <p className="text-gray-500">
                    No saved addresses. Please add one.
                  </p>
                ) : (
                  addresses.map((addr) => (
                    <label
                      key={addr._id}
                      className={`p-4 border rounded-md cursor-pointer block transition duration-200 ${
                        selectedAddress?._id === addr._id
                          ? "border-[#35ac75] bg-green-50"
                          : "border-gray-300 hover:border-green-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="address"
                          value={addr._id}
                          checked={selectedAddress?._id === addr._id}
                          onChange={() => setSelectedAddress(addr)}
                          className="h-4 w-4 text-[#35ac75] focus:ring-[#35ac75] border-gray-300"
                        />
                        <span className="ml-2 text-sm font-medium">
                          {addr.address_line}, {addr.city}, {addr.state} -{" "}
                          {addr.zip}
                        </span>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              <div className="space-y-4 mb-6">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method}
                    className={`p-4 border rounded-md cursor-pointer flex items-center transition duration-200 ${
                      paymentMethod === method
                        ? "border-[#35ac75] bg-green-50"
                        : "border-gray-300 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="h-4 w-4 text-[#35ac75] focus:ring-[#35ac75] border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium">{method}</span>
                  </label>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-gray-200 pt-6">
                {[
                  { label: "Subtotal", value: subtotal },
                  { label: "Shipping", value: shipping },
                  { label: "Tax", value: tax },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between mb-2 text-sm text-gray-600"
                  >
                    <span>{label}</span>
                    <span className="font-medium">₹{value.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-4 pt-4 border-t text-base">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCompleteOrder}
                disabled={loading}
                className={`w-full mt-6 ${
                  loading ? "bg-gray-400" : "bg-[#35ac75] hover:bg-green-600"
                } text-white py-3 px-4 rounded-md font-medium transition duration-200`}
              >
                {loading ? "Processing..." : "Complete Order"}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 order-first md:order-last">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              {cartlist.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4 mb-6 sha">
                  {cartlist.map((item) => (
                    <div
                      key={item._id || item.productId?._id}
                      className="flex gap-4 py-4 shadow px-3"
                    >
                      <img
                        src={item.productId?.images?.[0]?.url}
                        alt={item.productId?.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium line-clamp-1">
                          {item.productId?.name}
                        </h3>
                        <p className="text-sm text-gray-500 pt-2">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm !font-[600] text-gray-500 pt-2">
                          ₹
                          {(
                            (item.productId?.price || 0) * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-6">
                {[
                  { label: "Subtotal", value: subtotal },
                  { label: "Shipping", value: shipping },
                  { label: "Tax", value: tax },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between mb-2 text-sm text-gray-600"
                  >
                    <span>{label}</span>
                    <span className="font-medium">₹{value.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-4 pt-4 border-t text-base">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
