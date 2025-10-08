import { Link } from "react-router-dom";

export const Recovery = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="glass ">
        <div className="flex flex-col justify-center items-center gap-8 text-center">
          <div className="space-y-4 ">
            <h2 className="text-4xl font-semibold">Recovery</h2>
            <span className="text-lg text-gray-400">
              Enter OTP to recover password
            </span>
          </div>
          <form className="space-y-6 flex flex-col justify-center items-center">
            <div className=" flex flex-col justify-center items-center gap-3">
              <span className="text-left text-sm py-4 text-gray-500">
                Enter 6 digit OTP sent to your email
              </span>
              <input
                type="text"
                id="text"
                placeholder="OTP"
                className="textbox"
              />
              <button type="submit" className="btn">
                Sign up
              </button>
            </div>

            <div>
              <span className="text-center text-gray-600">
                Can't get OTP ?{" "}
                <Link
                  to="/recovery"
                  className="font-semibold hover:text-sky-400 transition"
                >
                  Resend
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
