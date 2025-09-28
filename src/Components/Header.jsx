import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { ViewForLoggedIn } from "./ViewForLoggedIn";
import { ViewForNotLoggedIn } from "./ViewForNotLoggedIn";

export function Header({ className, setOpenCart }) {
  const user = Cookies.get("user");
  const [avatar, setAvatar] = useState("/guy.jpg");

  useEffect(() => {
    if (user) {
      const usr = JSON.parse(user);
      if (usr.avatar) {
        setAvatar(usr.avatar);
      }
    }
  }, [user]);

  return (
    <header className={`py-7 flex justify-between ${className} items-center`}>
      <Link to={"/"}>
        <div className="flex gap-[0.25rem] items-center">
          <img src="/HandEye.svg" alt="" />
          <div className="poppins-semibold">RedSeam Clothing</div>
        </div>
      </Link>

      {user ? (
        <ViewForLoggedIn avatar={avatar} setOpenCart={setOpenCart} />
      ) : (
        <ViewForNotLoggedIn />
      )}
    </header>
  );
}
