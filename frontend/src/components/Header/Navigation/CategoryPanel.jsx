import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegMinusSquare } from "react-icons/fa";
import "../Navigation/style.css";

import { useState } from "react";
import CategoryCollapse from "../../categoryCollapse/CategoryCollapse";

import logo from "../../../assets/logo.png";
const CategoryPanel = ({ toggleDrawer, isopenCatPanel }) => {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <img
        src={logo}
        alt=""
        className="w-32 max-sm:w-[80%] mx-auto lg:hidden"
      />
      <h6 className="p-3 text-[16px] font-[500] flex items-center justify-between">
        Shop By Categories
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer font-[500] text-[20px]"
        />
      </h6>
      <Divider />

      <CategoryCollapse />
    </Box>
  );

  return (
    <Drawer open={isopenCatPanel} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default CategoryPanel;
