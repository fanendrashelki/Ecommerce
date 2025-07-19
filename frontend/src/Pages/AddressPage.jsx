import React from "react";
import ProfileSidebar from "../components/Sidebar/ProfileSidebar";
import ProfileForm from "../components/Profile/ProfileForm";

const AddressPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 py-6 w-full">
      {/* Sidebar */}
      <div className="hidden lg:block w-full lg:w-[300px]">
        <ProfileSidebar />
      </div>
      {/* Main Content */}
      <div className="w-full flex-grow"></div>
      hii
    </div>
  );
};

export default AddressPage;
