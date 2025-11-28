import { createContext, useState, useEffect } from "react";
import { alertBox } from "../utils/alertBox";
import useAuth from "./useAuth";
import useCategories from "./useCategories";

export const MyProductContext = createContext();

export default function AppContextProvider({ children }) {
  const [openCart, setOpenCart] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [pageloader, setPageLoader] = useState(false);
  console.log("openCart", openCart);

  const { User, setUser, isLogin, setLogin, checkAuth } = useAuth();
  const { category } = useCategories();


  const contextValues = {
    setOpenCart,
    setOpenAddress,
    openAddress,
    alertBox,
    setUser,
    setLogin,
    isLogin,
    User,
    setPageLoader,
    category,
    checkAuth
  };

  useEffect(() => {
    checkAuth();
  }, [isLogin]);

  return (
    <MyProductContext.Provider value={contextValues}>
      {children}
    </MyProductContext.Provider>
  );
}
