import React from "react";
import { Button, Tooltip, Chip } from "@mui/material";
import { FaFileInvoice, FaTimes } from "react-icons/fa";
import ProfileSidebar from "../Sidebar/ProfileSidebar";

const orders = [
  {
    id: "ORDER-1001",
    date: "2025-05-15",
    status: "Shipped",
    address: "123 MG Road, Bengaluru, Karnataka, India",
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Delivery",
    products: [
      {
        title: "The Great Gatsby",
        price: 499,
        image: "https://picsum.photos/id/1015/80/100",
      },
      {
        title: "1984",
        price: 399,
        image: "https://picsum.photos/id/1016/80/100",
      },
    ],
  },
  {
    id: "ORDER-1002",
    date: "2025-05-17",
    status: "Delivered",
    address: "456 Park Avenue, Delhi, India",
    paymentMethod: "Cash on Delivery",
    shippingMethod: "Express Delivery",
    products: [
      {
        title: "Atomic Habits",
        price: 699,
        image: "https://picsum.photos/id/1019/80/100",
      },
    ],
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Shipped":
      return "info";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const statusSteps = [
  "Placed",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];
const getStatusIndex = (status) => statusSteps.indexOf(status);

const OrderProgressBar = ({ currentStatus }) => {
  const currentIndex = getStatusIndex(currentStatus);
  return (
    <div className="flex items-center justify-between mt-4 mb-2 relative">
      {statusSteps.map((step, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center flex-1"
        >
          <div
            className={`w-4 h-4 rounded-full z-10 ${
              index <= currentIndex ? "bg-[#35ac75]" : "bg-gray-300"
            }`}
          ></div>
          <span
            className={`text-xs mt-1 ${
              index <= currentIndex ? "text-[#35ac75]" : "text-gray-400"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
      <div className="absolute top-1.5 left-2 right-2 h-[2px] bg-gray-300 z-0" />
      <div
        className="absolute top-1.5 left-2 h-[2px] bg-[#35ac75] z-10"
        style={{
          width: `${(currentIndex / (statusSteps.length - 1)) * 100}%`,
        }}
      />
    </div>
  );
};

const MyOrders = () => {
  const handleCancel = (id) => {
    alert(`Cancel order: ${id}`);
  };

  const handleInvoice = (id) => {
    alert(`Download invoice for order: ${id}`);
  };

  return (
    <div className="flex  ">
      <div className="hidden lg:block w-full lg:w-[300px]">
        <ProfileSidebar />
      </div>
      <div className="w-[80%] bg-white p-10 rounded-lg shadow-lg m-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
        </div>

        <div className="space-y-6">
          {orders.map((order) => {
            const total = order.products.reduce(
              (sum, item) => sum + item.price,
              0
            );
            return (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-xl shadow p-5"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      Order ID:
                      <span className="text-gray-600">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Order Date: {order.date}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0 flex gap-3 items-center">
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      variant="outlined"
                      className="capitalize"
                    />
                    <Tooltip title="Download Invoice">
                      <Button
                        onClick={() => handleInvoice(order.id)}
                        className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]"
                      >
                        <FaFileInvoice className="text-[rgba(0,0,0,0.7)] !text-[20px]" />
                      </Button>
                    </Tooltip>
                    {order.status !== "Delivered" &&
                      order.status !== "Cancelled" && (
                        <Tooltip title="Cancel Order">
                          <Button
                            onClick={() => handleCancel(order.id)}
                            className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]"
                          >
                            <FaTimes className="text-[rgba(0,0,0,0.7)] !text-[20px]" />
                          </Button>
                        </Tooltip>
                      )}
                  </div>
                </div>

                {/* Progress Bar */}
                <OrderProgressBar currentStatus={order.status} />

                {/* Product List */}
                <div className="overflow-x-auto flex gap-4 pb-2 mt-4">
                  {order.products.map((product, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 border p-3 rounded-md min-w-[220px]"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-[60px] h-[80px] object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.title}
                        </p>
                        <p className="text-sm text-[#35ac75] font-semibold mt-1">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Delivery Address:</span>
                    {order.address}
                  </p>
                  <p>
                    <span className="font-semibold">Payment Method:</span>
                    {order.paymentMethod}
                  </p>
                  <p>
                    <span className="font-semibold">Shipping Method:</span>
                    {order.shippingMethod}
                  </p>
                  <p>
                    <span className="font-semibold">Total Items:</span>
                    {order.products.length}
                  </p>
                </div>

                {/* Total */}
                <div className="text-right mt-4">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-xl font-bold text-[#35ac75]">${total}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
