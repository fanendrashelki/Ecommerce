import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
 
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
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ProductSkeleton from "../../Components/ProductSkeleton";
import NotFound from "../../Components/NotFound";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skeletonloading, setSkeletonLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", image: null, parentId: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [expandedItems, setExpandedItems] = useState({});

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", image: null, parentId: "" });
    setOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      image: null,
      parentId: category.parentId || "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ name: "", image: null, parentId: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return alertBox("error", "Name is required");
    if (!editingId && !formData.parentId) return alertBox("error", "Select parent category");

    const token = localStorage.getItem("token");
    const payload = new FormData();
    payload.append("name", formData.name);
    if (formData.parentId) payload.append("parentId", formData.parentId);
    if (formData.image) payload.append("image", formData.image);
    setLoading(true);

    try {
      let response;
      if (editingId) {
        response = await axiosInstance.put(`categories/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertBox("success", response.data.message || "Updated successfully");
      } else {
        response = await axiosInstance.post("categories", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertBox("success", response.data.message || "Added successfully");
      }
      fetchCategories();
      handleClose();
    } catch (err) {
      alertBox("error", err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    const token = localStorage.getItem("token");
    try {
      await axiosInstance.delete(`categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alertBox("success", "Category deleted");
      fetchCategories();
    } catch (err) {
      alertBox("error", "Delete failed");
    }
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchCategories = async () => {
    setSkeletonLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {

      setTimeout(() => {
         setSkeletonLoading(false)
      }, 500);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const parents = filtered.filter((c) => !c.parentId);
  const totalPages = Math.ceil(parents.length / itemsPerPage);
  const current = parents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const subcategories = categories.filter((cat) => !cat.parentId).flatMap((cat) => cat.children || []);

  const getIndentStyle = (level) => {
    switch (level) {
      case 1:
        return "ml-6 text-blue-gray-700 font-medium";
      case 2:
        return "ml-12 text-gray-600 font-normal";
      default:
        return "text-black font-bold";
    }
  };

  const renderRows = (cat, level = 0) => (
    <React.Fragment key={cat._id}>
      <tr className="hover:bg-gray-50 transition cursor-pointer">
        <td className="py-3 px-5" onClick={() => toggleExpand(cat._id)}>
          <div className={`flex items-center gap-2 ${getIndentStyle(level)}`}>
            {level === 0 && <Avatar src={cat.image} size="sm" variant="rounded" alt={cat.name} />}
            <span className="capitalize">{cat.name}</span>
            {cat.children?.length > 0 && (
              <svg className={`w-4 h-4 ml-1 transition-transform ${expandedItems[cat._id] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </td>
        {level > 0 ? (
          <td className="py-3 px-5">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" color="blue" onClick={() => { handleOpenEdit(cat); setIsSubcategory(level === 1); }}>
                <FaEdit className="text-[18px]" />
              </Button>
              <Button size="sm" color="red" onClick={() => handleDelete(cat._id)}>
                <MdDelete className="text-[20px]" />
              </Button>
            </div>
          </td>
        ) : <td></td>}
      </tr>
      {expandedItems[cat._id] && cat.children?.map((child) => renderRows(child, level + 1))}
    </React.Fragment>
  );

  return (
    <div className="mt-5 mb-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
           <Input label="Search Category" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full sm:max-w-xs" />
        </div>
       
        <div className="flex  gap-4">
          <Button color="black" onClick={() => { handleOpenAdd(); setIsSubcategory(true); }}>Add SubCategory</Button>
          <Button color="black" onClick={() => { handleOpenAdd(); setIsSubcategory(false); }}>Add ThirdSubCategory</Button>
        </div>
      </div>

      {skeletonloading ? (
        <ProductSkeleton rows={10}/>
      ) : current.length > 0 ? (
        <Card>
          <CardBody className="px-0 pt-0 pb-2">
            <div className="overflow-x-scroll">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr>
                    <th className="border-b py-3 px-5 text-left uppercase text-xs font-bold text-blue-gray-400">Category</th>
                    <th className="border-b py-3 px-5 text-left uppercase text-xs font-bold text-blue-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>{current.map((cat) => renderRows(cat))}</tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-start items-center p-4 gap-2">
                <Button size="sm" color="black" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Prev</Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button key={page} size="sm" variant={page === currentPage ? "filled" : "outlined"} color="black" onClick={() => setCurrentPage(page)}>{page}</Button>
                ))}
                <Button size="sm" color="black" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</Button>
              </div>
            )}
          </CardBody>
        </Card>
      ) : (
        <NotFound title={"SubCategory"}/>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Edit" : "Add"} Category</DialogTitle>
        <DialogContent dividers>
          <div className="space-y-4">
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
            <div>
              <label htmlFor="parentId" className="block font-medium mb-1">
                {isSubcategory ? "Select Category" : "Select Subcategory"}
              </label>
              <select
                id="parentId"
                name="parentId"
                value={formData.parentId || "null"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    parentId: e.target.value === "null" ? null : e.target.value,
                  }))
                }
                className="w-full border rounded px-3 py-2 capitalize"
              >
                <option value="null">None</option>
                {(isSubcategory ? categories.filter((c) => !c.parentId) : subcategories).map((cat) => (
                  <option className="capitalize" key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.6C100 78.2 77.6 100.6 50 100.6 22.4 100.6 0 78.2 0 50.6 0 23 22.4 0.6 50 0.6 77.6 0.6 100 23 100 50.6ZM9.1 50.6C9.1 73.2 27.4 91.5 50 91.5 72.6 91.5 90.9 73.2 90.9 50.6 90.9 28 72.6 9.7 50 9.7 27.4 9.7 9.1 28 9.1 50.6Z" fill="currentColor" />
                <path d="M93.9 39C96.4 38.4 97.9 35.9 97 33.6 95.3 28.8 92.9 24.4 89.8 20.3 85.8 15.1 80.9 10.7 75.2 7.4 69.5 4.1 63.3 1.9 56.8 1.1 51.8 0.4 46.7 0.4 41.7 1.3 39.3 1.7 37.8 4.2 38.5 6.6 39.1 9 41.6 10.5 44 10.1 47.9 9.5 51.7 9.5 55.5 10 60.9 10.8 66 12.5 70.6 15.3 75.3 18 79.3 21.6 82.6 25.8 84.9 28.9 86.8 32.3 88.2 35.9 89.1 38.2 91.5 39.7 93.9 39Z" fill="currentFill" />
              </svg>
            ) : editingId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryTable;
