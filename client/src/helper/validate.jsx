import { toast } from "sonner";

// USERNAME
const usernameVerify = (error = {}, values) => {
  if (!values.username) {
    error.username = toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }

  return error;
};

export const usernameValidate = (values) => {
  const errors = usernameVerify({}, values);

  return errors;
};

// PASSWORD

const passwordVerify = (error = {}, values) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (!values.password) {
    error.password = toast.error("Please Enter Your Password");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Please Enter A Valid Password");
  } else if (values.password.length < 8) {
    error.password = toast.error("Password should contain at least 8 charecter");
  } else if (!regex.test(values.password)) {
    error.password = toast.error('Password should contain at least one speciel character, one number, one Capitalletter and one small letter')
  }
};

export const passwordValidate = (values) => {
  const errors = passwordVerify({}, values);

  return errors;
};
