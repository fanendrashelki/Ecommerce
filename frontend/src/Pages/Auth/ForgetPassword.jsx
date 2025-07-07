import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { MyProductContext } from "../../AppWrapper";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useContext(MyProductContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email);

    if (email === "") {
      context.alertBox("error", "Please enter email");
      setLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      context.alertBox("error", "Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      context.setPageLoader(true);
      const res = await axiosInstance.post("/user/forgot-password", { email });

      if (res?.data?.error) {
        context.alertBox("error", res.data.message);
      } else {
        context.alertBox("success", "OTP sent to your email");
        localStorage.setItem("email", email);
        localStorage.setItem("Action-type", "forgot-password");
        setEmail("");

        navigate("/verify-otp");
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
          Forgot Password
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-5">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              className="w-full"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full btn-org font-[600] !mt-3 !mb-3 !text-[18px] py-2 px-4 rounded-md  transition gap-5"
          >
            {loading ? (
              <>
                Sending
                <CircularProgress
                  className=" !w-[30px] !h-[30px]"
                  color="inherit"
                />
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
