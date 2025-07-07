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

function AdsBanner() {
  const [bannerImg, setBannerImg] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchBanner = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("/adsbanner", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBannerImg(res.data?.banner || []);
    } catch (err) {
      console.error("Fetch banners failed:", err);
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

    if (editId && selectedFile == null) {
      setSelectedFile(bannerImg.banner);
    }

    formData.append("banner", selectedFile);
    formData.append("active", isActive);
    setLoading(true);

    try {
      if (editId) {
        const response = await axiosInstance.put(
          `/adsbanner/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alertBox("success", response.data.message || "Updated successfully");
      } else {
        const response = await axiosInstance.post("/adsbanner", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}` },
        });
        alertBox("success", response.data.message || "Added successfully");
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
      const response = await axiosInstance.delete(`/adsbanner/${id}`, {
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
          Add Ads Banner
        </Button>
      </div>

      {bannerImg.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
          <img
            src="https://www.svgrepo.com/show/87468/empty-box.svg"
            alt="No Banners"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <h2 className="text-xl font-semibold">No Banner Found</h2>
          <p className="text-sm text-gray-500 mt-1">
            Please check back later or add a new banner.
          </p>
        </div>
      ) : (
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
      )}

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" scroll="body">
        <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold">
          {editId ? "Edit" : "Add"} Banner
        </DialogTitle>
        <DialogContent dividers>
          <form className="space-y-4 w-full">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full sm:w-[80%] md:w-[60%] h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021 4 4 0 0 0 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </label>
            </div>

            {(selectedFile || previewImage) && (
              <div className="flex justify-center mt-4">
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : previewImage}
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
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
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
                fill="none">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 ... 50 0.59082Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 ... 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : editId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdsBanner;
