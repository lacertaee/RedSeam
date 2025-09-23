import { Link } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { Error } from "./Error";

const Login = () => {
  const queryClient = useQueryClient();

  const [error, setError] = useState(null);
  const [userExists, setUserExists] = useState("");

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      Cookies.set("token", data.token, { path: "/" });
      Cookies.set("user", JSON.stringify(data.user), { path: "/" });
      window.location.href = "/";
    },
    onError: (error) => {
      if (typeof error === "string") {
        setUserExists(error);
        setError(null);
      } else {
        setError(error.errors);
        setUserExists("");
      }
      typeof error === "string" ? setUserExists(error) : setError(error.errors);
    },
  });

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const user = new FormData();
    user.append("email", email);
    user.append("password", password);

    login.mutate(user);
  };

  const inputUi = `w-[34.625rem] border rounded-lg p-3 outline-0`;
  const getInputUi = (hasError) =>
    `${inputUi} ${hasError ? "border-red-500" : ""}`;

  const [type, setType] = useState("password");
  return (
    <>
      <Header className="mx-[6.25rem]" />
      <div className="flex items-center gap-[11rem]">
        <img src="/login.png" alt="" />
        <div>
          <div className="poppins-semibold text-[2.625rem]">Log in</div>
          <form
            onSubmit={submitForm}
            className={`${
              userExists ? "mt-4" : "mt-[3rem]"
            } flex flex-col gap-[2.875rem]`}
          >
            <div className="flex flex-col gap-[1.5rem]">
              {userExists && (
                <div className="poppins-light text-red-500">{userExists}</div>
              )}
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
                    name="password"
                    type={type}
                    placeholder="Password *"
                  />
                  <img
                    onClick={() =>
                      type === "password"
                        ? setType("text")
                        : setType("password")
                    }
                    className="absolute right-3 top-"
                    src="/eye.svg"
                    alt=""
                  />
                </div>

                {error?.password?.map((er, idx) => (
                  <Error key={idx} error={er} />
                ))}
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
          </form>
        </div>
      </div>
    </>
  );
};

const loginUser = async (user) => {
  const response = await fetch(
    "https://api.redseam.redberryinternship.ge/api/login",
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
    if (response.status === 422) {
      throw await data;
    } else if (response.status === 401) {
      throw "We couldn’t log you in. Please check your email and password and try again.";
    }
  }

  return data;
};

export default Login;
