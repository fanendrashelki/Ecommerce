import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdImageNotSupported } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Button,
  Input,
} from "@material-tailwind/react";
import { TextField } from "@mui/material";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../../utils/axiosInstance";
import alertBox from "../../utils/toster";
import NotFound from "../../Components/NotFound";
import ProductSkeleton from "../../Components/ProductSkeleton";

const ProductManager = () => {
  const DataInput = {
    name: "",
    description: "",
    brand: "",
    price: "",
    oldPrice: "",
    catId: "",
    catName: "",
    subCatId: "",
    subCatName: "",
    thirdSubCatId: "",
    thirdSubCatName: "",
    countInStore: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: "",
    size: [],
    productWeight: "",
    images: [],
  };
  const [products, setProducts] = useState([]);

  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(DataInput);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState([]);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [skeletonloading, setSkeletonLoading] = useState(false);



  const [Categories, setCategories] = useState([]);
  const [SubCategories, setsubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedThirdSubCategory, setSelectedThirdSubCategory] =
    useState(null);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const rescat = await axiosInstance.get("categories");
      setCategories(rescat.data?.data || []); 
    } catch (err) {
      console.error("Fetch categories failed:", err);
    }
  };

  const fetchProduct = async () => {
    setSkeletonLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get(
        `/product?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(res.data?.products || []);
      setTotalPages(res.data?.totalPages);
    } catch (error) {
      console.error("Fetch products failed:", error);
    } finally {
      setTimeout(() => {
        setSkeletonLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchProduct(page);
    fetchCategories();
  }, [page]);

  useEffect(() => {
    setSearchParams({ page });
  }, [page]);
  const handleCategoryChange = (e) => {
    const selected = Categories.find((cat) => cat._id === e.target.value);
    setSelectedCategory(selected || null);
    setSelectedSubCategory(null);
    setSelectedThirdSubCategory(null);
    setFormData({
      ...formData,
      catId: selected?._id || "",
      catName: selected?.name || "",
      subCatId: "",
      subCatName: "",
      thirdSubCatId: "",
      thirdSubCatName: "",
    });
  };

  const handleSubCategoryChange = (e) => {
    const selected = selectedCategory?.children?.find(
      (sub) => sub._id === e.target.value
    );
    setSelectedSubCategory(selected || null);
    setSelectedThirdSubCategory(null);
    setFormData({
      ...formData,
      subCatId: selected?._id || "",
      subCatName: selected?.name || "",
      thirdSubCatId: "",
      thirdSubCatName: "",
    });
  };

  const handleThirdSubCategoryChange = (e) => {
    const selected = selectedSubCategory?.children?.find(
      (third) => third._id === e.target.value
    );
    setSelectedThirdSubCategory(selected || null);
    setFormData({
      ...formData,
      thirdSubCatId: selected?._id || "",
      thirdSubCatName: selected?.name || "",
    });
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(DataInput);
    setPreview(null);
    setExistingImage("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedThirdSubCategory(null);
    setOpen(true);
  };

  const handleOpenEdit = (items) => {
    setEditingId(items._id);
    setFormData({
      name: items.name,
      description: items.description,
      brand: items.brand,
      price: items.price,
      oldPrice: items.oldPrice,
      catId: items.category.catId._id,
      catName: items.category.catName,
      subCatId: items.category?.subCatId?._id || "",
      subCatName: items.category?.subCatName || "",
      thirdSubCatId: items.category?.thirdSubCatId?._id || "",
      thirdSubCatName: items.category?.thirdSubCatName || "",
      countInStore: items.countInStore,
      rating: items.rating,
      isFeatured: items.isFeatured,
      discount: items.discount,
      productRam: items.productRam,
      size: items.size,
      productWeight: items.productWeight,
      images: preview,
    });
    setPreview(null);
    setExistingImage(items.images);
    setOpen(true);

    const cat = Categories.find((c) => c._id === items.category.catId._id);
    const sub = cat?.children?.find(
      (s) => s._id === items.category.subCatId._id
    );
    const third = sub?.children?.find(
      (t) => t._id === items.category.thirdSubCatId._id
    );
    setSelectedCategory(cat || null);
    setSelectedSubCategory(sub || null);
    setSelectedThirdSubCategory(third || null);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setPreview(null);
    setExistingImage("");
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedThirdSubCategory(null);
  };

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "images") {
    const fileArray = Array.from(files);
    setFormData((prev) => ({ ...prev, images: fileArray }));
    const imagePreviews = fileArray.map((file) => URL.createObjectURL(file));
    setPreview(imagePreviews);
  } else {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      const price = parseFloat(name === "price" ? value : updated.price);
      const oldPrice = parseFloat(name === "oldPrice" ? value : updated.oldPrice);

      if (!isNaN(price) && !isNaN(oldPrice) && oldPrice > 0 && price >= 0) {
        const discount = Math.round(((oldPrice - price) / oldPrice) * 100);
        updated.discount = discount > 0 ? discount : 0;
      } else {
        updated.discount = 0;
      }

      return updated;
    });
  }
};


  const validateForm = () => {
    if (!formData.name.trim()) return alertBox("error", "Name is required");
    if (!formData.description.trim())
      return alertBox("error", "Description is required");
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      return alertBox("error", "Valid Price is required");

    if (Number(formData.oldPrice) <= 0)
      return alertBox("error", "Old price is required");

    const discount = Number(formData.discount);

    if (isNaN(discount) || discount < 0 || discount > 100) {
      return alertBox("error", "Discount must be between 0 and 100");
    }
    if (!formData.brand.trim()) return alertBox("error", "Brand is required");
    // for update this validation not apply
    if (!editingId) {
      if (!formData.images || formData.images.length === 0)
        return alertBox("error", "At least one image is required");

      if (!formData.catId) {
        return alertBox("error", "Main Category is required");
      }

      if (selectedCategory?.children?.length > 0) {
        if (!formData.subCatId) {
          return alertBox(
            "error",
            "Subcategory is required for the selected Main Category"
          );
        }
      }
      if (selectedSubCategory?.children?.length > 0) {
        if (formData.subCatId && !formData.thirdSubCatId) {
          return alertBox(
            "error",
            "Third-level Subcategory is required when Subcategory is selected"
          );
        }
      }
    }

    if (
      !formData.countInStore ||
      isNaN(formData.countInStore) ||
      Number(formData.countInStore) < 0
    )
      return alertBox("error", "Valid count in store is required");

    return true;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!validateForm()) return;
    setLoading(true);

    const data = new FormData();

    // Append all form data fields
    for (const key in formData) {
      if (key === "images" && formData.images?.length) {
        formData.images.forEach((img) => data.append("images", img));
      } else if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }
    try {
      let response;
      if (editingId) {
        response = await axiosInstance.put(`/product/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertBox("success", response.data.message || "Updated successfully");
      } else {
        response = await axiosInstance.post("/product", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alertBox("success", response.data.message || "Added successfully");
      }
      fetchProduct();
      handleClose();
    } catch (err) {
      alertBox("error", err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.delete(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchProduct();
      alertBox("success", res.data?.message);
    } catch (err) {
      alertBox("error", "Delete failed");
    }
  };

  const handleSearch = async (e) => {
   
    setSkeletonLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get(
        `/product/filter?keyword=${ e.target.value}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(res.data?.products || []);
      setTotalPages(res.data?.totalPages);
    } catch (error) {
      console.error("Fetch products failed:", error);
    } finally {
      setTimeout(() => {
        setSkeletonLoading(false);
      }, 500);
    }
  };
const handleSearchByCatId = async(e) => {
  const selectedCatId = e.target.value;
  const matchedCategory = Categories.find((val) => val._id === selectedCatId);
  if (matchedCategory) {
    setsubCategories(matchedCategory.children || []);
  } else {
    setsubCategories([]);
  }

  setSkeletonLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get(
        `/product/getProductBycatId/${selectedCatId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(res.data?.products || []);
      setTotalPages(res.data?.totalPages);
    } catch (error) {
      setProducts([])
      console.error("Fetch products failed:", error);
    } finally {
      setTimeout(() => {
        setSkeletonLoading(false);
      }, 500);
    }
};

const handleSearchBySubCatId = async (e) => {
  const selectedSubCatId = e.target.value;
  setSkeletonLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get(
        `/product/getProductBySubcatId/${selectedSubCatId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(res.data?.products || []);
      setTotalPages(res.data?.totalPages);
    } catch (error) {
      setProducts([])
      console.error("Fetch products failed:", error);
    } finally {
      setTimeout(() => {
        setSkeletonLoading(false);
      }, 500);
    }
};

  return (
    <div className="mt-5 mb-8 flex flex-col gap-6">
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center  justify-between items-center gap-4">
        <div className="flex items-center justify-center p-2">
          <TextField
            variant="outlined"
            size="small"
            label="Search Product"
            type="text"
            onChange={handleSearch}
            sx={{
              m: 1,
              minWidth: 200,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#000", 
                },
              },
              "& .MuiInputLabel-root": {
                color: "#777",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#000",
              },
            }}
          />
        </div>
        <div>
          <FormControl
            sx={{
              m: 1,
              minWidth: 200,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#000", 
                },
              },
              "& .MuiInputLabel-root": {
                color: "#777",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#000",
              },
            }}
            size="small"
          >
            <InputLabel>Category</InputLabel>
            <Select label="Category" onChange={handleSearchByCatId}>
              <MenuItem value="">Select Category</MenuItem>
              {Categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
        {
          SubCategories.length >0 &&( 

          <FormControl
            sx={{
              m: 1,
              minWidth: 200,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#000",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#777",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#000",
              },
            }}
            size="small"
          >
            <InputLabel>Subcategory</InputLabel>
            <Select label="Category" onChange={handleSearchBySubCatId}>
              <MenuItem value="">Select Subategory</MenuItem>
              {SubCategories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
       ) 
        }
        </div>

        <div>
          <Button
            color="black"
            onClick={handleOpenAdd}
            className="w-full sm:w-auto"
          >
            Add Product
          </Button>
        </div>
      </div>

      {skeletonloading ? (
        <ProductSkeleton rows={10} />
      ) : products.length > 0 ? (
        <Card>
          <CardBody className="px-0 pt-0 pb-2">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "Product Name",
                      "price",
                      "category",
                      "Subcategory",
                      "Stock",
                      "Action",
                    ].map((el) => (
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
                  {products.map((items, idx) => {
                    const className = `py-3 px-5 ${
                      idx === products.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={items._id}>
                        <td className={`${className} w-[400px]`}>
                          <div className="flex items-center gap-4">
                            {items?.images?.[0]?.url ? (
                              <Avatar
                                src={items.images[0].url}
                                alt={items.name}
                                size="sm"
                                variant="rounded"
                              />
                            ) : (
                              <MdImageNotSupported size={40} />
                            )}

                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-sm  font-semibold mt-1 text-black overflow-hidden"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2, // Limit to 2 lines
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                minHeight: "2.75rem", // Ensures enough space for 2 lines
                              }}
                            >
                              {items.name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>{items.price}</td>
                        <td className={className}>{items.category.catName}</td>
                        <td className={className}>
                          {items.category.subCatName}
                        </td>
                        <td className={className}>{items.countInStore}</td>
                        <td className={className}>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              color="blue"
                              onClick={() => handleOpenEdit(items)}
                            >
                              <FaEdit className="text-[18px]" />
                            </Button>
                            <Button
                              size="sm"
                              color="red"
                              onClick={() => handleDelete(items._id)}
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
            {totalPages > 1 && (
              <div className="flex flex-wrap justify-start items-center p-4 gap-2">
                <Button
                  size="sm"
                  color="black"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Prev
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Button
                      key={pageNum}
                      size="sm"
                      variant={pageNum === page ? "filled" : "outlined"}
                      color="black"
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                )}

                <Button
                  size="sm"
                  color="black"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      ) : (
        <NotFound title={"Product"} />
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent dividers>
          <div className="space-y-6">
            {/* Product Name & Description */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price Info */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <Input
                label="Old Price"
                name="oldPrice"
                type="number"
                value={formData.oldPrice}
                onChange={handleChange}
              />
              <Input
                label="Discount (%)"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            {/* Brand */}
            <Input
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />

            {/* Image Upload & Preview */}
            <div className="flex flex-col gap-4">
              {/* File Upload Box */}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full max-w-md p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500 transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-500 dark:text-gray-400"
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
                    <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                      Click to upload{" "}
                      <span className="font-semibold">or drag & drop</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG, or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Image Preview */}
              <div className="flex flex-wrap gap-4">
                {(preview ? preview : existingImage || []).map((img, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 overflow-hidden rounded-lg border border-gray-200 shadow-md"
                  >
                    <img
                      src={img.url || img}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Category Selection */}

            <div className="grid sm:grid-cols-3 gap-4">
              {/* Category */}
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory?._id || ""}
                  onChange={handleCategoryChange}
                  label="Category"
                  required
                >
                  <MenuItem value="">Select Category</MenuItem>
                  {Categories.map((cat) => (
                    <MenuItem
                      className="capitalize"
                      key={cat._id}
                      value={cat._id}
                    >
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Subcategory */}
              {selectedCategory?.children?.length > 0 && (
                <FormControl fullWidth size="small">
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    value={selectedSubCategory?._id || ""}
                    onChange={handleSubCategoryChange}
                    label="Subcategory"
                  >
                    <MenuItem value="">Select Subcategory</MenuItem>
                    {selectedCategory.children.map((sub) => (
                      <MenuItem
                        className="capitalize"
                        key={sub._id}
                        value={sub._id}
                      >
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Third Subcategory */}
              {selectedSubCategory?.children?.length > 0 && (
                <FormControl fullWidth size="small">
                  <InputLabel>Third Subcategory</InputLabel>
                  <Select
                    value={selectedThirdSubCategory?._id || ""}
                    onChange={handleThirdSubCategoryChange} //
                    label="Third Subcategory"
                  >
                    <MenuItem value="">Select Third Subcategory</MenuItem>
                    {selectedSubCategory.children.map((third) => (
                      <MenuItem
                        className="capitalize"
                        key={third._id}
                        value={third._id}
                      >
                        {third.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
            {/* RAM, Size, Weight */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Input
                label="RAM (comma separated)"
                name="productRam"
                value={formData.productRam}
                onChange={handleChange}
              />
              <Input
                label="Sizes (comma separated)"
                name="size"
                value={formData.size}
                onChange={handleChange}
              />
              <Input
                label="Weight"
                name="productWeight"
                value={formData.productWeight}
                onChange={handleChange}
              />
            </div>

            {/* Stock & Rating */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Count In Store"
                name="countInStore"
                type="number"
                value={formData.countInStore}
                onChange={handleChange}
                min={0}
                required
              />
              <Input
                label="Rating"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                min={0}
                max={5}
              />
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
              />
              <Typography variant="small">Mark as Featured</Typography>
            </div>
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <svg
                aria-hidden="true"
                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : editingId ? (
              "Update"
            ) : (
              "Add"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductManager;
