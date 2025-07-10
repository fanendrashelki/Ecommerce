import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { LiaUserEditSolid } from "react-icons/lia";
import axiosInstance from "../../utils/axiosInstance";
import { myContext } from "../../App";
import alertBox from "../../utils/toster";
import { Toaster } from "react-hot-toast";
import imageCompression from "browser-image-compression";

export function Profile() {
  const context = useContext(myContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    location: "",
  });
  const [passwordFields, setPasswordFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [skeletonloading, setSkeletonLoading] = useState(false);
  useEffect(() => {
    setSkeletonLoading(true)
    setProfileImg(context.User?.avatar);
    if (context.User) {
      setProfile({
        name: context.User.name || "",
        email: context.User.email || "",
        mobile: context.User.mobile || "",
        location: context.User.location || "",
      });
    }
    setTimeout(() => {
        setSkeletonLoading(false)
    }, 500);
    
  }, [context.User]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);

      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 600,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const previewUrl = URL.createObjectURL(compressedFile);
      setProfileImg(previewUrl);

      const formData = new FormData();
      formData.append("image", compressedFile);
      const token = localStorage.getItem("token");

      const res = await axiosInstance.post("/user/profile-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.error) {
        alertBox("error", res.data.message);
      } else {
        setProfileImg(res?.data?.imageUrl);
        alertBox("success", "Avatar updated successfully");
      }

    } catch (err) {
      alertBox("error", err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setEditedProfile({ ...profile });
    setOpenDialog(true);
  };

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordFields({ ...passwordFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!editedProfile.name.trim()) {
      alertBox("error", "Name is required");
      setLoading(false);
      return;
    } else if (editedProfile.name.length < 2) {
      alertBox("error", "Name must be at least 2 characters");
      setLoading(false);
      return;
    }

    if (!editedProfile.mobile) {
      alertBox("error", "Mobile number is required");
      setLoading(false);
      return;
    } else if (!/^\d{10}$/.test(editedProfile.mobile)) {
      alertBox("error", "Mobile must be a valid 10-digit number");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.put("/user/update-profile", editedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.error) {
        alertBox("error", res.data.message);
      } else {
        alertBox("success", res.data?.message);
        setProfile(editedProfile);
      }
    } catch (err) {
      alertBox("error", err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <>

    {
      skeletonloading ? (
      <div className="mx-4 my-10 p-7  bg-white rounded-lg shadow animate-pulse ">
  <div className="flex items-center space-x-6">
    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
    <div className="flex-1">
      <div className="w-48 h-6 bg-gray-300 rounded mb-2"></div>
      <div className="w-36 h-4 bg-gray-200 rounded"></div>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-48 h-6 bg-gray-200 rounded"></div>
    </div>
    <div>
      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-60 h-6 bg-gray-200 rounded"></div>
    </div>
    <div>
      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-40 h-6 bg-gray-200 rounded"></div>
    </div>
    <div>
      <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-36 h-6 bg-gray-200 rounded"></div>
    </div>
  </div>

  <div className="flex space-x-4 mt-6">
    <div className="w-24 h-10 bg-gray-300 rounded-lg"></div>
    <div className="w-40 h-10 bg-gray-300 rounded-lg"></div>
  </div>
</div>
):(<Card className="mx-2 my-6 border border-blue-gray-100 shadow-md lg:mx-4">
        <CardBody className="p-4 sm:p-6">
          {/* Avatar */}
          <div className="relative group w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto sm:mx-0 flex items-center justify-center">
            {loading ? (
              <IconButton className="bg-white w-full h-full rounded-full">
                <CircularProgress color="inherit" />
              </IconButton>
            ) : (
              <Avatar src={profileImg} className="!w-24 !h-24 !sm:w-28 !sm:h-28 !md:w-32 !md:h-32 rounded-full" />
            )}
            <input
              accept="image/*"
              capture="environment"
              type="file"
              id="profile-image"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="profile-image">
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer flex items-center justify-center transition-opacity duration-300">
                <LiaUserEditSolid className="text-white text-3xl" />
              </div>
            </label>
          </div>

          {/* Profile Info */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <Typography variant="h5" color="blue-gray">
              Profile Information
            </Typography>
            <div className="mt-4 sm:mt-0 flex gap-3 flex-wrap">
              <Button size="sm" color="black" onClick={handleOpen}>
                Edit
              </Button>
              <Button size="sm" color="black" onClick={() => setOpenPasswordDialog(true)}>
                Change Password
              </Button>
            </div>
          </div>

          {/* Data Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Typography className="text-sm text-blue-gray-700">Name</Typography>
              <Typography className="font-medium">{profile.name}</Typography>
            </div>
            <div>
              <Typography className="text-sm text-blue-gray-700">Email</Typography>
              <Typography className="font-medium">{profile.email}</Typography>
            </div>
            <div>
              <Typography className="text-sm text-blue-gray-700">Mobile</Typography>
              <Typography className="font-medium">{profile.mobile}</Typography>
            </div>
            <div>
              <Typography className="text-sm text-blue-gray-700">Location</Typography>
              <Typography className="font-medium">{profile.location}</Typography>
            </div>
          </div>
        </CardBody>
      </Card>)
    }
      

      {/* Update Profile Dialog */}
      <Dialog open={openDialog} handler={setOpenDialog} size="md">
        <DialogHeader>Update Profile</DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody className="grid gap-4">
            <Input label="Name" name="name" value={editedProfile.name} onChange={handleChange} />
            <Input
              label="Email"
              name="email"
              value={editedProfile.email}
              onChange={handleChange}
              disabled
            />
            <Input
              label="Mobile"
              name="mobile"
              value={editedProfile.mobile}
              onChange={handleChange}
            />
            <Input
              label="Location"
              name="location"
              value={editedProfile.location}
              onChange={handleChange}
            />
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="black" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" color="black" className="ml-2">
              Save
            </Button>
          </DialogFooter>
        </form>
        <Toaster />
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} handler={setOpenPasswordDialog} size="sm">
        <DialogHeader>Change Password</DialogHeader>
        <DialogBody className="grid gap-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="New Password"
              name="newPassword"
              value={passwordFields.newPassword}
              onChange={handlePasswordChange}
            />
            <IconButton
              size="small"
              className="!absolute right-2 top-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
            </IconButton>
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            name="confirmPassword"
            value={passwordFields.confirmPassword}
            onChange={handlePasswordChange}
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="black" onClick={() => setOpenPasswordDialog(false)}>
            Cancel
          </Button>
          <Button type="submit" color="black" className="ml-2">
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
