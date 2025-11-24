import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IoHomeOutline, IoSearch, IoBagCheckOutline } from "react-icons/io5";
import { BiLogInCircle } from "react-icons/bi";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { useContext, useState } from "react";
import { Link } from "react-router-dom"; // ✅ import Link
import { MyProductContext } from "../../../context/AppContext";

export default function MobileNav() {
  const [value, setValue] = useState(0);
  const context = useContext(MyProductContext);

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
          component={Link} // ✅ Make Tab behave like a Link
          to="/"
        />
        <Tab
          icon={<IoSearch size={20} />}
          label="Search"
          sx={{ minWidth: 0, fontSize: 10 }}
          component={Link}
          to="/search"
        />
        <Tab
          icon={<FaRegHeart size={20} />}
          label="Wishlist"
          sx={{ minWidth: 0, fontSize: 10 }}
          component={Link}
          to="/wishlist"
        />
        {context?.isLogin && (
          <Tab
            icon={<IoBagCheckOutline size={20} />}
            label="Order"
            sx={{ minWidth: 0, fontSize: 10 }}
            component={Link}
            to="/order"
          />
        )}

        {context?.isLogin ? (
          <Tab
            icon={<FaRegUser size={20} />}
            label="Account"
            sx={{ minWidth: 0, fontSize: 10 }}
            component={Link}
            to="/profile"
          />
        ) : (
          <Tab
            icon={<BiLogInCircle size={20} />}
            label="Login"
            sx={{ minWidth: 0, fontSize: 10 }}
            component={Link}
            to="/login"
          />
        )}
      </Tabs>
    </div>
  );
}
