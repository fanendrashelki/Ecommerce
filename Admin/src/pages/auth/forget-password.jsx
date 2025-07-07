import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

import img  from '../../asssets/sideIMG.jpg'
import alertBox, { TOAST_TYPES } from "../../utils/toster";

import axiosInstance from "../../utils/axiosInstance";


export function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
    // console.log(e.target.value);
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    if (email === "") {
       alertBox("error", "Please enter email");
      setLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
       alertBox("error", "Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
       
      const res = await axiosInstance.post("/user/forgot-password", { email });

      if (res?.data?.error) {
         alertBox("error", res.data.message);
      } else {
         alertBox("success", "OTP sent to your email");
        localStorage.setItem("email", email);
        localStorage.setItem("Action-type", "forgot-password");
        setEmail("");

        navigate("/verify-otp");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
       alertBox("error", message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="m-8 flex gap-4 h-[480px] ">
      <div className="w-full lg:w-3/5 mt-10">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Forgot password</Typography>
         
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
              name="email"
              value={email}
            />
            
          </div>
           <div className="flex items-center justify-between gap-2 mt-6">
           
            
          </div>
          <Button className="mt-6" fullWidth type="submit">
            {
              loading? "loading ...":"forgot password"
            }
            
          </Button>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src={img}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
    
  );
}

export default ForgetPassword;
