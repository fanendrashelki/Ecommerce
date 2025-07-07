import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Password = ({
  label,
  onChange,
  value,
  name,
  className = "",
  variant = "outlined",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`w-full mb-5 ${className}`}>
      <TextField
        id={name}
        name={name}
        label={label}
        variant={variant}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Password;
