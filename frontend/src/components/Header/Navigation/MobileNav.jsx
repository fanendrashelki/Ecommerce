import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IoHomeOutline, IoSearch, IoBagCheckOutline } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { useState } from "react";

export default function MobileNav() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white z-50 shadow-md lg:hidden">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        aria-label="mobile bottom navigation"
        sx={{
          ".MuiTabs-flexContainer": {
            justifyContent: "space-between",
          },
        }}
      >
        <Tab
          icon={<IoHomeOutline size={20} />}
          label="Home"
          sx={{ minWidth: 0, fontSize: 10 }}
        />
        <Tab
          icon={<IoSearch size={20} />}
          label="Search"
          sx={{ minWidth: 0, fontSize: 10 }}
        />
        <Tab
          icon={<FaRegHeart size={20} />}
          label="Wishlist"
          sx={{ minWidth: 0, fontSize: 10 }}
        />
        <Tab
          icon={<IoBagCheckOutline size={20} />}
          label="Order"
          sx={{ minWidth: 0, fontSize: 10 }}
        />
        <Tab
          icon={<FaRegUser size={20} />}
          label="Account"
          sx={{ minWidth: 0, fontSize: 10 }}
        />
      </Tabs>
    </div>
  );
}
