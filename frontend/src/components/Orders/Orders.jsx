import React, { useState, useEffect, useContext } from "react";
import ProfileSidebar from "../Sidebar/ProfileSidebar";
import { MyProductContext } from "../../AppWrapper";
import axiosInstance from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(MyProductContext);

  const token = localStorage.getItem("token");

  const fetchUserOrder = async (userid) => {
    if (!userid) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get(`orders/${userid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data?.orders);
      console.log(res.data);
    } catch (error) {
      console.error(
        "Failed to fetch orders:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (context.User?._id) {
      fetchUserOrder(context.User._id);
    }
  }, [context.User?._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="hidden lg:block w-full lg:w-[300px]">
        <ProfileSidebar />
      </div>

      <div className="w-[80%] bg-white p-10 rounded-lg shadow-lg m-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        </div>

        {orders.length > 0 ? (
          orders.map((order) => {
            const activeStep = Math.max(
              0,
              steps.indexOf(order.orderStatus) + 1
            );

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-lg shadow-md overflow-hidden mb-6 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">{order.orderId}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {order.orderStatus}
                  </span>
                </div>

                {/* Progress Tracker */}
                <div className="px-6 pt-4 pb-6">
                  <div className="flex justify-between relative mb-10">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center z-10"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold mb-2 ${
                            index < activeStep
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <p
                          className={`text-xs font-medium ${
                            index < activeStep
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                    <div className="absolute top-4 left-0 w-full h-1 bg-gray-200">
                      <div
                        className="h-1 bg-[#35ac75]"
                        style={{
                          width: `${(activeStep / steps.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                {order.items.map((item) => (
                  <div key={item._id} className="bg-gray-50 px-6 py-4">
                    <div className="flex flex-wrap -mx-4">
                      {/* Image */}
                      <div className="w-full md:w-1/6 px-4 mb-4 md:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="rounded-md w-[50%] h-auto object-contain"
                        />
                      </div>

                      {/* Product details */}
                      <div className="w-full md:w-3/6 px-4 mb-4 md:mb-0 flex flex-col justify-between">
                        <div>
                          <p className="text-gray-500 text-sm line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-gray-700">Qty: {item.quantity}</p>
                        </div>
                        <Link to={`/product-details/${item.productId._id}`}>
                          <button className="mt-2 text-[#35ac75] hover:underline text-sm font-medium">
                            View product details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Order Summary */}
                <div className="mt-3 p-6">
                  <h2 className="font-semibold text-lg">Summary</h2>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{order.subTotalAmt.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>₹{order.Shippingcharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex font-bold justify-between">
                    <span>Total:</span>
                    <span>₹{order.totalAmt.toFixed(2)}</span>
                  </div>
                </div>

                {/* Order Dates */}
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex flex-col sm:flex-row sm:gap-8">
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Order placed:</span>{" "}
                        {order?.orderDate
                          ? new Date(order.orderDate).toLocaleDateString(
                              "en-GB"
                            )
                          : "N/A"}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Delivered:</span>{" "}
                        {order?.deliveryDate
                          ? new Date(order.deliveryDate).toLocaleDateString(
                              "en-GB"
                            )
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-lg shadow-md text-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No orders yet
            </h3>
            <p className="mt-1 text-gray-500">
              You haven't placed any orders yet.
            </p>
            <div className="mt-6">
              <button className="px-4 py-2 bg-[#35ac75] rounded-md text-white hover:bg-indigo-700 transition-colors">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
