import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

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
    <header
      className={`py-[0.625rem] flex justify-between ${className} items-center`}
    >
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

function ViewForLoggedIn({ avatar, setOpenCart }) {
  return (
    <div className="flex gap-[1.25rem]">
      <img onClick={() => setOpenCart(true)} src="/shopping-cart.svg" alt="" />
      <div className="flex gap-[0.25rem] items-center">
        <img
          className="size-[2.5rem] rounded-full object-cover"
          src={avatar}
          alt=""
        />
        <img className="size-[1.25rem]" src="/chevron-down.svg" alt="" />
      </div>
    </div>
  );
}

function ViewForNotLoggedIn() {
  return (
    <Link to={"/login"}>
      <div className="flex gap-[0.5rem] items-center">
        <img src="/user.svg" alt="" />
        <div className="poppins-medium text-[0.75rem] text-nowrap">Log in</div>
      </div>
    </Link>
  );
}
