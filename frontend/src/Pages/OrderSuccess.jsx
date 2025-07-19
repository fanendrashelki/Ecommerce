import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { CiCircleCheck } from "react-icons/ci";
const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(order);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(`/orders/orderId/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data.order);
      } catch (err) {
        console.error(
          "Failed to fetch order:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading your order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg mb-4">Order not found!</p>
        <Link
          to="/"
          className="bg-[#35ac75] text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div class="container flex flex-col">
      {/* <!-- Main Content --> */}
      <div class="flex-grow py-12 px-4 sm:px-6 ">
        <div class=" mx-auto">
          <div class="bg-white rounded-xl shadow-sm p-8 mb-8 text-center">
            <div class="checkmark-circle w-[80px] h-[80px] rounded-full bg-green-100 mx-auto flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-3">
              Thank you for your order!
            </h1>
            <p class="text-gray-600 mb-6 max-w-lg mx-auto">
              Your order has been received and is being processed. We've sent a
              confirmation email to your registered email address.
            </p>

            <div class="flex justify-center space-x-4">
              <a
                href="/"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-600 bg-indigo-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Continue Shopping
              </a>
              <a
                href="/order"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View My Orders
              </a>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-8 mb-8 order-summary">
            <h2 class="text-lg font-medium text-gray-900 mb-6">
              Order Summary
            </h2>

            <div class="border-b border-gray-200 pb-6 mb-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 class="text-sm font-medium text-gray-500">
                    Order Number
                  </h3>
                  <p class="mt-1 text-sm text-gray-900">{order.orderId}</p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">Date</h3>
                  <p class="mt-1 text-sm text-gray-900">
                    {order?.orderDate
                      ? new Date(order.orderDate).toLocaleDateString("en-GB")
                      : ""}
                  </p>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-500">
                    Payment Method
                  </h3>
                  <p class="mt-1 text-sm text-gray-900">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            <h3 class="text-sm font-medium text-gray-500 mb-4">Items</h3>
            <div class="space-y-6">
              {/* <!-- Product  --> */}

              {order.items.map((item) => (
                <div key={item} class="flex items-start">
                  <div class="flex-shrink-0">
                    <img
                      src={item.image}
                      alt="Modern wireless headphones with noise cancellation and silver accents"
                      class="w-20 h-20 rounded-md object-cover product-image"
                    />
                  </div>
                  <div class="ml-4 flex-grow">
                    <h4 class="text-sm font-medium text-gray-900">
                      {item.name}
                    </h4>

                    <div class="flex justify-between items-center mt-2">
                      <p class="text-sm text-gray-700">
                        Quantity : {item.quantity}
                      </p>
                      <p class="text-sm font-medium text-gray-900">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div class="border-t border-gray-200 mt-8 pt-8">
              <div class="space-y-4">
                <div class="flex justify-between">
                  <p class="text-sm text-gray-500">Subtotal</p>
                  <p class="text-sm text-gray-900">{order.subTotalAmt}</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-sm text-gray-500">Shipping</p>
                  <p class="text-sm text-gray-900">
                    {order.Shippingcharge > 0 ? order.Shippingcharge : "Free"}
                  </p>
                </div>
                <div class="flex justify-between">
                  <p class="text-sm text-gray-500">Tax</p>
                  <p class="text-sm text-gray-900">{order.tax.toFixed(2)}</p>
                </div>
                <div class="flex justify-between text-base font-medium text-gray-900 border-t border-gray-200 pt-4 mt-4">
                  <p>Total</p>
                  <p>{order.totalAmt}</p>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Delivery Info --> */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">
                Billing Address
              </h2>
              <address className="not-italic text-sm text-gray-600 space-y-1">
                <p className="pb-1 font-[600]">{order?.userId?.name}</p>
                <p>{order?.delivery_address?.mobile}</p>
                <p>{order?.delivery_address?.address_line}</p>
                <p>
                  {order?.delivery_address?.city},
                  {order?.delivery_address?.pincode}
                </p>
                <p>{order?.delivery_address?.country}</p>
              </address>
            </div>
          </div>

          {/* <!-- Help Section --> */}
          <div class="bg-white rounded-xl shadow-sm p-6 text-center">
            <h2 class="text-lg font-medium text-gray-900 mb-3">Need Help?</h2>
            <p class="text-sm text-gray-600 mb-4">
              If you have any questions about your order, please contact our
              customer service.
            </p>
            <a
              href="mailto:support@shopcart.com"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
