
/***params */

export const login = async (req,res) => {
 res.json("login request")
}

export const register = async (req,res) => {
 res.json("register request")
}

export const generateOTP = async (req,res) => {
 res.json("generateOTP request")
}

export const verifyOTP = async (req,res) => {
 res.json("verifyOTP request")
}

export const resetPassword = async (req,res) => {
 res.json("resetPassword request")
}

export const logout = async (req,res) => {
 res.json("logout request")
}

export const resetSession = async (req,res) => {
 res.json("resetSession request")
}

export const registerMail = async (req, res) => {
  console.log("Register mail request")
}

export const authinticate = async (req,res) => {
  console.log("Authinticate request")
}