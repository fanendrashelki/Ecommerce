import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";
import {PrivateRoute,PrivateRouteLogin} from "./PrivateRoute";
import { useState, createContext, useEffect } from "react";
import { SignIn } from "@/pages/auth";


import { Toaster } from "react-hot-toast";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgetPassword from "./pages/auth/forget-password";
import ResetPassword from "./pages/auth/reset-password";
import axiosInstance from "./utils/axiosInstance";
import Tables from "./pages/dashboard/tables";

export const myContext = createContext();

import '../src/App.css'
function App() {

  const [User, setUser] = useState(null);
  const [isLogin, setLogin] = useState(false);
   
   const token = localStorage.getItem("token");
  const contextValues = {setUser,setLogin,isLogin,User}
   useEffect(() => {
    const checkAuth = async () => {
      if (
        token &&
        token !== "undefined" &&
        token !== "null" &&
        token.trim() !== ""
      ) {
        try {
          const res = await axiosInstance.get("/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(res?.data?.user);
          setLogin(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLogin(false);
        }
      } else {
        setLogin(false);
      }
    };

    checkAuth();
  }, [isLogin]);
  console.log();
  
  return (
  <>
     <myContext.Provider value={contextValues}>
    <Toaster />
    <Routes>
      <Route path="/dashboard/*" element={< PrivateRoute><Dashboard /></PrivateRoute>} />
   
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/verify-otp" element={<VerifyOtp/>} />

      {/* login  */}
       <Route path="/" element={<PrivateRouteLogin><SignIn /></PrivateRouteLogin>} />
         <Route path="/forget-password" element={<ForgetPassword/>}></Route>
         <Route path="/reset-password" element={<ResetPassword/>}></Route>
    </Routes>
    </myContext.Provider>
  </>
     
  );
}

export default App;
