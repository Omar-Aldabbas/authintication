import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import { useFetch } from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { useEffect } from "react";

export const Password = () => {
  const username = useAuthStore((state) => state.username);

  const [{ isLoading, apiData, serverError }] = useFetch(
    username ? `/user/${username}` : null
  );

  useEffect(() => {
    if (apiData) console.log("User data:", JSON.stringify(apiData, null, 2));
  }, [apiData]);

  const formik = useFormik({
    initialValues: { password: "" },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log("Password submitted:", values);
    },
  });

  if (!username || isLoading)
    return (
      <h1 className="text-4xl flex items-center justify-center min-h-screen animate-pulse">
        Please Wait ....
      </h1>
    );

  if (serverError)
    return (
      <h1 className="text-4xl flex items-center justify-center min-h-screen animate-pulse text-red-500">
        {serverError.message}
      </h1>
    );

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="glass">
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold">
              Hello{" "}
              {apiData?.data?.FirstName || apiData?.data?.username || "again"}
            </h2>
            <span className="text-lg text-gray-400">Explore safe content</span>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 flex flex-col justify-center items-center"
          >
            <div>
              <img
                src={apiData?.data?.profile || avatar}
                alt="avatar"
                className="profile_img"
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-3">
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
                Forget Password?{" "}
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
