import React, { useState, useRef, useContext } from "react";
import { Button } from "@mui/material";
import { MyProductContext } from "../../context/AppContext";
import axiosInstance from "../../utils/axiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(MyProductContext);
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasted.length === 6) {
      const updatedOtp = pasted.split("").slice(0, 6);
      setOtp(updatedOtp);
      updatedOtp.forEach((digit, i) => {
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = digit;
        }
      });
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const joinedOtp = otp.join("");
    if (joinedOtp.length !== 6) {
      context.alertBox("error", "Please enter all 6 digits.");
      return;
    }
    const enteredOtp = Number(joinedOtp);

    try {
      const email = localStorage.getItem("email");

      context.setPageLoader(true);
      const res = await axiosInstance.post("/user/verify-otp", {
        email,
        otp: enteredOtp,
        type: localStorage.getItem("Action-type"),
      });

      if (res?.data?.error) {
        context.alertBox("error", res.data.message);
      } else {
        context.alertBox("success", "OTP Verify");

        const { token } = res.data;

        // Store in localStorage
        localStorage.setItem("token", token);

        context.setLogin(true);
        if (localStorage.getItem("Action-type") == "emailVerify") {
          navigate("/");
        } else if (localStorage.getItem("Action-type") == "forgot-password") {
          navigate("/change-password");
        }
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      context.alertBox("error", message);
      console.error("Login error:", err);
    } finally {
      // localStorage.removeItem("email");
      localStorage.removeItem("Action-type");
      setLoading(false);
      context.setPageLoader(false);
    }
  };

  return (
    <div className="w-full sm:w-[400px] mx-auto mt-10 mb-10 shadow-md">
      <div className="bg-white shadow-md rounded-md p-8">
        <h3 className="text-center text-lg font-semibold text-black mb-6">
          Verify OTP
        </h3>
        <form onSubmit={handleSubmit} onPaste={handlePaste}>
          <div className="flex justify-between gap-2 mb-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="number"
                inputMode="numeric"
                maxLength="1"
                className="w-10 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <Button
            type="submit"
            className="w-full btn-org font-[600] !mt-3 !mb-3 !text-[18px] py-2 px-4 rounded-md transition"
          >
            {loading ? (
              <CircularProgress
                className="!w-[30px] !h-[30px]"
                color="inherit"
              />
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
