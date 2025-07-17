import React from "react";
import ProfileSidebar from "../components/Sidebar/ProfileSidebar";
import WishlistBox from "../components/Profile/wishlistBox";

const Wishlist = () => {
  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div className="hidden lg:block w-full lg:w-[300px]">
        <ProfileSidebar />
      </div>

      {/* Main Content */}
      <WishlistBox />
    </div>
  );
};

export default Wishlist;
