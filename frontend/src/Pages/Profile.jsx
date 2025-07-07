import React, { useState } from "react";
import { Avatar, TextField, MenuItem, Button, IconButton } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { BsCartCheck } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import ProfileSidebar from "../components/Sidebar/ProfileSidebar";
import ProfileForm from "../components/Profile/ProfileForm";

const Profile = () => {
  return (
    <div className="flex  ">
      {/* Sidebar */}
      <ProfileSidebar />

      {/* Main Content */}
      <ProfileForm />
    </div>
  );
};

export default Profile;
