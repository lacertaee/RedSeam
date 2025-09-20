import { Link } from "react-router-dom";

export function Header({ loggedIn, setLoggedIn, className }) {
  return (
    <header className={`py-[1.75rem] flex justify-between ${className}`}>
      <Link to={"/"}>
        <div className="flex gap-[0.25rem] items-center">
          <img src="/HandEye.svg" alt="" />
          <div className="poppins-semibold">RedSeam Clothing</div>
        </div>
      </Link>

      {loggedIn ? <ViewForLoggedIn /> : <ViewForNotLoggedIn />}
    </header>
  );
}

function ViewForLoggedIn() {
  return (
    <div className="flex gap-[1.25rem]">
      <img src="/shopping-cart.svg" alt="" />
      <div className="flex gap-[0.25rem] items-center">
        <img
          className="size-[2.5rem] rounded-full object-cover"
          src="/guy.jpg"
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
