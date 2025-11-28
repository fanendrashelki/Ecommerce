import React, { useEffect, useContext } from "react";
import { MyProductContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthSuccess.css"; // <<< add CSS file

const AuthSuccess = () => {
  const { isLogin, setUser, setLogin, checkAuth } =
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

          setLogin(true);

          if (res.data.success) {
            setUser(res.data.user);
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setLogin(false);
        }
      }
    };

    handleAuth();
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [isLogin]);

  return (
    <div className="auth-loading-container">
      <div className="loader"></div>
      <h2 className="loading-text">Logging you in...</h2>
    </div>
  );
};

export default AuthSuccess;
