import React, { useState, useEffect, useContext } from "react";
import ProfileSidebar from "../components/Sidebar/ProfileSidebar";
import { Button, TextField } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import { MyProductContext } from "../context/AppContext";

const AddressPage = () => {
  const { User } = useContext(MyProductContext);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: "",
  });
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (User?._id) {
      setForm((prev) => ({ ...prev, userId: User._id }));
      fetchAddresses();
    }
  }, [User]);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(`/addresses/user/${User._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data || []);
    } catch (err) {
      console.error(
        "Failed to fetch addresses:",
        err.response?.data || err.message
      );
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!form.address_line.trim())
      newErrors.address_line = "Address line is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.state.trim()) newErrors.state = "State is required.";
    if (!form.country.trim()) newErrors.country = "Country is required.";

    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits.";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (editingId) {
        await axiosInstance.put(`/addresses/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axiosInstance.post("/addresses", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm({
        address_line: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
        userId: User?._id || "",
      });

      await fetchAddresses();
    } catch (err) {
      console.error(
        "Failed to save address:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setForm({
      address_line: address.address_line,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      mobile: address.mobile,
      userId: User?._id || "",
    });
    setEditingId(address._id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAddresses();
    } catch (err) {
      console.error(
        "Failed to delete address:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 py-6 w-full">
      {/* Sidebar */}
      <div className="hidden lg:block w-full lg:w-[300px]">
        <ProfileSidebar />
      </div>

      {/* Main Content */}
      <main className="w-full bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md md:shadow-lg mt-4 md:mt-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            Manage Addresses
          </h1>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Address Line"
            name="address_line"
            fullWidth
            variant="outlined"
            value={form.address_line}
            onChange={handleChange}
            error={!!errors.address_line}
            helperText={errors.address_line}
          />

          <TextField
            label="City"
            name="city"
            type="text"
            fullWidth
            variant="outlined"
            value={form.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />

          <TextField
            label="State"
            name="state"
            fullWidth
            variant="outlined"
            value={form.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
          />

          <TextField
            label="Pincode"
            name="pincode"
            fullWidth
            variant="outlined"
            value={form.pincode}
            onChange={handleChange}
            error={!!errors.pincode}
            helperText={errors.pincode}
          />

          <TextField
            label="Country"
            name="country"
            fullWidth
            variant="outlined"
            value={form.country}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
          />

          <TextField
            label="Mobile Number"
            name="mobile"
            fullWidth
            variant="outlined"
            value={form.mobile}
            onChange={handleChange}
            error={!!errors.mobile}
            helperText={errors.mobile}
          />

          <div className="md:col-span-2">
            <Button
              type="submit"
              variant="contained"
              className="btn-org mt-2 w-full md:w-auto"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                  ? "Update Address"
                  : "Add Address"}
            </Button>
          </div>
        </form>

        {/* Address List */}
        <div className="mt-8">
          {addresses.length === 0 ? (
            <p className="text-gray-500">No saved addresses. Please add one.</p>
          ) : (
            <ul className="space-y-4">
              {addresses.map((addr) => (
                <li
                  key={addr._id}
                  className="p-4 shadow rounded-md flex justify-between items-start"
                >
                  <div>
                    <p className="font-semibold">{addr.address_line}</p>
                    <p className="text-sm text-gray-600">
                      {addr.city}, {addr.state} - {addr.pincode}, {addr.country}
                    </p>
                    <p className="text-sm text-gray-600">
                      Mobile: {addr.mobile}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEdit(addr)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(addr._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default AddressPage;
