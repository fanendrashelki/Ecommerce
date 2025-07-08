import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import {
  XMarkIcon,
  HomeIcon,
  UserIcon,
  CubeIcon,
  TableCellsIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useEffect, useState } from "react";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

export function Sidenav({ brandImg, brandName }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const location = useLocation();

  const [categoryOpen, setCategoryOpen] = useState(false);
  const toggleCategory = () => setCategoryOpen((prev) => !prev);

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1280) {
      setOpenSidenav(dispatch, false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = openSidenav ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSidenav]);

  return (
    <>
      {openSidenav && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        ></div>
      )}

      <aside
        className={`${sidenavTypes[sidenavType]} ${
          openSidenav ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 h-full w-72 rounded-r-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 overflow-y-auto`}
      >
        <div className="relative">
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XMarkIcon
              strokeWidth={2.5}
              className={`h-5 w-5 ${
                sidenavType === "gray" ? "text-white" : "text-gray-900"
              }`}
            />
          </IconButton>
        </div>

        <div className="m-4">
          {/* Dashboard Section */}
          <ul className="mb-4 flex flex-col gap-1">
            <li className="mb-2">
              <Typography
                variant="small"
                color={sidenavType === "gray" ? "white" : "blue-gray"}
                className="font-black flex items-center uppercase opacity-75"
              >
                Dashboard
              </Typography>
            </li>

            <li>
              <NavLink to="/dashboard/home" onClick={handleLinkClick}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "gray"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <HomeIcon className="h-5 w-5" />
                    <Typography color="inherit" className="font-medium capitalize">
                      Home
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/Banner" onClick={handleLinkClick}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "gray"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <TfiLayoutSliderAlt className="h-5 w-5" />
                    <Typography color="inherit" className="font-medium capitalize">
                      Home Banner
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/AdsBanner" onClick={handleLinkClick}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "gray"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <TfiLayoutSliderAlt className="h-5 w-5" />
                    <Typography color="inherit" className="font-medium capitalize">
                      Home Ads Banner
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/profile" onClick={handleLinkClick}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "gray"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <UserIcon className="h-5 w-5" />
                    <Typography color="inherit" className="font-medium capitalize">
                      Profile
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Management Section */}
          <ul className="mb-4 flex flex-col gap-1">
            <li className="mb-2">
              <Typography
                variant="small"
                color={sidenavType === "gray" ? "white" : "blue-gray"}
                className="font-black flex items-center uppercase opacity-75"
              >
                Management
              </Typography>
            </li>

            {/* Category Dropdown */}
            <li>
              <Button
                variant="text"
                color={sidenavType === "gray" ? "white" : "blue-gray"}
                className="flex items-center justify-between px-4 capitalize"
                fullWidth
                onClick={toggleCategory}
              >
                <div className="flex items-center gap-4">
                  <i className="fas fa-layer-group" />
                  <Typography color="inherit" className="font-medium capitalize">
                    Category
                  </Typography>
                </div>
                {categoryOpen ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </Button>

              {categoryOpen && (
                <ul className="ml-8 mt-1 flex flex-col gap-1">
                  <li>
                    <NavLink to="/dashboard/category" onClick={handleLinkClick}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color={
                            isActive
                              ? sidenavColor
                              : sidenavType === "gray"
                              ? "white"
                              : "blue-gray"
                          }
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          <CubeIcon className="h-5 w-5" />
                          <Typography color="inherit" className="font-medium capitalize">
                            Category
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/subcategory" onClick={handleLinkClick}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color={
                            isActive
                              ? sidenavColor
                              : sidenavType === "gray"
                              ? "white"
                              : "blue-gray"
                          }
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          <CubeIcon className="h-5 w-5" />
                          <Typography color="inherit" className="font-medium capitalize">
                            Subcategory
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/dashboard/product" onClick={handleLinkClick}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "gray"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <CubeIcon className="h-5 w-5" />
                    <Typography color="inherit" className="font-medium capitalize">
                      Products
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/user" onClick={handleLinkClick}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "gray"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <TableCellsIcon className="h-5 w-5" />
                    <Typography color="inherit" className="font-medium capitalize">
                      Users
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/tables" onClick={handleLinkClick}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "gray"
                        ? "white"
                        : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize"
                    fullWidth
                  >
                    <TableCellsIcon className="h-5 w-5" />
                    <Typography color="inherit" className="font-medium capitalize">
                      Tables
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Dashboard",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
