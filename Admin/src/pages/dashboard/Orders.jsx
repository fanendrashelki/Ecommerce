import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import NotFound from "../../Components/NotFound";
import axiosInstance from "../../utils/axiosInstance.js";
import ProductSkeleton from "../../Components/ProductSkeleton.jsx";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    setSkeletonLoading(true);
    try {
      const res = await axiosInstance.get("orders/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data?.orders || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setTimeout(() => {
        setSkeletonLoading(false);
      }, 500);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(
        `/orders/changeStatus/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-5 mb-10 flex flex-col gap-6">
      {skeletonLoading ? (
        <ProductSkeleton rows={10} />
      ) : error ? (
        <Typography color="red" className="text-center">{error}</Typography>
      ) : orders.length === 0 ? (
        <NotFound title="Orders" />
      ) : (
        <Card>
          <CardBody className="px-0 pt-0 pb-2">
            <div className="w-full overflow-x-auto">
              <table className="min-w-[800px] w-full table-auto">
                <thead>
                  <tr>
                    {["Order Id", "Products", "Total Amount", "Payment Method", "Delivery Date", "Status"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const className = `py-3 px-5 ${
                      index === orders.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={order._id || index}>
                        <td className={className}>
                          <Typography variant="small" className="font-semibold">
                            {order.orderId}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex flex-col gap-2">
                            {order.items.map((item, idx) => (
                              <div key={item.id || idx} className="flex items-center gap-2">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-[50px] h-[50px] object-contain"
                                />
                                <Typography variant="small" className="line-clamp-1">
                                  {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
                                </Typography>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className={className}>{order.totalAmt}</td>
                        <td className={className}>{order.paymentMethod}</td>
                        <td className={className}>
                          {order.deliveryDate
                            ? new Date(order.deliveryDate).toLocaleDateString("en-GB")
                            : "Pending"}
                        </td>
                        <td className={className}>
                          <Select
                            value={order.orderStatus}
                            onChange={(val) => handleStatusChange(order._id, val)}
                          >
                            <Option value="Pending">Pending</Option>
                            <Option value="Processing">Processing</Option>
                            <Option value="Shipped">Shipped</Option>
                            <Option value="Delivered">Delivered</Option>
                            <Option value="Cancelled">Cancelled</Option>
                          </Select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default Orders;
