import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import Password from "../../components/Input/Password";
import { MyProductContext } from "../../context/AppContext";
import axiosInstance from "../../utils/axiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email"),
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
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

    if (formData.newPassword === "") {
      context.alertBox("error", "Please enter password");
      setLoading(false);
      return;
    }
    if (formData.confirmPassword === "") {
      context.alertBox("error", "Please enter Confirm Password");
      setLoading(false);
      return;
    }
    if (formData.confirmPassword !== formData.newPassword) {
      context.alertBox("error", "Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      context.setPageLoader(true);
      const res = await axiosInstance.post("/user/reset-password", formData);

      if (res?.data?.error) {
        context.alertBox("error", res.data.message);
      } else {
        context.alertBox("success", "password change successful");
        setFormData({ email: "", newPassword: "", confirmPassword: "" });
        localStorage.removeItem("email");
        context.setLogin(true);

        navigate("/");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      context.alertBox("error", message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
      context.setPageLoader(false);
    }
  };

  return (
    <div className="w-full sm:w-[400px] mx-auto mt-10 mb-10 shadow-md">
      <div className="bg-white shadow-md rounded-md p-8">
        <h3 className="text-center text-lg font-semibold text-black mb-6">
          Reset Password
        </h3>
        <form onSubmit={handleSubmit}>
          <Password
            variant="outlined"
            className="w-full"
            name="newPassword"
            label="New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <Password
            label="Confirm Password"
            variant="outlined"
            className="w-full"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="!mt-3 !mb-3 !text-[18px] py-2 px-4 rounded-md btn-org font-[600] transition"
          >
            {loading ? (
              <CircularProgress
                className="!w-[30px] !h-[30px]"
                color="inherit"
              />
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
