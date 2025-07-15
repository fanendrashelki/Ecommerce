import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Search from "../Search/Search";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";

import { FaRegHeart } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation/Navigation";
import { MyProductContext } from "../../AppWrapper";
import { Menu, MenuItem, Avatar } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";

import ProfileImg1 from "../../assets/avatar1.png";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect } from "react";
import CategoryPanel from "./Navigation/CategoryPanel";

import { Button } from "@mui/material";
import { IoMenu } from "react-icons/io5";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header() {
  const context = useContext(MyProductContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileImg, setProfileImg] = useState(ProfileImg1);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isopenCatPanel, setIsOpenCatPanel] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsOpenCatPanel(open);
  };
  useEffect(() => {
    setProfileImg(context.User?.avatar);
  }, [context.User?.avatar]);
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

      context.alertBox("success", "Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      context.alertBox("error", "Logout failed. Please try again.");
    } finally {
      context.setPageLoader(false);
    }
  };

  return (
    <header className="bg-white w-full">
      {/* Top Strip - Hidden on small devices */}
      <div className="top-strip py-2 border-t border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <p className="text-xs font-medium">
                Get up to 50% off new season styles, limited time only
              </p>
            </div>
            <div className="flex items-center justify-end">
              <ul className="flex items-center gap-4 text-sm font-medium">
                <li>
                  <Link to="/" className="hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/help-center" className="hover:underline">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-y-4">
          {/* Logo */}
          <div className="block lg:hidden">
            <Button
              className="!text-black gap-2"
              onClick={toggleDrawer(true)}
              aria-label="Open Navigation Menu"
            >
              <IoMenu className="text-[30px]" />
            </Button>
          </div>
          <div className="w-1/2 lg:w-[20%] max-sm:w-[60%] max-md:w-[60%]">
            <Link to="/">
              <img
                src={logo}
                alt="Brand Logo"
                className="w-32 max-sm:w-[80%]"
              />
            </Link>
          </div>

          {/* Search (Hidden on small screens) */}
          <div className="hidden lg:block md:w-[20%] lg:w-[30%] ">
            <Search />
          </div>

          {/* Right Side (User / Icons) */}
          <div className=" lg:w-[50%]  max-sm:w-[20%]  max-md:w-[20%] flex items-center justify-end gap-5">
            <ul className="flex items-center gap-2 sm:gap-4 w-full justify-end">
              {context.isLogin ? (
                <li className="relative hidden lg:block">
                  <Tooltip title="Profile">
                    <div
                      className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                      onClick={handleOpen}
                    >
                      <IconButton className="!p-0">
                        <Avatar
                          alt="User"
                          src={profileImg}
                          className="w-10 h-10 sm:w-[50px] sm:h-[50px] border border-gray-300"
                        />
                      </IconButton>
                      <div className="hidden sm:block text-left">
                        <h1 className="text-sm font-semibold text-gray-800">
                          {context.User?.name}
                        </h1>
                        <p className="text-xs text-gray-600">
                          {context.User?.email}
                        </p>
                      </div>
                    </div>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      className: "mt-2 rounded-md shadow-md w-[200px]",
                    }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                  >
                    <MenuItem>
                      <Link
                        to="/profile"
                        className="flex gap-2 items-center w-full"
                      >
                        <FaRegUser /> My Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/orders"
                        className="flex gap-2 items-center w-full"
                      >
                        <BsCartCheck /> My Orders
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <button className="flex gap-2 items-center w-full">
                        <BiLogOutCircle /> Logout
                      </button>
                    </MenuItem>
                  </Menu>
                </li>
              ) : (
                <li className="text-sm font-medium hidden lg:block">
                  <Link to="/login">Login</Link> |{" "}
                  <Link to="/register">Register</Link>
                </li>
              )}

              {/* Icons */}
              <li onClick={() => context.setOpenCart(true)}>
                <Tooltip title="Cart">
                  <IconButton>
                    <StyledBadge badgeContent={0} color="secondary">
                      <MdOutlineShoppingCart className="max-sm:text-[30px] max-sm:text-black" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              <li className="hidden lg:block">
                <Tooltip title="Wishlist">
                  <IconButton>
                    <StyledBadge badgeContent={4} color="secondary">
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Bar (Should be responsive inside) */}
      <Navigation />
      <CategoryPanel
        toggleDrawer={toggleDrawer}
        isopenCatPanel={isopenCatPanel}
      />
    </header>
  );
}

export default Header;
