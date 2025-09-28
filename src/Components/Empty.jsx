import { Link } from "react-router-dom";

export const Empty = () => (
  <div className="mt-38 flex gap-15 flex-col items-center">
    <div className="flex flex-col items-center justify-center">
      <img src="/Making Credit Purchase Online Securely.svg" alt="" />
      <div className="poppins-semibold text-2xl mt-6">Ooops!</div>
      <div className="poppins-regular text-sm mt-2.5 text-[#3E424A]">
        You’ve got nothing in your cart just yet...
      </div>
    </div>
    <Link to={"/"}>
      <button className="bg-[#FF4000] py-2.5 px-10 cursor-pointer rounded-[0.625rem] text-white poppins-regular text-sm transition-all duration-200 hover:bg-[#E63600] hover:scale-105">
        Start shopping
      </button>
    </Link>
  </div>
);
