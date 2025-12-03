import React, { useEffect, useContext } from "react";
import { MyProductContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AuthSuccess = () => {
  const { isLogin, setUser, setLogin, checkAuth, setPageLoader } =
    useContext(MyProductContext);


  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("token", token);

        try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPageLoader(true);
          setLogin(true);

          if (res.data.success) {
            setUser(res.data.user); // Save user globally
            navigate("/");
            setTimeout(() => {
              setPageLoader(false);
            }, 2000);

          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setLogin(false);
          setPageLoader(false);
        }
      }
    };

    handleAuth();
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [isLogin]);


};

export default AuthSuccess;
