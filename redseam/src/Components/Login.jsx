import { Link } from "react-router-dom";
import { Header } from "./Header";

const Login = () => {
  return (
    <>
      <Header className="mx-[6.25rem]" />
      <div className="flex items-center gap-[11rem]">
        <img src="/login.png" alt="" />
        <div>
          <div className="poppins-semibold text-[2.625rem]">Log in</div>
          <div className="mt-[3rem] flex flex-col gap-[2.875rem]">
            <div className="flex flex-col gap-[1.5rem]">
              <input
                className="w-[554px] border rounded-lg p-3"
                type="text"
                placeholder="Email *"
              />
              <div className="relative flex justify-between items-center">
                <input
                  className="w-[554px] border rounded-lg p-3"
                  type="text"
                  placeholder="Password *"
                />
                <img className="absolute right-3 top-" src="/eye.svg" alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-[1.5rem]">
              <input
                className="disabled:opacity-60 py-[0.625rem] px-[2.7rem] rounded-[0.625rem] text-white bg-[#FF4000] poppins-regular text-[0.875rem]"
                type="submit"
                value="Log in"
              />
              <div className="text-center poppins-regular text-[0.875rem]">
                Not a member?
                <Link to={"/register"}>
                  <span className="ml-2 poppins-medium text-[#FF4000]">
                    Register
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
