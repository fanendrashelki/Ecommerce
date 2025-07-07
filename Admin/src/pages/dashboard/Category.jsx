import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Button,
  Input,
} from "@material-tailwind/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../../utils/axiosInstance";
import alertBox from "../../utils/toster";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
   const [skeletonloading, setSkeletonLoading] = useState(false);
  const itemsPerPage = 10;

  const fetchCategories = async () => {
   setSkeletonLoading(true)
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data?.data);

      setCategories(res.data?.data || []);
    } catch (error) {
      console.error("Fetch failed:", error);
    }finally{ setSkeletonLoading(false)}
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", image: null });
    setPreview(null);
    setExistingImage("");
    setOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingId(category._id);
    setFormData({ name: category.name, image: null });
    setPreview(null);
    setExistingImage(category.image);
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({ name: "", image: null });
    setEditingId(null);
    setPreview(null);
    setExistingImage("");
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alertBox("error", "Category name is required");
      return;
    }
    if (!editingId && !formData.image) {
      alertBox("error", "Category image is required");
      return;
    }

    const token = localStorage.getItem("token");
    const payload = new FormData();
    payload.append("name", formData.name);
    if (formData.image) payload.append("image", formData.image);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
 setLoading(true);
    try {
      let response;
      if (editingId) {
        response = await axiosInstance.put(`categories/${editingId}`, payload, {
          headers,
        });
        alertBox(
          "success",
          response.data.message || "Category updated successfully"
        );
      } else {
        response = await axiosInstance.post("categories", payload, { headers });
        alertBox(
          "success",
          response.data.message || "Category added successfully"
        );
      }

     await fetchCategories();
      handleClose();
    } catch (error) {
      console.error("Error in category submission:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong while saving the category.";
      alertBox("error", errorMessage);
    }finally {
    setLoading(false);
  }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
       const response = await axiosInstance.delete(`categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  await fetchCategories();
  alertBox("success", "Category deleted");
     
    } catch (err) {
      console.error("Delete failed:", err);
      alertBox("error", "Delete failed");
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  return (
    <div className="mt-5 mb-8 flex flex-col gap-6">
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <Input
            label="Search Category"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:max-w-sm"
          />
        </div>

        <Button
          color="black"
          onClick={handleOpenAdd}
          className="w-full sm:w-auto"
        >
          Add Category
        </Button>
      </div>

      {/* Table */}

      {
        skeletonloading?
<div role="status" className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-900 md:p-6 dark:border-gray-900">
    {currentItems.map((item, index) => (
  <div key={index} className="flex items-center justify-between mb-2">
    <div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-800 w-24 mb-2.5"></div>
      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-900"></div>
    </div>
    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-900 w-12"></div>
  </div>
))}
</div>
:
      
      <Card>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Category", "subCategory", "Actions"].map((el) => (
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
                {currentItems.length > 0 ? (
                  currentItems.map((cat, idx) => {
                    const className = `py-3 px-5 ${
                      idx === currentItems.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={cat._id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar
                              src={cat.image}
                              alt={cat.name}
                              size="sm"
                              variant="rounded"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold capitalize"
                            >
                              {cat.name}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1">
                            {cat.children?.map((child) => (
                              <span
                                key={child.id}
                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize"
                              >
                                {child.name}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className={className}>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              color="blue"
                              onClick={() => handleOpenEdit(cat)}
                            >
                             <FaEdit className="text-[18px]" />
                            </Button>
                            <Button
                              size="sm"
                              color="red"
                              onClick={() => handleDelete(cat._id)}
                            >
                              < MdDelete className="text-[20px]" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="2" className="py-10 text-center">
                      <div className="text-gray-600">
                        <img
                          src="https://www.svgrepo.com/show/87468/empty-box.svg"
                          alt="Empty"
                          className="w-24 h-24 mx-auto mb-4 opacity-70"
                        />
                        <h2 className="text-xl font-semibold">
                          No Categories Found
                        </h2>
                        <p className="text-sm text-gray-500">
                          Please add some categories.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-start items-center p-4 gap-2">
              <Button
                size="sm"
                color="black"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Prev
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Button
                    key={pageNum}
                    size="sm"
                    variant={pageNum === currentPage ? "filled" : "outlined"}
                    color="black"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              )}

              <Button
                size="sm"
                color="black"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
}
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Edit" : "Add"} Category</DialogTitle>
        <DialogContent dividers>
          <div className="space-y-4">
            <div>
              <Typography variant="h6">Category Name</Typography>
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
              <div className="w-full sm:w-[50%]">
                <Typography variant="h6">Category Image</Typography>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-7 h-7 mb-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m5 4v8m0 0l-4-4m4 4l4-4"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag & drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="w-full sm:w-[50%] mt-5 sm:mt-0">
                {(preview || existingImage) && (
                  <div className="m-5">
                    <img
                      src={preview || existingImage}
                      alt="Preview"
                      className="w-[80%] sm:w-[50%] rounded shadow"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
  {loading ? (
   
    <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  

  ) : editingId ? "Update" : "Add"}
</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Category;
