import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { MyProductContext } from "../../context/AppContext";
import Password from "../../components/Input/Password";
import axiosInstance from "../../utils/axiosInstance";


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const context = useContext(MyProductContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "") {
      context.alertBox("error", "Please enter email");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      context.alertBox("error", "Please enter a valid email address");
      return;
    }
    if (formData.password === "") {
      context.alertBox("error", "Please enter password");

      return;
    }

    try {
      context.setPageLoader(true);
      const res = await axiosInstance.post("/user/login", formData);

      if (res?.data?.error) {
        context.alertBox("error", res.data.message);
      } else {
        context.alertBox("success", "Login successful");
        setFormData({ email: "", password: "" });

        const { token } = res.data;

        // Store in localStorage
        localStorage.setItem("token", token);

        context.setLogin(true);

        navigate("/");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      context.alertBox("error", message);
      console.error("Login error:", err);
    } finally {

      context.setPageLoader(false);
    }
  };



  return (
    <div className="w-full sm:w-[400px] mx-auto mt-10 mb-10 shadow-md">
      <div className="bg-white shadow-md rounded-md p-8">
        <h3 className="text-center text-lg font-semibold text-black mb-6">
          Login to your account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-5">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              className="w-full"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <Password
            label="Password"
            variant="outlined"
            className="w-full"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex justify-start mb-4">
            <Link
              to="/forget-password"
              className="text-[14px] font-[600] text-[#35ac75]"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="!mt-3 !mb-3  py-2 px-4 rounded-md btn-org font-[600] transition"
          >Login</Button>

          <p className="text-center text-sm font-medium">
            Not Registered?
            <Link
              className="ml-1 text-[14px] font-[600] text-[#35ac75]"
              to="/register"
            >
              Sign Up
            </Link>
          </p>

          <p className="text-center font-[500] text-sm mt-[10px] mb-[10px]">
            Or continue with social account
          </p>

          <Button
            fullWidth
            className="!flex !gap-3 !p-3 !font-[700] !bg-[#f1f1f1] !text-black"
            onClick={() => window.open(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, "_self")}
          >
            <FcGoogle className="text-[20px]" /> Login with Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
