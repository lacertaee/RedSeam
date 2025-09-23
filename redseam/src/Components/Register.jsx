import { Header } from "./Header";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { Error } from "./Error";

const Register = () => {
  const queryClient = useQueryClient();

  const [sizeError, setSizeError] = useState("");

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Cookies.set("token", data.token, { path: "/" });
      Cookies.set("user", JSON.stringify(data.user), { path: "/" });
      window.location.href = "/";
    },
    onError: (error) => {
      setError(error.errors);
    },
  });

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 1 * 1024 * 1024) {
      setSizeError("Avatar size exceeds 1MB");
      return;
    } else {
      setSizeError("");
      setAvatar(file);
    }
    const url = URL.createObjectURL(file);
    setFile(url);
  };

  const registerUser = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const user = new FormData();

    user.append("email", form.get("email"));
    user.append("username", form.get("username"));
    user.append("password", form.get("password"));
    user.append("password_confirmation", form.get("password_confirmation"));
    avatar && user.append("avatar", avatar);

    mutation.mutate(user);
  };

  const [error, setError] = useState(null);

  const [type, setType] = useState("password");
  const [showType, setShowType] = useState("password");

  const inputUi = `w-[34.625rem] border rounded-lg p-3 outline-0`;
  const getInputUi = (hasError) =>
    `${inputUi} ${hasError ? "border-red-500" : ""}`;

  const handleToggle = (type, func) => {
    if (type === "password") {
      func("text");
    } else {
      func("password");
    }
  };
  return (
    <div>
      <Header className="mx-[6.25rem]" />
      <div className="flex items-center gap-[11rem]">
        <img src="/login.png" alt="" />
        <form onSubmit={registerUser}>
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
                      setAvatar(null);
                      fileInputRef.current.value = "";
                      setSizeError("");
                    }}
                    className="poppins-regular text-sm text-[#3E424A]"
                  >
                    Remove
                  </div>
                )}
                {sizeError && (
                  <div className="poppins-light text-red-500 text-xs">
                    {sizeError}
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
              <div>
                <input
                  className={getInputUi(error?.username)}
                  type="text"
                  name="username"
                  placeholder="Username *"
                />
                {error?.username?.map((er, idx) => (
                  <Error key={idx} error={er} />
                ))}
              </div>
              <div>
                <input
                  className={getInputUi(error?.email)}
                  type="email"
                  name="email"
                  placeholder="Email *"
                />
                {error?.email?.map((er, idx) => (
                  <Error key={idx} error={er} />
                ))}
              </div>
              <div>
                <div className="relative flex justify-between items-center">
                  <input
                    className={getInputUi(error?.password)}
                    type={type}
                    name="password"
                    placeholder="Password *"
                  />
                  <img
                    onClick={() => handleToggle(type, setType)}
                    className="absolute right-3"
                    src="/eye.svg"
                    alt=""
                  />
                </div>
                {error?.password?.map((er, idx) => (
                  <Error key={idx} error={er} />
                ))}
              </div>
              <div>
                <div className="relative flex justify-between items-center">
                  <input
                    className={getInputUi(error?.password)}
                    type={showType}
                    name="password_confirmation"
                    placeholder="Confirm Password *"
                  />
                  <img
                    onClick={() => handleToggle(showType, setShowType)}
                    className="absolute right-3 "
                    src="/eye.svg"
                    alt=""
                  />
                </div>
                {error?.password
                  ?.filter((msg) => msg.includes("match"))
                  .map((msg, idx) => (
                    <Error key={idx} error={msg} />
                  ))}
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
        </form>
      </div>
    </div>
  );
};

async function register(user) {
  const response = await fetch(
    "https://api.redseam.redberryinternship.ge/api/register",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: user,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export default Register;
