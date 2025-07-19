import React, { useContext, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import axiosInstance from "../../utils/axiosInstance";
import { MyProductContext } from "../../AppWrapper";

const Address = ({ open, onClose }) => {
  const { User, setOpenAddress } = useContext(MyProductContext);

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    userId: User?._id || "",
  });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      // Close drawer after saving successfully
      setOpenAddress(false);
    } catch (err) {
      console.error(
        "Failed to save address:",
        err.response?.data || err.message
      );
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
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-[90vw] sm:w-[400px] p-4 overflow-y-auto h-full bg-white">
        <h2 className="text-xl font-bold mb-4 text-center text-[#35ac75]">
          Manage Addresses
        </h2>

        {/* Address Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            "address_line",
            "city",
            "state",
            "pincode",
            "country",
            "mobile",
          ].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.replace("_", " ").toUpperCase()}
              className="border border-[#35ac75] p-1 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          ))}
          <button
            type="submit"
            className="bg-[#35ac75] text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition font-semibold cursor-pointer"
          >
            {editingId ? "Update Address" : "Add Address"}
          </button>
        </form>

        {/* Address List */}
        <div className="mt-6 space-y-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-green-50"
            >
              <p className="font-medium">{address.address_line}</p>
              <p className="text-sm text-gray-600">
                {address.city}, {address.state}, {address.pincode}
              </p>
              <p className="text-sm text-gray-600">
                {address.country} - {address.mobile}
              </p>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="text-[#35ac75] hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default Address;
