import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "../../utils/axiosInstance";
import { MyProductContext } from "../../context/AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import Password from "../../components/Input/Password";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
    setLoading(true);

    if (formData.name === "") {
      context.alertBox("error", "Please enter name");
      setLoading(false);
      return;
    }
    if (formData.email === "") {
      context.alertBox("error", "Please enter email");
      setLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      context.alertBox("error", "Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (formData.password === "") {
      context.alertBox("error", "Please enter password");
      setLoading(false);
      return;
    }

    try {
      context.setPageLoader(true);
      const res = await axiosInstance.post("/user/register", formData);

      if (res?.data?.error) {
        context.alertBox("error", res.data.message);
      } else {
        context.alertBox("success", "Registration successful");

        localStorage.setItem("email", formData.email);
        localStorage.setItem("Action-type", "emailVerify");
        setFormData({ name: "", email: "", password: "" });
        navigate("/verify-otp");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      context.alertBox("error", message);
      console.error("Register error:", err);
    } finally {
      setLoading(false);
      context.setPageLoader(false);
    }
  };

  return (
    <div className="w-full sm:w-[400px] mx-auto mt-10 mb-10 shadow-md">
      <div className="bg-white shadow-md rounded-md p-8">
        <h3 className="text-center text-lg font-semibold text-black mb-6">
          Register with a new account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-5">
            <TextField
              id="fullname"
              label="Fullname"
              variant="outlined"
              className="w-full"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full mb-5">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
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

          <Button
            type="submit"
            className="w-full btn-org font-[600] !mt-3 !mb-3  py-2 px-4 rounded-md  transition"
          >
            {loading == true ? (
              <CircularProgress color="inherit" />
            ) : (
              "Register"
            )}
          </Button>

          <p className="text-center">
            Already have an account?
            <Link
              className="link text-[14px] font-[600] text-sm leading-[25px] mt-[10px] mb-[10px]  text-[#35ac75] "
              to="/login"
            >
              Login
            </Link>
          </p>
          <p className="text-center font-[500] text-sm leading-[25px] mt-[10px] mb-[10px]">
            Or continue with social account
          </p>

          <Button className="w-full !flex !gap-3 !p-3 !font-[700] !bg-[#f1f1f1] btn-lg !text-black"
            onClick={() => window.open(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, "_self")}>
            <FcGoogle className="text-[20px]" /> Sign Up with Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
