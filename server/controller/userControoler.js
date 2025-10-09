import User from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/errorHandler.js";

export const getUser = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ErrorResponse("Username parameter is missing", 400);
  }

  const user = await User.findOne({ username }).select("-password");

  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});


export const updateUser = async (req, res) => {
  res.json("Update profile request");
};
