import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { myContext } from "../../App";
import img  from '../../asssets/sideIMG.jpg'
import alertBox, { TOAST_TYPES } from "../../utils/toster";
import axiosInstance from "../../utils/axiosInstance";



export function SignIn() {
  const Context = useContext(myContext);

   const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
   
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

   
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 

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

    if (formData.email === "") {
      alertBox(TOAST_TYPES.ERROR, "Please enter email");
  
      setLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
     alertBox(TOAST_TYPES.ERROR, "Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (formData.password === "") {
      alertBox("error", "Please enter password");
      setLoading(false);
      return;
    }

    try {
     
      const res = await axiosInstance.post("/user/login", formData);

      if (res?.data?.error) {
        alertBox("error", res.data.message);
      } else {
       
        setFormData({ email: "", password: "" });

        const { token } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", res.data.user.role);
      
    // Redirect based on role
    if ( res.data.user.role === "ADMIN" || res.data.user.role === "Admin"||res.data.user.role === "admin") {
        alertBox("success", res.data.message);
      navigate("/dashboard/home"); 
        Context.setLogin(true);
    } else {
      navigate("/");
      alertBox("error", "Access denied: admin only");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  
       
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
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
         
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
              value={formData.email}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type={showPassword ? "text" : "password"}
              size="lg"
              placeholder="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
               icon={
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="focus:outline-none"
                >
                  {showPassword ? <FaRegEyeSlash className="h-5 w-5" /> : <FaRegEye className="h-5 w-5" />}
                </button>
              }
              name="password"
              value={formData.password}
               onChange={handleChange}
            />
          </div>
           <div className="flex items-center justify-between gap-2 mt-6">
           
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="/forget-password">
                Forgot Password
              </a>
            </Typography>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            {
              loading? "loading ...":"Sign In"
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

export default SignIn;
