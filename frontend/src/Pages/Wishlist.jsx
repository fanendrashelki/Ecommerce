import React from "react";
import ProfileSidebar from "../components/Sidebar/ProfileSidebar";
import WishlistBox from "../components/Profile/wishlistBox";

const Wishlist = () => {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <ProfileSidebar />

      {/* Main Content */}
      <WishlistBox />
    </div>
  );
};

export default Wishlist;
