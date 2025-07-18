import React, { useState, useEffect, useContext } from "react";
import { usecartlist } from "../context/cartContext";
import { MyProductContext } from "../AppWrapper";

const Checkout = () => {
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("");
  const context = useContext(MyProductContext);
  const {
    cartlist,
    fetchCartlist,
    updateCart,
    removeFromCartlist,
    clearCartlist,
    cartCount,
  } = usecartlist();

  // Sync cartItems with cartlist from context
  const [cartItems, setCartItems] = useState(cartlist);
  useEffect(() => {
    setCartItems(cartlist);
  }, [cartlist]);

  const shippingOptions = {
    standard: 4.99,
    express: 9.99,
    pickup: 0,
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.productId.price || 0) * (item.quantity || 1),
    0
  );
  const shipping = shippingOptions[shippingMethod];
  const tax = subtotal * 0.0725;
  const total = subtotal + shipping + tax;

  const handleCompleteOrder = () => {
    if (!paymentMethod) {
      context.alertBox("info", "Please select a payment method");

      return;
    }
    if (cartItems.length === 0) {
      context.alertBox("info", "Your cart is empty");
      return;
    }
    console.log({
      shippingMethod,
      paymentMethod,
      cartItems,
      total,
    });
    // Call API to create an order here
  };

  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3 ">
            {/* Shipping */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
              <div className="space-y-4">
                {Object.keys(shippingOptions).map((method) => (
                  <label
                    key={method}
                    className={`p-4 border rounded-md cursor-pointer block ₹{
                      shippingMethod === method
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="shipping"
                        value={method}
                        checked={shippingMethod === method}
                        onChange={() => setShippingMethod(method)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm font-medium capitalize">
                        {method} shipping
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {method === "standard"
                        ? "Estimated delivery: 3-5 business days"
                        : method === "express"
                        ? "Estimated delivery: 1-2 business days"
                        : "Pick up your order at our nearest store"}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              <div className="space-y-4 mb-6">
                {["PayPal", "Apple Pay", "Cash on Delivery"].map((method) => (
                  <label
                    key={method}
                    className={`p-4 border rounded-md cursor-pointer flex items-center ₹{
                      paymentMethod === method
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium">{method}</span>
                  </label>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t text-base">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCompleteOrder}
                className="w-full mt-6 bg-[#35ac75] hover:bg-gray-800 text-white py-3 px-4 rounded-md font-medium transition duration-200"
              >
                Complete Order
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 order-first md:order-last">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item._id || item.productId?._id}
                      className="cart-item flex gap-4 py-4 "
                    >
                      <img
                        src={item.productId?.images?.[0]?.url}
                        alt={item.productId?.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium">
                          {item.productId?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        ₹{(item.productId.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Tax</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
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
