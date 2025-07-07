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
import alertBox from "../../utils/toster";
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { LiaUserEditSolid } from "react-icons/lia";
import { useContext, useEffect, useState } from "react";
import { Avatar, CircularProgress, IconButton } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { myContext } from "../../App";
import { Toaster } from "react-hot-toast";

export function Profile() {
    
  const context = useContext(myContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
   const [profile, setProfile] = useState({ name: "",
    email: "",
    mobile: "",});
  const [passwordFields, setPasswordFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [editedProfile, setEditedProfile] = useState({ ...profile });


   useEffect(() => {
    setProfileImg(context.User?.avatar);
     if (context.User) {
      setProfile({
        name:context.User.name || "",
        email:context.User.email || "",
        mobile:context.User.mobile || "",
      })}
  }, [context.User?.avatar]);

  
// image update
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImg(URL.createObjectURL(file)); // Temporary preview

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("token");

      const res = await axiosInstance.post("/user/profile-image", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.data?.error) {
       alertBox("error", res.data.message);
      } else {
        const url = res?.data?.imageUrl;
        setProfileImg(url);
       alertBox("success", "Avatar updated successfully");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
     alertBox("error", message);
    } finally {
      setLoading(false);
      window.location.reload();
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

  

// update profile
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
     alertBox("error", "mobile number is required");
      setLoading(false);
      return;
    } else if (!/^\d{10}$/.test(editedProfile.mobile)) {
     alertBox("error", "mobile must be a valid 10-digit number");
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
      }
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
     alertBox("error", message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
      setOpenDialog(false)
      window.location.reload();
     
    }
  };

  return (
    <>
      <Card className="mx-3 mt-10 mb-6 border border-blue-gray-100 lg:mx-4 shadow-xl">
        <CardBody className="p-8">
          <div className="relative group w-[100px] h-[100px] flex items-center justify-center">
          {loading ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              className="bg-white myShadow w-[100px] h-[100px] rounded-full flex items-center justify-center"
            >
              <CircularProgress className="text-gray-500" color="inherit" />
            </IconButton>
          ) : (
            <Avatar
              alt="User Avatar"
              src={profileImg}
              sx={{ width: 100, height: 100 }}
              className="w-[100px] h-[100px] myShadow"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
          <input
            accept="image/*"
            type="file"
            id="profile-image"
            hidden
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                className="bg-white shadow w-[100px] h-[100px] rounded-full flex items-center justify-center"
              >
                <LiaUserEditSolid className="text-[40px] text-white" />
              </IconButton>
            </div>
          </label>
          </div>

          <div className="mt-10 grid gap-4">
            <div className="flex items-center justify-between mb-4">
              <Typography variant="h5" color="blue-gray">
                Profile Information
              </Typography>
              <div className="flex items-center gap-4">
            <Button color="black"   onClick={handleOpen}>
                Edit
              </Button>
               <Button onClick={() => setOpenPasswordDialog(true)} >
              Change Password
            </Button>
              </div>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </CardBody>
      </Card>

      {/* Profile Update Dialog */}
      <Dialog open={openDialog} handler={setOpenDialog} size="md">
        <DialogHeader>Update Profile</DialogHeader>
         <form onSubmit={handleSubmit}>
        <DialogBody>
         
            <div className="grid gap-6">
              <Input label="Name" name="name"  value={editedProfile.name} onChange={handleChange} />
            <Input label="Email" name="email" disabled value={editedProfile.email} onChange={handleChange} />
            <Input label="Mobile" name="mobile" value={editedProfile.mobile} onChange={handleChange} />
            <Input label="Location" name="location" value={editedProfile.location} onChange={handleChange} />
           
          </div>
          
          
        </DialogBody>
        <DialogFooter>
          <Button color="black" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button color="black"  type="submit" className="ml-2">
            Save
          </Button>
        </DialogFooter>
        </form>
        <Toaster/>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={openPasswordDialog} handler={setOpenPasswordDialog} size="sm">
        <DialogHeader>Change Password</DialogHeader>
        <DialogBody>
          <div className="grid gap-4">
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
                className="!absolute right-2 top-2 z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
              </IconButton>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                name="confirmPassword"
                value={passwordFields.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="black" onClick={() => setOpenPasswordDialog(false)}>
            Cancel
          </Button>
          <Button color="black" type="submit" className="ml-2">
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Profile;
