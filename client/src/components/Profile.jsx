import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { useFormik } from "formik";
import { profileValidate } from "../helper/validate";
import { useState } from "react";
import { convertToBase64 } from "../helper/convert";

export const Profile = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: "omar",
      lastName: "Aldabbas",
      number: "0454432546",
      email: "omar@test.com",
      address: "Jordan",
    },
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  const Onuploud = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="glass w-full max-w-3xl p-8 rounded-2xl">
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <div className="space-y-2">
            <h2 className="text-4xl font-semibold">Profile</h2>
            <span className="text-lg text-gray-400">
              Customize your profile
            </span>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
          >
            {/* Profile Image (spans both columns) */}
            <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-center py-4">
              <label htmlFor="profile" className="cursor-pointer">
                <img
                  src={file || avatar}
                  alt="avatar"
                  className="profile_img w-32 h-32 object-cover rounded-full border-4 border-gray-300 hover:border-sky-400 transition"
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

            {/* Two-column fields */}
            <input
              type="text"
              id="firstName"
              placeholder="First Name*"
              className="textbox"
              {...formik.getFieldProps("firstName")}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name*"
              className="textbox"
              {...formik.getFieldProps("lastName")}
            />
            <input
              type="number"
              id="mobile"
              placeholder="Mobile Number*"
              className="textbox"
              {...formik.getFieldProps("number")}
            />
            <input
              type="email"
              id="email"
              placeholder="Email*"
              className="textbox"
              {...formik.getFieldProps("email")}
            />
            <input
              type="text"
              id="address"
              placeholder="Address*"
              className="textbox col-span-1 md:col-span-2"
              {...formik.getFieldProps("address")}
            />

            {/* Button (spans both columns) */}
            <div className="col-span-1 md:col-span-2 flex justify-center">
              <button type="submit" className="btn w-1/2">
                Register
              </button>
            </div>

            {/* Login link (spans both columns) */}
            <div className="col-span-1 md:col-span-2 text-center">
              <span className="text-gray-600">
                Come back later?
                <Link
                  to="/"
                  className="font-semibold hover:text-sky-400 transition"
                >
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
