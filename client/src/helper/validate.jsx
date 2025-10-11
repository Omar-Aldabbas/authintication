import { toast } from "sonner";
import { authenticate } from "../api/api"

// USERNAME
const usernameVerify = (errors = {}, values) => {
  if (!values.username) {
    errors.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    errors.username = toast.error("Invalid Username");
  }

  return errors;
};

export const usernameValidate = async (values) => {
  const errors = usernameVerify({}, values);


  if (values.username) {
    try {
      const { status } = await authenticate(values.username);
      if (status !== 200) {
        toast.error("User doesn't exist ..");
        errors.exist = "User doesn't exist ..";
      }
    } catch {
      toast.error("User doesn't exist ..");
      errors.exist = "User doesn't exist ..";
    }
  }


  return errors;
};

// PASSWORD

const passwordVerify = (errors = {}, values) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (!values.password) {
    errors.password = toast.error("Please Enter Your Password");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Please Enter A Valid Password");
  } else if (values.password.length < 8) {
    errors.password = toast.error(
      "Password should contain at least 8 charecter"
    );
  } else if (!regex.test(values.password)) {
    errors.password = toast.error(
      "Password should contain at least one speciel character, one number, one Capitalletter and one small letter"
    );
  }

  return errors;
};

export const passwordValidate = async (values) => {
  const errors = passwordVerify({}, values);

  return errors;
};

// RESET

export const resetPasswordValidate = async (values) => {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirmPassword) {
    errors.exist = toast.error("Password Don't match");
  }

  return errors;
};

// RETISTER

export const registerValidate = async (values) => {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
};

const emailVerify = (errors = {}, values) => {
  const regex = /^(?!\.)([\w._-]+)@([\w-]+\.)+[\w-]{2,}$/i;
  if (!values.email) {
    errors.email = toast.error("Email is Required");
  } else if (values.email.includes(" ")) {
    errors.email = toast.error("Email should be Valid");
  } else if (!regex.test(values.email)) {
    errors.email = toast.error("Invalid Email Address");
  }

  return errors;
};

// Profile

export const profileValidate = async (values) => {
  const errors = emailVerify({}, values);

  return errors;
};
