import { Link } from "react-router-dom";
import avatar from "../assets/avatar_2.jpeg";
import {useFormik} from "formik"
import { usernameValidate } from "../helper/validate";

export const Username = () => {
  const formik = useFormik(
    {
      initialValues: {
        username : ''
      },
      validate : usernameValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
        console.log(values)
      }
    }
  )



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
                type="text"
                id="username"
                placeholder="username"
                className="textbox"
                {...formik.getFieldProps('username')}
              />
              <button type="submit" className="btn">Let's Go</button>
            </div>

            <div>
              <span className="text-center text-gray-600">
                Not a mamber yet?{" "}
                <Link
                  to="/register"
                  className="font-semibold hover:text-sky-400 transition"
                >
                  Go and register
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
