import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables } from "@/pages/dashboard";
import User from "./pages/dashboard/User";
import ProductManager from "./pages/dashboard/ProductManager";
import { BiSolidCategoryAlt } from "react-icons/bi";
import Category from "./pages/dashboard/Category";
import Subcategory from "./pages/dashboard/Subcategory";

import { TfiLayoutSliderAlt } from "react-icons/tfi";
import Banner from "./pages/dashboard/Banner";
import AdsBanner from "./pages/dashboard/AdsBanner";

import Orders from "./pages/dashboard/Orders";

const iconClass = "w-5 h-5 text-inherit";
import { BsCartCheck } from "react-icons/bs";
export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon className={iconClass} />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon className={iconClass} />,
        name: "Profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon className={iconClass} />,
        name: "Tables",
        path: "/tables",
        element: <Tables/>,
      },
      {
        icon: <UserCircleIcon className={iconClass} />,
        name: "User",
        path: "/user",
        element: <User />,
      },
       {
        icon: <BiSolidCategoryAlt className={iconClass} />,
        name: "Category",
        path: "/category",
        element: <Category />,
        
      },
      {
        icon: <BiSolidCategoryAlt className={iconClass} />,
        name: "subcategory",
        path: "/subcategory",
        element: <Subcategory />,
        
      },
       {
        icon: <UserCircleIcon className={iconClass} />,
        name: "Product",
        path: "/product",
        element: <ProductManager/>,
      },
      {
        icon: <TfiLayoutSliderAlt className={iconClass} />,
        name: "Banner",
        path: "/Banner",
        element: <Banner/>,
      }, {
        icon: <TfiLayoutSliderAlt className={iconClass} />,
        name: "AdsBanner",
        path: "/AdsBanner",
        element: <AdsBanner/>,
      },
       {
        icon: <BsCartCheck  className={iconClass} />,
        name: "Orders",
        path: "/orders",
        element: <Orders/>,
      },
      
    ],
  },
];

export default routes;
