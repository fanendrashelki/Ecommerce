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


export function ResetPassword() {
 const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
     email: localStorage.getItem("email"),
     newPassword: "",
     confirmPassword: "",
   });
   const navigate = useNavigate();
  
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
      alertBox("error", "Please enter password");
       setLoading(false);
       return;
     }
     if (formData.confirmPassword === "") {
      alertBox("error", "Please enter Confirm Password");
       setLoading(false);
       return;
     }
     if (formData.confirmPassword !== formData.newPassword) {
      alertBox("error", "Passwords do not match");
       setLoading(false);
       return;
     }
 
     try {
     
       const res = await axiosInstance.post("/user/reset-password", formData);
 
       if (res?.data?.error) {
        alertBox("error", res.data.message);
       } else {
        alertBox("success", "password change successful");
         setFormData({ email: "", newPassword: "", confirmPassword: "" });
         localStorage.removeItem("email");
         navigate("/");
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
          <Typography variant="h2" className="font-bold mb-4">Reset password</Typography>
         
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
             New Password
            </Typography>
            <Input
              size="lg"
              placeholder="New Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
              name="newPassword"
             value={formData.newPassword}
            />
             <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirm Password
            </Typography>
            <Input
              size="lg"
              placeholder="Confirm Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
              name="confirmPassword"
              value={formData.confirmPassword}
            />
          </div>
           <div className="flex items-center justify-between gap-2 mt-6">
           
            
          </div>
          <Button className="mt-6" fullWidth type="submit">
            {
              loading? "loading ...":"reset password"
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

export default ResetPassword;
