import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { myContext } from "../../App";
import img from "../../asssets/sideIMG.jpg";
import alertBox, { TOAST_TYPES } from "../../utils/toster";
import axiosInstance from "../../utils/axiosInstance";

export function SignIn() {
  const Context = useContext(myContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    if (!email) {
      alertBox(TOAST_TYPES.ERROR, "Please enter email");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      alertBox(TOAST_TYPES.ERROR, "Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!password) {
      alertBox(TOAST_TYPES.ERROR, "Please enter password");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/user/login", formData);
      const { error, message, token, user } = res.data;

      if (error) {
        alertBox(TOAST_TYPES.ERROR, message);
      } else {
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);

        const userRole = user.role?.toLowerCase();
        if (userRole === "admin") {
          alertBox(TOAST_TYPES.SUCCESS, message);
          Context.setLogin(true);
          navigate("/dashboard/home");
        } else {
          alertBox(TOAST_TYPES.ERROR, "Access denied: admin only");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }

        setFormData({ email: "", password: "" });
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      alertBox(TOAST_TYPES.ERROR, message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-8 flex gap-4 h-[480px]">
      <div className="w-full lg:w-3/5 mt-10">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type={showPassword ? "text" : "password"}
              size="lg"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
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
            />
          </div>

          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <Link to="/forget-password">Forgot Password?</Link>
            </Typography>
          </div>

          <Button className="mt-6" fullWidth type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </div>

      <div className="w-2/5 h-full hidden lg:block">
        <img
          src={img}
          alt="side"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
