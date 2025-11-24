import React, { useEffect, useContext } from "react";
import { MyProductContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
          const res = await axios.get("http://localhost:8000/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setLogin(true);

          if (res.data.success) {
            setUser(res.data.user); // Save user globally
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
    <div>
      <h2>Logging in...</h2>
    </div>
  );
};

export default AuthSuccess;
