import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MyProductContext } from "../AppWrapper";
import { usecartlist } from "../context/cartContext";
import shopping from "../assets/shopping.png";
import { Link } from "react-router-dom";
function Cart() {
  const [isLoading, setisLoading] = useState(false);
  const context = useContext(MyProductContext);
  const {
    cartlist,
    fetchCartlist,
    updateCart,
    removeFromCartlist,
    clearCartlist,
    cartCount,
  } = usecartlist();

  useEffect(() => {
    setisLoading(true);
    if (context.isLogin) {
      fetchCartlist();
      setTimeout(() => {
        setisLoading(false);
      }, 500);
    } else {
      clearCartlist();
    }
  }, [context.isLogin]);

  const subtotal = cartlist.reduce(
    (acc, item) => acc + item?.productId?.price * item?.quantity,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.0725;
  const total = subtotal + shipping + tax;

  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">
          {`Your cart ${
            cartCount === 0
              ? "is empty"
              : `${cartCount} item${cartCount > 1 ? "s" : ""}`
          }`}
        </h1>

        {isLoading ? ( // Check if the cart is loading
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              {[...Array(3)].map(
                (
                  _,
                  index // Create 3 skeleton items
                ) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-white rounded-lg shadow-lg animate-pulse"
                  >
                    <div className="w-28 h-32 bg-gray-200 rounded-md"></div>
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="w-full lg:w-1/3 bg-white  p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Order Summary
              </h2>
              <div className="flex justify-between mb-3 text-gray-700">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="flex justify-between mb-3 text-gray-700">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="flex justify-between font-semibold text-lg text-gray-900">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="mt-6">
                <div className="h-12 bg-[#35ac75] rounded"></div>
              </div>
            </div>
          </div>
        ) : cartlist.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              {cartlist.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={item.productId?.images?.[0]?.url}
                    alt={item.productId?.name}
                    className="w-28 h-32 object-contain rounded-md"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {item.productId?.name}
                      </h3>
                    </div>
                    {item.selectedSize && item.selectedSize.length > 0 > 0 && (
                      <p className=" text-gray-600">
                        <span className="font-bold">Size:</span>{" "}
                        {item.selectedSize}
                      </p>
                    )}
                    {item.selectedRam > 0 && (
                      <p className=" text-gray-600 mt-1">
                        <span className="font-bold">RAM:</span>{" "}
                        {item.selectedRam} GB
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-3">
                      {item.productId?.discountPrice && (
                        <p className="text-sm text-gray-400 line-through">
                          ₹{item.productId.price}
                        </p>
                      )}
                      <p className="text-lg text-[#35ac75] font-bold">
                        ₹
                        {item.productId?.discountPrice || item.productId?.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={() =>
                            updateCart(item._id, item.quantity - 1)
                          }
                          className="px-3 py-1 bg-gray-100 hover:bg-[#35ac75] hover:text-white text-lg font-bold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-12 text-center p-1 outline-none"
                        />
                        <button
                          onClick={() =>
                            updateCart(item._id, item.quantity + 1)
                          }
                          className="px-3 py-1 bg-gray-100 hover:bg-[#35ac75] hover:text-white text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-1/3 bg-white  p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Order Summary
              </h2>
              <div className="flex justify-between mb-3 text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3 text-gray-700">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3 text-gray-700">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg text-gray-900">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <Link to={"/checkout"}>
                <button className="w-full mt-6 bg-[#35ac75] text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm py-12">
            <img
              src={shopping}
              className="object-contain !w-[20%] mx-auto space-y-10"
              alt=""
            />
            <p className="text-[25px] font-bold text-black">
              Your cart is empty
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
