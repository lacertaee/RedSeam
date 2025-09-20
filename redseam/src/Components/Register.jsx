import { Header } from "./Header";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Register = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setFile(url);
  };
  return (
    <div>
      <Header className="mx-[6.25rem]" />
      <div className="flex items-center gap-[11rem]">
        <img src="/login.png" alt="" />
        <div>
          <div className="poppins-semibold text-[2.625rem]">Registration</div>
          <div className="mt-[3rem] flex flex-col gap-[2.875rem]">
            <div className="relative">
              <div className="w-fit flex gap-4 items-center">
                {file === null ? (
                  <div className="size-[6.25rem] border p-2.5 rounded-full flex items-center justify-center">
                    <img
                      className="size-5 object-contain"
                      src="/camera.svg"
                      alt=""
                    />
                  </div>
                ) : (
                  <img
                    className="size-[6.25rem] rounded-full object-cover object-top"
                    src={file}
                  ></img>
                )}
                <div className="poppins-regular text-sm text-[#3E424A]">
                  Upload {file === null ? "image" : "New"}
                </div>
                {file !== null && (
                  <div
                    onClick={() => {
                      setFile(null);
                      fileInputRef.current.value = "";
                    }}
                    className="poppins-regular text-sm text-[#3E424A]"
                  >
                    Remove
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                className="cursor-pointer border opacity-0 rounded-l-full absolute top-0 py-9.5 w-54"
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col gap-[1.5rem]">
              <input
                className="w-[554px] border rounded-lg p-3"
                type="text"
                placeholder="Username *"
              />
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
              <div className="relative flex justify-between items-center">
                <input
                  className="w-[554px] border rounded-lg p-3"
                  type="text"
                  placeholder="Confirm Password *"
                />
                <img className="absolute right-3 top-" src="/eye.svg" alt="" />
              </div>
            </div>
            <div className="flex flex-col gap-[1.5rem]">
              <input
                className="disabled:opacity-60 py-[0.625rem] px-[2.7rem] rounded-[0.625rem] text-white bg-[#FF4000] poppins-regular text-[0.875rem]"
                type="submit"
                value="Register"
              />
              <div className="text-center poppins-regular text-[0.875rem]">
                Already member?
                <Link to={"/login"}>
                  <span className="ml-2 poppins-medium text-[#FF4000]">
                    Log in
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
