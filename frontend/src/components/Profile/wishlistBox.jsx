import React, { useState } from "react";
import { Button, IconButton, Tooltip, Rating } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegHeart, FaRegEye } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const dummyWishlist = [
  {
    id: 1,
    title: "The Great Gatsby",
    price: 499,
    rating: 4.5,
    image:
      "https://serviceapi.spicezgold.com/download/1742462485037_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-2-202304220521.webp",
  },
  {
    id: 2,
    title: "1984",
    price: 399,
    rating: 4,
    image:
      "https://serviceapi.spicezgold.com/download/1742462485037_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-2-202304220521.webp",
  },
  {
    id: 3,
    title: "Atomic Habits",
    price: 699,
    rating: 4.8,
    image:
      "https://serviceapi.spicezgold.com/download/1742462485037_siril-poly-silk-grey-off-white-color-saree-with-blouse-piece-product-images-rvcpwdyagl-2-202304220521.webp",
  },
];

const WishlistBox = () => {
  const [wishlist, setWishlist] = useState(dummyWishlist);

  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="w-[60%] bg-white p-10 rounded-lg shadow-lg m-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-4 bg-white">
          <FaRegHeart
            className="w-24 h-24 text-[#35ac75] mb-6"
            strokeWidth={1.5}
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Start adding your favorite items to keep track of what you love.
          </p>
          <button className="px-6 py-3 bg-[#35ac75] hover:bg-[#000000] text-white font-medium rounded-xl shadow transition-all">
            Browse Items
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white flex items-center gap-4 p-4 rounded-lg hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[80px] h-[100px] object-cover rounded-md"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>

                <div className="mt-1">
                  <Rating
                    name="size-medium"
                    defaultValue={2}
                    size="small"
                    readOnly
                  />
                </div>

                <div className="mt-1 flex items-center gap-5">
                  <p className="text-sm font-semibold text-gray-500 line-through">
                    $200
                  </p>
                  <p className="text-[#35ac75] font-semibold">${item.price}</p>
                </div>

                <div className="w-full mt-3">
                  <Button className="btn-org flex gap-2">
                    <IoCartOutline className="text-[18px]" /> Add to Cart
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Tooltip title="View">
                  <Link to="/">
                    <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] !text-[20px]" />
                    </Button>
                  </Link>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleRemove(item.id)}
                  >
                    <MdDelete />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistBox;
