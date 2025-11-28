import { IoMdClose } from "react-icons/io";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { usecartlist } from "../../context/cartContext";
import { MyProductContext } from "../../context/AppContext";
import { useContext, useEffect, useMemo } from "react";
import shopping from "../../assets/shopping.png";

function CartDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const context = useContext(MyProductContext);
  const {
    cartlist,
    fetchCartlist,
    cartCount,
    updateCart,
    removeFromCartlist,
    clearCartlist,
  } = usecartlist();

  useEffect(() => {
    if (context.isLogin) {
      fetchCartlist(); // 🟢 fetch wishlist on login
    } else {
      clearCartlist(); // 🔴 clear wishlist on logout
    }
  }, [context.isLogin]);

  // Calculate total
  const total = cartlist.reduce(
    (acc, item) => acc + item?.productId?.price * item?.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={context.openCart} onClose={() => context.setOpenCart(false)}>
      <div className="p-2 w-[400px]">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-lg font-semibold">
            Shopping Cart ({cartlist.length > 0 && cartCount})
          </h2>
          <IconButton onClick={onClose} className="!w-[40px] !h-[40px]">
            <IoMdClose className="text-[20px] text-[rgba(0,0,0,0.7)]" />
          </IconButton>
        </div>
        <hr className="mb-4 border-gray-300" />

        <div className="space-y-4 overflow-y-auto px-2 max-h-[65vh]">
          {cartlist.length == 0 ? (
            <div className="text-center text-gray-500 text-sm py-12">
              <img
                src={shopping}
                className="object-contain w-[50%] mx-auto space-y-10"
                alt=""
              />
              <p className="text-[25px] font-bold text-black">
                Your cart is empty
              </p>
            </div>
          ) : (
            cartlist.map((item) => (
              <>
                <div
                  key={item?._id}
                  className="flex items-start gap-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={item?.productId?.images?.[0]?.url}
                    alt={item?.productId?.name}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                          {item?.productId?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item?.description}
                        </p>
                      </div>
                      <IconButton
                        onClick={() => removeFromCartlist(item?._id)}
                        size="small"
                      >
                        <MdDelete className="text-[#35ac75] hover:text-red-700" />
                      </IconButton>
                    </div>
                    <p className="text-base font-semibold text-[#35ac75] mt-1">
                      ₹{item?.productId?.price} × {item?.quantity} = ₹
                      {item?.productId?.price * item?.quantity}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={() =>
                            updateCart(
                              item?._id,
                              item?.quantity - 1,
                              context?.User?._id
                            )
                          }
                          className={`px-3 py-1 bg-gray-100 text-lg font-semibold hover:bg-[#35ac75] hover:text-white`}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item?.quantity}
                          readOnly
                          className="w-12 text-center p-1 outline-none"
                        />
                        <button
                          onClick={() =>
                            updateCart(
                              item?._id,
                              item?.quantity + 1,
                              context?.User?._id
                            )
                          }
                          className="px-3 py-1 bg-gray-100 hover:bg-[#35ac75] hover:text-white text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
        {cartlist.length > 0 && (
          <div className="mt-3 mb-3 border-t pt-2 px-2">
            <div className="flex justify-between mb-3">
              <span className="text-base font-medium">Total</span>
              <span className="text-base font-semibold text-[#35ac75]">
                ₹{total}
              </span>
            </div>
            <div className="flex sticky bottom-0 items-center justify-between gap-3">
              <button
                onClick={() => {
                  navigate("/cart");
                  onClose();
                }}
                className="w-full bg-[#fb5e5e] text-white py-2 rounded hover:bg-gray-800 transition"
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  navigate("/checkout");
                  onClose();
                }}
                className="w-full bg-[#35ac75] text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default CartDrawer;
