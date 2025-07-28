// context/ProfileImageContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { MyProductContext } from "../AppWrapper";

// Create the context
const ProfileImageContext = createContext();

// Provider component
const ProfileImageProvider = ({ children }) => {
  const context = useContext(MyProductContext);
  const [profileImg, setProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image upload and validation
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
        setProfileImg(res?.data?.imageUrl || []);

        // if (process.env.NODE_ENV === "development") {
        //   console.log("Profile Image URL:", res?.data?.imageUrl);
        // }

        context.alertBox("success", "Profile image updated");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Upload failed";
      context.alertBox("error", message);
    } finally {
      setLoading(false);
    }
  };

  // Reset or update profile image when user changes
  useEffect(() => {
    setProfileImg(context?.User?.avatar || []);
  }, [context?.User?.avatar]);

  // Optional helper: Reset to original
  const resetProfileImage = () => {
    setProfileImg(context.User?.avatar || []);
  };

  return (
    <ProfileImageContext.Provider
      value={{
        profileImg,
        loading,
        handleImageChange,
        resetProfileImage,
      }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
};

// Custom hook
export const useProfileImage = () => useContext(ProfileImageContext);

// Export provider
export default ProfileImageProvider;
