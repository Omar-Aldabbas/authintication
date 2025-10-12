import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { useFormik } from "formik";
import { registerValidate } from "../helper/validate";
import { useState } from "react";
import { convertToBase64 } from "../helper/convert";
import { register } from "../api/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      username: "Omar",
      email: "omar@test.com",
      password: "Qwert123$",
      confirmPassword: "Qwert123$",
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
      let registerUser = register(values);
      toast.promise(registerUser, {
        loading: `Creating an account`,
        success: <b>Account created</b>,
        error: (err) =>
          err?.message || err?.error ||
          (typeof err === "string" ? err : "Something went wrong"),
      });

      registerUser.then(function () {
        navigate("/");
      });
    },
  });

  const Onuploud = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="glass ">
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <div className="space-y-4 ">
            <h2 className="text-4xl font-semibold">Register</h2>
            <span className="text-lg text-gray-400">Join us</span>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col justify-center items-center py-4 ">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  alt="avatar"
                  className="profile_img"
                />
              </label>

              <input
                type="file"
                id="profile"
                name="profile"
                className="hidden"
                onChange={Onuploud}
              />
            </div>
            <div className=" flex flex-col justify-center items-center gap-3">
              <input
                type="text"
                id="username"
                placeholder="username*"
                className="textbox"
                {...formik.getFieldProps("username")}
              />
              <input
                type="email"
                id="email"
                placeholder="Email*"
                className="textbox"
                {...formik.getFieldProps("email")}
              />{" "}
              <input
                type="password"
                id="password"
                placeholder="password"
                className="textbox"
                {...formik.getFieldProps("password")}
              />{" "}
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password*"
                className="textbox"
                {...formik.getFieldProps("confirmPassword")}
              />
              <button type="submit" className="btn">
                Register
              </button>
            </div>

            <div>
              <span className="text-center text-gray-600">
                Alredy registered?{" "}
                <Link
                  to="/"
                  className="font-semibold hover:text-sky-400 transition"
                >
                  Log in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
