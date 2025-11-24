import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function useAuth() {
  const [User, setUser] = useState(null);
  const [isLogin, setLogin] = useState(false);

  const token = localStorage.getItem("token");

  const checkAuth = async () => {
    if (!token || token === "undefined" || token === "null") {
      setLogin(false);
      return;
    }

    try {
      const res = await axiosInstance.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res?.data?.user);
      setLogin(true);
    } catch (err) {
      console.error("Auth error:", err);
      setLogin(false);
    }
  };

  return { User, setUser, isLogin, setLogin, checkAuth };
}
