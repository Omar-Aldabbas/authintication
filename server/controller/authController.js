import User from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorResponse } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

// middleware

export const userVerify = asyncHandler( async(req, res, next) => {
  const {username} = req.method === "GET" ? req.query : req.body; 

  const exist = await User.findOne({ username });

  if(!exist) throw new ErrorResponse("No user found", 404);
  next()
})



export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) throw new ErrorResponse("No matching user found.", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorResponse("Wrong password, please try again", 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

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

export const generateOTP = async (req, res) => {
  res.json("generateOTP request");
};

export const verifyOTP = async (req, res) => {
  res.json("verifyOTP request");
};

export const resetPassword = async (req, res) => {
  res.json("resetPassword request");
};

export const logout = async (req, res) => {
  res.json("logout request");
};

export const resetSession = async (req, res) => {
  res.json("resetSession request");
};

export const registerMail = async (req, res) => {
  console.log("Register mail request");
};

export const authenticate = async (req, res) => {
  console.log("Authenticate request");
};
