import React, { useState } from "react";
import { TextField, Button, Divider } from "@mui/material";

const products = [
  { name: "Product 1", price: 40 },
  { name: "Product 2", price: 25 },
  { name: "Product 3", price: 60 },
  { name: "Product 4", price: 10 },
  { name: "Product 5", price: 20 },
  { name: "Product 6", price: 15 },
];

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    console.log("Checkout Data:", formData);
    // Process order
  };

  const totalPrice = products.reduce((total, item) => total + item.price, 0);

  return (
    <div className="w-full sm:w-[95%] max-w-6xl mx-auto mt-10 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Form */}
        <div className="bg-white shadow-md rounded-md p-8">
          <h2 className="text-center text-lg font-semibold text-black mb-6">
            Billing Information
          </h2>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div className="w-full mb-5">
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-5">
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-5">
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="w-full mb-5">
              <TextField
                label="Address"
                name="address"
                fullWidth
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className=" w-full mb-5 grid grid-cols-2 gap-4">
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <TextField
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
            <TextField
              label="Country"
              name="country"
              fullWidth
              value={formData.country}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-md p-8">
          <h2 className="text-center text-lg font-semibold text-black mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto pr-2">
            {products.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <p>{item.name}</p>
                <p>${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Divider />
          <div className="flex justify-between font-semibold text-base mt-4 mb-4">
            <p>Total</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className=" py-2 px-4 rounded-md btn-org font-[600] transition"
            onClick={handleCheckout}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
