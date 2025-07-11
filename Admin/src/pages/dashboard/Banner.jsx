import {
  Card,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../../utils/axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import alertBox from "../../utils/toster";
import NotFound from "../../Components/NotFound";
import ProductSkeleton from "../../Components/ProductSkeleton";

function Banner() {
  const [bannerImg, setBannerImg] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [skeletonloading, setSkeletonLoading] = useState(false);
  const fetchBanner = async () => {
    setSkeletonLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("banner", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBannerImg(res.data?.banner || []);
    } catch (err) {
      console.error("Fetch banners failed:", err);
    } finally {
      setTimeout(() => {
         setSkeletonLoading(false)
      }, 500);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setIsActive(false);
    setEditId(null);
    setPreviewImage(null);
  };

  const handleAddBanner = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (editId && !selectedFile) {
      setSelectedFile(bannerImg.banner);
    }

    formData.append("banner", selectedFile);
    formData.append("active", isActive);

    setLoading(true);
    try {
      if (editId) {
        const res = await axiosInstance.put(`/banner/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertBox("success", res.data.message || "Updated successfully");
      } else {
        const res = await axiosInstance.post("/banner", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alertBox("success", res.data.message || "Added successfully");
      }

      fetchBanner();
      handleClose();
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.delete(`/banner/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alertBox("success", response.data.message || "Deleted successfully");
      fetchBanner();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleOpenEdit = (item) => {
    setEditId(item._id);
    setIsActive(item.active);
    setSelectedFile(null);
    setPreviewImage(item.banner);
    setOpen(true);
  };

  return (
    <div className="mt-5 mb-8 flex flex-col gap-6 px-2 sm:px-4">
      <div className="flex justify-end">
        <Button color="black" onClick={handleAddBanner}>
          Add Banner
        </Button>
      </div>

      {skeletonloading ? (
        <ProductSkeleton rows={10}/>
      ) : bannerImg.length > 0 ? (
        <Card>
          <CardBody className="px-0 pt-0 pb-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Banner", "Active", "Action"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bannerImg.map((item, key) => {
                    const className = `py-3 px-5 ${
                      key === bannerImg.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    return (
                      <tr key={item._id}>
                        <td className={className}>
                          <img
                            src={item.banner}
                            alt="banner"
                            className="w-[100px] rounded-md object-cover"
                          />
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={item.active ? "green" : "red"}
                            value={item.active ? "Active" : "Inactive"}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              color="blue"
                              onClick={() => handleOpenEdit(item)}
                            >
                              <FaEdit className="text-[18px]" />
                            </Button>
                            <Button
                              size="sm"
                              color="red"
                              onClick={() => handleDelete(item._id)}
                            >
                              <MdDelete className="text-[20px]" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      ) : (
       <NotFound title={"Banner"}/>
      )}

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        scroll="body"
      >
        <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold">
          {editId ? "Edit" : "Add"} Banner
        </DialogTitle>
        <DialogContent dividers>
          <form className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full sm:w-[90%] md:w-[70%] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </label>
            </div>

            {(selectedFile || previewImage) && (
              <div className="flex justify-center mt-4">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : previewImage
                  }
                  alt="Preview"
                  className="w-[250px] sm:w-[300px] rounded-lg object-contain"
                />
              </div>
            )}

            <label className="inline-flex items-center cursor-pointer mt-2">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {isActive ? "Active" : "Inactive"}
              </span>
            </label>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 ... 50 0.59082Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 ... 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : editId ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Banner;
