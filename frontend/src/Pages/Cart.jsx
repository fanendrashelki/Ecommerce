import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Embroidered Satin Saree",
      image:
        "https://serviceapi.spicezgold.com/download/1742462552739_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp",
      price: 400, // original price
      discountPrice: 320, // discounted price
      quantity: 1,
      size: "M",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Banarasi Silk Saree",
      image:
        "https://serviceapi.spicezgold.com/download/1742462552739_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp",
      price: 450,
      discountPrice: 350,
      quantity: 1,
      size: "L",
      rating: 4.0,
    },
  ]);

  const increment = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSizeChange = (id, newSize) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, size: newSize } : item))
    );
  };

  const shipping = 20;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );
  const total = subtotal + shipping;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    return (
      <div className="flex text-yellow-400 text-sm mt-1">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <span key={i}>★</span>
          ))}
        {halfStar && <span>☆</span>}
        {Array(5 - fullStars - (halfStar ? 1 : 0))
          .fill(0)
          .map((_, i) => (
            <span key={`empty-${i}`} className="text-gray-300">
              ★
            </span>
          ))}
      </div>
    );
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 rounded shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-28 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>

                    {/* Size dropdown */}
                    <div className="mt-4 flex items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Size:
                      </label>
                      <select
                        value={item.size}
                        onChange={(e) =>
                          handleSizeChange(item.id, e.target.value)
                        }
                        className=" border border-gray-200 rounded-md px-1 py-1 text-[12px] focus:outline-none focus:ring-0 focus:ring-black focus:border-[#282525] transition font-[600]"
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>

                    {/* Rating */}
                    {renderStars(item.rating)}

                    {/* Price and Discount */}
                    <div className="mt-1 flex  items-center gap-5">
                      <p className="text-sm text-gray-500 line-through">
                        ${item.price}
                      </p>
                      <p className="text-[#35ac75] font-semibold">
                        ${item.discountPrice}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={() => decrement(item.id)}
                          className="px-3 py-1 bg-gray-100 hover:bg-[#35ac75] hover:text-white text-lg font-semibold"
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
                          onClick={() => increment(item.id)}
                          className="px-3 py-1 bg-gray-100 hover:bg-[#35ac75] hover:text-white text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-1/3 border p-6 rounded shadow-md h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="w-full mt-4 bg-[#35ac75] text-white py-2 rounded hover:bg-gray-800 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
