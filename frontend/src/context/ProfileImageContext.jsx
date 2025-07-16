// context/ProfileImageContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { MyProductContext } from "../AppWrapper";

export const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  const [profileImg, setProfileImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(MyProductContext);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image type and size (optional)
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      context.alertBox("error", "Only JPG, PNG, or WEBP images are allowed");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      context.alertBox("error", "Image size should be less than 2MB");
      return;
    }

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
        setProfileImg(res?.data?.imageUrl);
        context.alertBox("success", "Profile image updated");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Upload failed";
      context.alertBox("error", message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setProfileImg(context.User?.avatar);
  }, [context.User?.avatar]);

  return (
    <ProfileImageContext.Provider
      value={{ profileImg, loading, handleImageChange }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
};
