import { Link } from "react-router-dom";

export function ViewForNotLoggedIn() {
  return (
    <Link to={"/login"}>
      <div className="flex gap-[0.5rem] items-center">
        <img src="/user.svg" alt="" />
        <div className="poppins-medium text-[0.75rem] text-nowrap">Log in</div>
      </div>
    </Link>
  );
}
