import { useLocation, Link, useNavigate } from "react-router-dom";
  import { RiLogoutCircleLine } from "react-icons/ri";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useContext } from "react";
import { myContext } from "../../App";
import axiosInstance from "../../utils/axiosInstance";
import alertBox from "../../utils/toster";


export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
 const context = useContext(myContext);
  const navigate = useNavigate();

 const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {

      if (token) {
        await axiosInstance.get("/user/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Clear user session even if the logout request fails
      localStorage.removeItem("token");
      localStorage.removeItem("role")
      context.setUser(null);
      context.setLogin(false);
      navigate("/");

    alertBox("success", "Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      alertBox("error", "Logout failed. Please try again.");
    } finally {
      
    }
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center W-[100px]">
          
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          
           <Menu>
              <MenuHandler>
               
                  {context.User?.avatar ? (
                    <img
                      src={context.User.avatar}
                      alt={`${context.User.name || "User"} avatar`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : ( <IconButton variant="text" color="blue-gray" className="flex items-center gap-2 p-2">
                    <UserCircleIcon className="h-10 w-10 text-blue-gray-500" /> 
                    </IconButton>
                  )}
               
              </MenuHandler>

              <MenuList className="w-[250px] border-0 p-2">
                <MenuItem className="flex items-center gap-3 cursor-default hover:bg-transparent">
                  <div className="flex flex-col">
                    <span className="font-semibold text-base">{context.User?.name}</span>
                    <span className="text-sm text-gray-600">{context.User?.email}</span>
                  </div>
                </MenuItem>

                <hr className="my-2 border-blue-gray-100" />

                <MenuItem onClick={handleLogout} className="flex items-center gap-3 text-red-500 hover:bg-red-50">
                  <RiLogoutCircleLine className="w-5 h-5" />
                  <span className="font-semibold">Logout</span>
                </MenuItem>
              </MenuList>
            </Menu>
          
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-8 w-8 text-blue-gray-500" />
          </IconButton>
          
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
