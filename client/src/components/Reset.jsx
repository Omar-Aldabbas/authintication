import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../helper/validate";

export const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidate,
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
            <h2 className="text-4xl font-semibold">Reset</h2>
            <span className="text-lg text-gray-400">Enter new Password</span>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-14 flex flex-col justify-center items-center"
          >
            <div className=" flex flex-col justify-center items-center gap-3">
              <input
                type="password"
                id="password"
                placeholder="New password"
                className="textbox"
                {...formik.getFieldProps("password")}
              />
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                className="textbox"
                {...formik.getFieldProps("confirmPassword")}
              />
              <button type="submit" className="btn">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
