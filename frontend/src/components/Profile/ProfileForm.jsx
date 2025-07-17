import React, { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { BsCheckCircle } from "react-icons/bs";
import { MyProductContext } from "../../AppWrapper";
import axiosInstance from "../../utils/axiosInstance";

const ProfileForm = () => {
  const context = useContext(MyProductContext);
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    if (context.User) {
      setProfile({
        name: context.User.name || "",
        email: context.User.email || "",
        mobile: context.User.mobile || "",
      });
      setIsEmailVerified(context.User.verify_email);
    }
  }, [context.User]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!profile.name.trim()) {
      context.alertBox("error", "Name is required");
      setLoading(false);
      return;
    } else if (profile.name.length < 2) {
      context.alertBox("error", "Name must be at least 2 characters");
      setLoading(false);
      return;
    }

    if (!profile.mobile) {
      context.alertBox("error", "Mobile number is required");
      setLoading(false);
      return;
    } else if (!/^\d{10}$/.test(profile.mobile)) {
      context.alertBox("error", "Mobile must be a valid 10-digit number");
      setLoading(false);
      return;
    }

    try {
      context.setPageLoader(true);
      const token = localStorage.getItem("token");

      const res = await axiosInstance.put("/user/update-profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.data?.error) {
        context.alertBox("error", res.data.message);
      } else {
        context.alertBox("success", res.data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      context.alertBox("error", msg);
    } finally {
      setLoading(false);
      context.setPageLoader(false);
    }
  };

  return (
    <main className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md md:shadow-lg mt-4 md:mt-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
          Profile
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <TextField
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />

        <div className="w-full relative">
          <TextField
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
            disabled
            variant="outlined"
          />
          {isEmailVerified && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
              <span className="flex items-center gap-1 text-sm">
                <BsCheckCircle className="text-lg" />
                Verified
              </span>
            </div>
          )}
        </div>

        <TextField
          label="Mobile Number"
          name="mobile"
          value={profile.mobile}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />

        <div className="md:col-span-2">
          <Button
            type="submit"
            variant="contained"
            className="btn-org mt-2 w-full md:w-auto"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default ProfileForm;
