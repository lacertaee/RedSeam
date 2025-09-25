import { CartBody } from "./Cart";
import { Header } from "./Header";
import { Link } from "react-router-dom";

const Checkout = () => {
  return (
    <div className="mx-[6.25rem]">
      <Header />
      <div className="mt-[4.5rem] poppins-semibold text-[2.625rem]">
        Checkout
      </div>
      <form className="flex gap-32 mt-10.5">
        <div className="w-3/4 pt-18 pl-12 rounded-2xl bg-[#F8F6F7] p-6">
          <div className="poppins-medium text-xl">Order Details</div>
          <div className="mt-11.5 w-fit grid grid-cols-1 lg:grid-cols-[277px_277px] gap-x-6 gap-y-8">
            <Input type="text" placeholder="Name" />
            <Input type="text" placeholder="Surname" />

            <div className="bg-white col-span-1 md:col-span-2 flex items-center border rounded-sm p-2">
              <img src="/envelope.svg" alt="" className="mr-2" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none"
              />
            </div>

            <Input type="text" placeholder="Address" />
            <Input type="text" pattern="[0-9]*" placeholder="Zip code" />
          </div>
        </div>
        <div className="w-1/4">
          <CartBody cartOrCheckout="checkout" />
          <Link to={"/checkout"}>
            <button className="w-full bg-[#FF4000] rounded-[0.625rem] text-white text-[1.125rem] py-4 mt-4">
              Pay
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

const Input = ({ placeholder, type, className = "", pattern = "" }) => {
  return (
    <input
      required
      pattern={pattern}
      type={type}
      placeholder={placeholder}
      className={`w-full bg-white border rounded-sm p-2 outline-0 max-w-[17.375rem] ${className}`}
    />
  );
};

export default Checkout;
