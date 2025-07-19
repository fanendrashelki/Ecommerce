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
import { useProfileImage } from "../../context/ProfileImageContext";
import { GrMapLocation } from "react-icons/gr";
const ProfileSidebar = () => {
  const context = useContext(MyProductContext);
  const { profileImg, handleImageChange, loading } = useProfileImage();
  const navigate = useNavigate();
  const { fetchWishlist, clearWishlist } = useWishlist();

  const handleLogout = async () => {
    try {
      context.setPageLoader(true);
      const token = localStorage.getItem("token");

      if (token) {
        await axiosInstance.get("/user/logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      localStorage.removeItem("token");
      context.setUser(null);
      context.setLogin(false);
      clearWishlist();
      context.alertBox("success", "Logout successful");
      navigate("/login");
    } catch (error) {
      context.alertBox("error", "Logout failed. Please try again.");
    } finally {
      context.setPageLoader(false);
    }
  };

  useEffect(() => {
    context.isLogin ? fetchWishlist() : clearWishlist();
  }, [context.isLogin]);

  return (
    <aside className="w-full sm:w-auto max-w-full sm:max-w-[280px] bg-white px-4 py-6 rounded-lg shadow-md m-2 sm:m-4">
      <div className="flex flex-col items-center mb-6 space-y-3">
        <div className="relative group w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mx-auto">
          <Avatar
            alt="User Avatar"
            src={profileImg}
            sx={{ width: "100%", height: "100%" }}
            className="w-full h-full myShadow"
          />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-full z-20">
              <CircularProgress
                size={24}
                className="text-gray-500 sm:size-[30px]"
              />
            </div>
          )}

          <label htmlFor="profile-image">
            <div className="absolute inset-0 rounded-full z-30 cursor-pointer">
              <div className="w-full h-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <IconButton
                  component="span"
                  className="bg-gray-800 bg-opacity-80 w-full h-full rounded-full flex items-center justify-center"
                >
                  <LiaUserEditSolid className="text-[24px] sm:text-[32px] text-white" />
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

        <div className="text-center">
          <h2 className="text-[15px] sm:text-[17px] font-semibold text-gray-800">
            {context.User?.name}
          </h2>
          <p className="text-[13px] sm:text-[15px] text-gray-600">
            {context.User?.email}
          </p>
        </div>
      </div>

      <ul className="space-y-2">
        <li>
          <Link to="/profile">
            <div className="flex items-center p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <FaRegUser className="text-[18px] sm:text-[20px] text-gray-700 mr-3" />
              <span className="text-gray-800 font-medium"> Profile</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <div className="flex items-center p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <FaRegHeart className="text-[18px] sm:text-[20px] text-gray-700 mr-3" />
              <span className="text-gray-800 font-medium"> Wishlist</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/order">
            <div className="flex items-center p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <BsCartCheck className="text-[18px] sm:text-[20px] text-gray-700 mr-3" />
              <span className="text-gray-800 font-medium"> Orders</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/address">
            <div className="flex items-center p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <GrMapLocation className="text-[18px] sm:text-[20px] text-gray-700 mr-3" />
              <span className="text-gray-800 font-medium">Address</span>
            </div>
          </Link>
        </li>
        <li>
          <div
            onClick={handleLogout}
            className=" w-[80%] mx-auto mt-4 flex items-center p-3 rounded-xl bg-red-500 hover:bg-red-700 transition cursor-pointer"
          >
            <BiLogOutCircle className="text-[18px] sm:text-[20px] text-white mr-3" />
            <span className="text-white font-medium">Logout</span>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default ProfileSidebar;
