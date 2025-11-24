import React, { useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useWishlist } from "../../context/WishlistContext";
import { MyProductContext } from "../../context/AppContext";
import { Button, Tooltip } from "@mui/material";

const WishlistBox = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const context = useContext(MyProductContext);

  const handleRemove = async (id) => {
    await removeFromWishlist(id);
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="w-full bg-white p-6 sm:p-10 rounded-xl shadow-lg m-4 sm:m-6 text-center">
        <FaRegHeart className="w-16 h-16 sm:w-20 sm:h-20 text-[#35ac75] mx-auto mb-4 sm:mb-6" />
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
          Start adding your favorite items to keep track of what you love.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-5 sm:px-8 py-2.5 bg-[#35ac75] hover:bg-[#2a9d5d] text-white font-medium rounded-lg shadow transition"
        >
          Browse Items
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow m-3">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          My Wishlist
        </h1>
      </div>

      {/* Responsive Scrollable Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3 whitespace-nowrap">Price</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Product Info */}
                <td className="px-4 py-3 flex items-center gap-3 sm:gap-4 min-w-[200px]">
                  <img
                    src={item?.images?.[0]?.url || "/placeholder.jpg"}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded"
                  />
                  <Tooltip title={item.name} arrow>
                    <span className="font-medium text-gray-800 truncate max-w-[160px] sm:max-w-[200px] block text-sm sm:text-base">
                      {item.name}
                    </span>
                  </Tooltip>
                </td>

                {/* Price */}
                <td className="px-4 py-3 font-semibold text-green-600 whitespace-nowrap">
                  ₹{item.price}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-center">
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    <Tooltip title="Remove from wishlist" arrow>
                      <Button
                        onClick={() => handleRemove(item._id)}
                        className="!w-9 !h-9 !min-w-[36px] shadow !text-[#f01010] !rounded-full !bg-white hover:!bg-[#f01010] hover:!text-white"
                        aria-label="Remove from wishlist"
                      >
                        <MdDelete className="w-5 h-5" />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishlistBox;
