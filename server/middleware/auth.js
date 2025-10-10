import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new ErrorResponse("Not authorized", 401);

  const token = authHeader.split(" ")[1];

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;

  next();
});

export const localVariables = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };

  next();
};
