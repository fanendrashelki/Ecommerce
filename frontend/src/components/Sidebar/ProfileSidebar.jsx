import React, { useState, useEffect, useContext } from "react";
import { Avatar, Button, CircularProgress, IconButton } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { BsCartCheck } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { MyProductContext } from "../../AppWrapper";
import axiosInstance from "../../utils/axiosInstance";
import { useWishlist } from "../../context/WishlistContext";
import { ProfileImageContext } from "../../context/ProfileImageContext";

const ProfileSidebar = () => {
  const context = useContext(MyProductContext);

  const imageContext = useContext(ProfileImageContext);
  if (!imageContext) {
    return <div>Image context not available</div>; // or return null;
  }

  const { profileImg, loading, handleImageChange } = imageContext;
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      context.setPageLoader(true);

      if (token) {
        await axiosInstance.get("/user/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Clear user session even if the logout request fails
      localStorage.removeItem("token");
      context.setUser(null);
      context.setLogin(false);
      navigate("/login");
      clearWishlist();
      context.alertBox("success", "Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      context.alertBox("error", "Logout failed. Please try again.");
    } finally {
      context.setPageLoader(false);
    }
  };
  const { fetchWishlist, clearWishlist } = useWishlist();
  useEffect(() => {
    if (context.isLogin) {
      fetchWishlist(); // 🟢 fetch wishlist on login
    } else {
      clearWishlist(); // 🔴 clear wishlist on logout
    }
  }, [context.isLogin]);

  return (
    <aside className="sticky top-0 w-[20%] bg-white px-4 py-6 rounded-lg shadow-lg m-6">
      <div className="flex flex-col items-center justify-center mb-5 space-y-3">
        {/* Avatar Upload Section */}
        <div className="relative group w-[100px] h-[100px]">
          {/* Avatar */}
          <Avatar
            alt="User Avatar"
            src={profileImg}
            sx={{ width: 100, height: 100 }}
            className="w-full h-full myShadow"
          />

          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-full z-20">
              <CircularProgress size={30} className="text-gray-500" />
            </div>
          )}

          {/* Hover effect + upload button */}
          <label htmlFor="profile-image">
            <div className="absolute inset-0 rounded-full z-30 cursor-pointer">
              <div className="w-full h-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <IconButton
                  component="span"
                  className="bg-gray-800 bg-opacity-80 w-[100px] h-[100px] rounded-full flex items-center justify-center"
                >
                  <LiaUserEditSolid className="text-[32px] text-white" />
                </IconButton>
              </div>
            </div>
            <input
              accept="image/*"
              type="file"
              id="profile-image"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* User Info */}
        <div className="text-center">
          <h2 className="text-[18px] font-semibold text-gray-800">
            {context.User?.name}
          </h2>
          <p className="text-[16px] text-gray-600"> {context.User?.email}</p>
        </div>
      </div>

      <ul className="space-y-2 p-4">
        <li>
          <Link to="/profile">
            <div className="flex items-center p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <FaRegUser className="text-[20px] text-gray-700 mr-3" />
              <span className="text-gray-800 font-medium link">My Profile</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <div className="flex items-center p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <FaRegHeart className="text-[20px] text-gray-700 mr-3" />
              <span className="text-gray-800 font-medium link">
                My Wishlist
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/order">
            <div className="flex items-center p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <BsCartCheck className="text-[20px] text-gray-700 mr-3" />
              <span className="text-gray-800 font-medium link">My Orders</span>
            </div>
          </Link>
        </li>
        <li>
          <div
            onClick={handleLogout}
            className="flex items-center p-3 rounded-xl hover:bg-red-50 transition cursor-pointer"
          >
            <BiLogOutCircle className="text-[20px] text-red-600 mr-3" />
            <span className="text-red-600 font-medium">Logout</span>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
