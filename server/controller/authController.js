import User from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

// middleware

export const userVerify = asyncHandler(async (req, res, next) => {
  const username =
    req.method === "GET"
      ? req.query.username || req.params.username
      : req.body.username;

  if (!username) {
    throw new ErrorResponse("Username is required", 400);
  }

  const exist = await User.findOne({ username });

  if (!exist) {
    throw new ErrorResponse("No user found", 404);
  }

  next();
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) throw new ErrorResponse("No matching user found.", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorResponse("Wrong password, please try again", 401);
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  res.status(200).json({
    status: "success",
    message: "Login Successfull",
    username: user.username,
    token,
  });
});

export const register = asyncHandler(async (req, res, next) => {
  const { username, profile, password, email } = req.body;

  const usernameExist = await User.findOne({ username });

  if (usernameExist) {
    throw new ErrorResponse("Username already used", 400);
  }

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new ErrorResponse("Email Used already", 400);
  }

  const user = await User.create({ username, email, password, profile });

  user.password = undefined;
  res.status(201).json({
    status: "success",
    message: "User Registered",
    data: user,
  });
});

export const generateOTP = asyncHandler(async (req, res) => {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  res.status(201).json({
    code: req.app.locals.OTP,
  });
});

export const verifyOTP = asyncHandler(async (req, res) => {
  const { code } = req.query;
  if (!code) {
    throw new ErrorResponse("Code not correct", 400);
  }
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    res.status(201).json({
      message: "OTP Verified",
    });
  }
  throw new ErrorResponse("Invalid OTP", 400);
});

export const resetPassword = asyncHandler(async (req, res) => {
  if (!req.app.locals.resetSession)
    throw new ErrorResponse("Session Expired", 400);

  const { username, password } = req.body;

  if (!username || !password) {
    throw new ErrorResponse("Username and password are required", 400);
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await User.findOneAndUpdate(
    { username },
    { password: hashedPassword },
    { new: true }
  ).select("-password -__v");

  if (!updatedUser) {
    throw new ErrorResponse("Couldn't update user information", 500);
  }

  req.app.locals.resetSession = false;

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
    data: updatedUser,
  });
});

export const logout = async (req, res) => {
  res.json("logout request");
};

export const resetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).json({
      status: "success",
      message: "Access granted",
    });
  }
  throw new ErrorResponse("Session Expired", 400);
};

// export const registerMail = async (req, res) => {
//   console.log("Register mail request");
// };

export const authenticate = async (req, res) => {
  console.log("Authenticate request");

  res.end();
};
