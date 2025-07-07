import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import img from "../../asssets/sideIMG.jpg";
import alertBox from "../../utils/toster";
import axiosInstance from "../../utils/axiosInstance";

export function VerifyOtp() {
  const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Allow only digits
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
          newOtp[index - 1] = "";
        }
      } else {
        newOtp[index] = "";
      }
      setOtp(newOtp);
    }
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const joinedOtp = otp.join("");
    if (joinedOtp.length !== 6) {
      alertBox("error", "Please enter all 6 digits.");
      return;
    }
    const enteredOtp = Number(joinedOtp);

    try {
      const email = localStorage.getItem("email");
     

      const res = await axiosInstance.post("/user/verify-otp", {
        email,
        otp: enteredOtp,
        type: localStorage.getItem("Action-type"),
      });

      if (res?.data?.error) {
        alertBox("error", res.data.message);
      } else {
        alertBox("success", "OTP Verify");
       
        if (localStorage.getItem("Action-type") == "emailVerify") {
          navigate("/");
        } else if (localStorage.getItem("Action-type") == "forgot-password") {
          navigate("/reset-password");
        }
        
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      alertBox("error", message);
      console.error("Login error:", err);
    } finally {
      // localStorage.removeItem("email");
      localStorage.removeItem("Action-type");
      setLoading(false);
   
    }
  };


  return (
    <section className="m-8 flex gap-4 h-[480px] ">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            OTP Verify
          </Typography>
        </div>

        <form onSubmit={handleSubmit}  className="mt-8 mb-2 mx-auto w-full max-w-md">
          <div className="flex justify-evenly ">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-10 text-center text-xl border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            ))}
          </div>
 <Button className="mt-6" fullWidth type="submit">
            {
              loading? "loading ...":" Verify OTP"
            }
            
          </Button>
         
        </form>
      </div>

      <div className="w-2/5 h-full hidden lg:block">
        <img
          src={img}
          alt="Verification Illustration"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

      <Toaster />
    </section>
  );
}

export default VerifyOtp;
