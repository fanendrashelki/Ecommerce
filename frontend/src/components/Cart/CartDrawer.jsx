import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CartDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Embroidered Satin Saree",
      image:
        "https://serviceapi.spicezgold.com/download/1742462552739_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp",
      price: 320,
      description: "Pink color saree with blouse",
      quantity: 1,
    },
    {
      id: 2,
      name: "Floral Printed Saree",
      image:
        "https://serviceapi.spicezgold.com/download/1742462552739_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-0-202308161432.webp",
      price: 324,
      description: "Floral design on georgette fabric",
      quantity: 1,
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
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

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="p-2 w-[400px]">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-lg font-semibold">
            Shopping Cart ({cartItems.length})
          </h2>
          <Button
            onClick={onClose}
            className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]"
          >
            <IoMdClose className="text-[20px] text-[rgba(0,0,0,0.7)]" />
          </Button>
        </div>
        <hr className="mb-4 border-gray-300" />
        <div className="space-y-4 overflow-y-auto px-2 max-h-[65vh]">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 border-b border-gray-200 pb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#35ac75] hover:text-red-700"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
                <p className="text-base font-semibold text-[#35ac75] mt-1">
                  ${item.price} × {item.quantity} = $
                  {item.price * item.quantity}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => decreaseQty(item.id)}
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
                      onClick={() => increaseQty(item.id)}
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
        <div className="mt-4 border-t pt-4 px-2">
          <div className="flex justify-between mb-3">
            <span className="text-base font-medium">Total</span>
            <span className="text-base font-semibold text-[#35ac75]">
              ${total}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                navigate("/cart");
                onClose();
              }}
              className="w-full btn-org bg-[#fb5e5e] text-white py-2 rounded hover:bg-gray-800 transition"
            >
              View Cart
            </button>
            <button
              onClick={() => {
                navigate("/checkout");
                onClose();
              }}
              className="w-full btn-org bg-[#35ac75] text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default CartDrawer;
