import User from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/errorHandler.js";

export const getUser = asyncHandler(async (req, res) => {
  const { user } = req.params;

  if (!user) {
    throw new ErrorResponse("Username parameter is missing", 400);
  }

  const username = await User.findOne({ user }).select("-password");

  if (!username) {
    throw new ErrorResponse("User not found", 404);
  }

  res.status(200).json({
    status: "success",
    data: username,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  // const { id } = req.query;

  const { id } = req.user;

  const user = await User.findById(id);
  if (!user) throw new ErrorResponse(`User not found ${user}`, 404);

  const updates = req.body;

  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: updatedUser,
  });
});
