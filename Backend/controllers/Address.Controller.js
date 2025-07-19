import asyncHandler from "../utils/AsyncHandler.js";
import AddressModel from "../models/address.model.js";
import ErrorHandle from "../utils/ErrorHandler.js";

const addAddress = asyncHandler(async (req, res, next) => {
  const address = await AddressModel.create(req.body);
  res.status(201).json(address);
});

const getAddress = asyncHandler(async (req, res, next) => {
  const addresses = await AddressModel.find({
    userId: req.params.userId,
    status: true,
  });
  res.json(addresses);
});
const UpdateAddress = asyncHandler(async (req, res, next) => {
  const address = await AddressModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!address) return res.status(404).json({ error: "Address not found" });
  res.json(address);
});
const deleteAddress = asyncHandler(async (req, res, next) => {
  const address = await AddressModel.findByIdAndUpdate(
    req.params.id,
    { status: false },
    { new: true }
  );
  if (!address) return res.status(404).json({ error: "Address not found" });
  res.json({ message: "Address deleted successfully" });
});

export default { addAddress, getAddress, UpdateAddress, deleteAddress };
