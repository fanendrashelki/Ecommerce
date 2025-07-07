import Sidebar from "../components/Sidebar/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../components/ProductItem/ProductItem";
import ProductItemList from "../components/ProductItem/ProductItemList";
import { Button } from "@mui/material";
import { IoGridSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const ProductListing = () => {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section className="py-5 pb-0 bg-[#efefef]">
      <div className="container ">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            className="link transition"
            href="/"
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            className="link transition"
            href="/"
          >
            Product List
          </Link>
        </Breadcrumbs>
      </div>
      <div className="bg-white p-2 mt-4">
        <div className="container flex gap-3">
          <div className="sidebarWrapper w-[20%] h-full bg-white">
            <Sidebar />
          </div>
          <div className="w-[80%]">
            <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between">
              <div className="col1 flex items-center itemView">
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
                    itemView === "list" && "active"
                  }`}
                  onClick={() => setItemView("list")}
                >
                  <FiMenu className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
                    itemView === "grid" && "active"
                  }`}
                  onClick={() => setItemView("grid")}
                >
                  <IoGridSharp className="text-[rgba(0,0,0,0.7)]" />
                </Button>

                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  There are 27 products.
                </span>
              </div>
              <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4 ">
                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)] ">
                  Sort By :
                </span>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white  !text-[13px] !text-[#000] !capitalize !border-1 !border-[rgba(0,0,0,0.4)] !px-3 !py-1"
                >
                  Name, A to Z
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleClose}
                    className=" !text-[13px] !text-[#000] !capitalize"
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className=" !text-[13px] !text-[#000] !capitalize"
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    className=" !text-[13px] !text-[#000] !capitalize"
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>

            <div
              className={`grid  gap-4 ${
                itemView === "list"
                  ? "grid-cols-1 md:grid-cols-1"
                  : "grid-cols-4 md:grid-cols-4"
              }`}
            >
              {itemView === "grid" ? (
                <>
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                </>
              ) : (
                <>
                  <ProductItemList />
                  <ProductItemList />
                  <ProductItemList />
                  <ProductItemList />
                  <ProductItemList />
                  <ProductItemList />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
