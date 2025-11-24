import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Search from "../Search/Search";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation/Navigation";
import { MyProductContext } from "../../context/AppContext";

import { Menu, MenuItem, Avatar } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";

import axiosInstance from "../../utils/axiosInstance";
import { useEffect } from "react";
import CategoryPanel from "./Navigation/CategoryPanel";

import { Button } from "@mui/material";
import { IoMenu } from "react-icons/io5";

import { useWishlist } from "../../context/WishlistContext";
import { useProfileImage } from "../../context/ProfileImageContext";
import { usecartlist } from "../../context/cartContext";

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
  const { profileImg } = useProfileImage();

  const [anchorEl, setAnchorEl] = useState(null);

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

  const { wishlistCount, fetchWishlist, clearWishlist } = useWishlist();
  const { cartCount, fetchCartlist, clearCartlist } = usecartlist();
  useEffect(() => {
    if (context.isLogin) {
      fetchWishlist();
      fetchCartlist(); // 🟢 fetch wishlist on login
    } else {
      clearWishlist();
      clearCartlist(); // 🔴 clear wishlist on logout
    }
  }, [context.isLogin]);


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
                  <Link to="/#" className="hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/order" className="hover:underline">
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
                          src={profileImg ? `${profileImg}&sz=200` : ""}
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
                        <FaRegUser /> Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/wishlist"
                        className="flex gap-2 items-center w-full"
                      >
                        <FaRegHeart /> Wishlist
                      </Link>
                    </MenuItem>

                    <MenuItem>
                      <Link
                        to="/order"
                        className="flex gap-2 items-center w-full"
                      >
                        <BsCartCheck /> Orders
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/address"
                        className="flex gap-2 items-center w-full"
                      >
                        <GrMapLocation /> Address
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <button className="flex gap-2 items-center w-full  text-red-700">
                        <BiLogOutCircle className="text-red-700" /> Logout
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
                    <StyledBadge badgeContent={cartCount} color="secondary">
                      <MdOutlineShoppingCart className="max-sm:text-[30px] max-sm:text-black" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
              {context.isLogin && (
                <li className="hidden lg:block">
                  <Tooltip title="Wishlist">
                    <Link to="/wishlist">
                      <IconButton>
                        <StyledBadge
                          badgeContent={wishlistCount}
                          color="secondary"
                        >
                          <FaRegHeart />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  </Tooltip>
                </li>
              )}
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
