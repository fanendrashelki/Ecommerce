// Enhanced CategoryTable with clear parent/sub/3rd level styling
import React, { useEffect, useState } from "react";
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
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [loading, setLoading] = useState(false);
   const [skeletonloading, setSkeletonLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    parentId: "",
  });

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
    }   finally {
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
   setSkeletonLoading(true)
    
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error("Fetch failed:", err);
    }finally{setSkeletonLoading(false)}
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filtered = categories.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
      <tr className="hover:bg-gray-50 transition cursor-pointer" >
        <td className="py-3 px-5" onClick={() => toggleExpand(cat._id)}>
          <div className={`flex items-center gap-2 ${getIndentStyle(level)}`}>
            {level === 0 && <Avatar src={cat.image} size="sm" variant="rounded" alt={cat.name} />}
            <span className="capitalize">
              {cat.name}
            </span>
            {cat.children?.length > 0 && (
              <svg className={`w-4 h-4 ml-1 transition-transform ${expandedItems[cat._id] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </td>
        
         {
                  level > 0 ?<td className="py-3 px-5">
                  <div className="flex flex-wrap gap-2">
                    <Button
                    size="sm"
                    color="blue"
                    onClick={() => {
                      handleOpenEdit(cat);
                      if (level > 1) {
                        setIsSubcategory(false);  
                      } else {
                        setIsSubcategory(true);   
                      }
                    }}
                  >
                   <FaEdit className="text-[18px]" />
                  </Button>
                    <Button size="sm" color="red" onClick={() => handleDelete(cat._id)}>
                       < MdDelete className="text-[20px]" />
                    </Button>
                  </div>
                </td> :<td></td>
                }
      </tr>
      {expandedItems[cat._id] && cat.children?.map((child) => renderRows(child, level + 1))}
      
    </React.Fragment>
  );

  return (
    <div className="mt-5 mb-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div> <Input label="Search Category" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full sm:max-w-xs" /></div>
       <div className="flex gap-4">
         <Button color="black" onClick={()=>{handleOpenAdd(); setIsSubcategory(true); }}>Add SubCategory</Button>
         <Button color="black" onClick={()=>{handleOpenAdd(); setIsSubcategory(false); }}>Add ThirdSubCategory</Button>
       </div>
       
      </div>
       {
        skeletonloading?
<div role="status" className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-900 md:p-6 dark:border-gray-900">
  
    
       {current.map((item, index) => (
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
          <div className="overflow-x-scroll">
            <table className="w-full min-w-[640px]">
              <thead >
                <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left"><p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Category</p></th>
                     <th className="border-b border-blue-gray-50 py-3 px-5 text-left"><p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">Actions</p></th>
                  
                </tr>
              </thead>
              <tbody>
                {current.length > 0 ? current.map((cat) => renderRows(cat)) : (
                  <tr>
                    <td colSpan={2} className="py-10 text-center">
                      <img src="https://www.svgrepo.com/show/87468/empty-box.svg" alt="Empty" className="w-24 h-24 mx-auto mb-4 opacity-70" />
                      <Typography variant="h6">No Categories Found</Typography>
                      <Typography variant="small" className="text-gray-500">Please add some categories.</Typography>
                    </td>
                  </tr>
                )}
              </tbody>
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
}
  {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Edit" : "Add"} Category</DialogTitle>
        <DialogContent dividers>
          <div className="space-y-4">
            <div>
              <Typography variant="h6">SubCategory Name</Typography>
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
           {
            isSubcategory? 
           ( <div>
              <label htmlFor="parentId" className="block font-medium mb-1">
                Select  Category
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
                {categories
                  .filter((cat) => !cat.parentId)
                  .map((cat) => (
                    <option className="capitalize"  key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>):( <div>
              <label htmlFor="parentId" className="block font-medium mb-1">
                Select  Category
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
                {subcategories.map((cat) => (
                    <option className="capitalize" key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>)
           }
           

            
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

export default CategoryTable;
