import { Link } from "react-router-dom";
import avatar from "../assets/avatar_2.jpeg";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";

export const Password = () => {
  const formik = useFormik({
    initialValues: {
      password: "alapawe123$",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="glass ">
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <div className="space-y-4 ">
            <h2 className="text-4xl font-semibold">Hello Again</h2>
            <span className="text-lg text-gray-400">Explore safe content</span>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 flex flex-col justify-center items-center"
          >
            <div>
              <img src={avatar} alt="avatar" className="profile_img" />
            </div>
            <div className=" flex flex-col justify-center items-center gap-3">
              <input
                type="password"
                id="password"
                placeholder="password"
                className="textbox"
                {...formik.getFieldProps("password")}
              />
              <button type="submit" className="btn">
                Sign up
              </button>
            </div>

            <div>
              <span className="text-center text-gray-600">
                Forget Password ?{" "}
                <Link
                  to="/recovery"
                  className="font-semibold hover:text-sky-400 transition"
                >
                  Recover now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
