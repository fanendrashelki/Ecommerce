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

const ProfileSidebar = () => {
  const context = useContext(MyProductContext);
  const [profileImg, setProfileImg] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setProfileImg(context.User?.avatar);
  }, [context.User?.avatar]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImg(URL.createObjectURL(file)); // Temporary preview

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("token");

      const res = await axiosInstance.post("/user/profile-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.error) {
        context.alertBox("error", res.data.message);
      } else {
        const url = res?.data?.imageUrl;
        setProfileImg(url);
        context.alertBox("success", "Avatar updated successfully");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      context.alertBox("error", message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    context.setUser(null);
    navigate("/login");
  };

  return (
    <aside className="sticky top-0 w-[20%] bg-white px-4 py-6 rounded-lg shadow-lg m-6">
      <div className="flex flex-col items-center justify-center mb-5 space-y-3">
        {/* Avatar Upload Section */}
        <div className="relative group w-[100px] h-[100px] flex items-center justify-center">
          {loading ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              className="bg-white myShadow w-[100px] h-[100px] rounded-full flex items-center justify-center"
            >
              <CircularProgress className="text-gray-500" color="inherit" />
            </IconButton>
          ) : (
            <Avatar
              alt="User Avatar"
              src={profileImg}
              sx={{ width: 100, height: 100 }}
              className="w-[100px] h-[100px] myShadow"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
          <input
            accept="image/*"
            type="file"
            id="profile-image"
            hidden
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                className="bg-white shadow w-[100px] h-[100px] rounded-full flex items-center justify-center"
              >
                <LiaUserEditSolid className="text-[40px] text-white" />
              </IconButton>
            </div>
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
