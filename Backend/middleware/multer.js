import multer from "multer";
import { storage } from "../config/cloudinary.js";

// Middleware to set folder type dynamically
export const setUploadFolder = (folderType) => (req, res, next) => {
  req.folder = folderType;
  next();
};

const upload = multer({ storage });

export default upload;
