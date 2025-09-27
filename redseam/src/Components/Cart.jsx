import { Link } from "react-router-dom";
import { CartBody } from "./CartBody";

export const Cart = ({ openCart, setOpenCart }) => {
  return (
    <>
      <div
        className={`bg-white z-10 h-full border fixed w-1/4 top-0 right-0 p-10 transform transition-transform duration-300 ${
          openCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center">
            <div className="poppins-medium text-xl">Shopping cart</div>
            <img
              onClick={() => setOpenCart(!openCart)}
              src="x-mark.svg"
              alt="close"
              className="cursor-pointer"
            />
          </div>

          <CartBody cartOrCheckout="cart" />
        </div>
      </div>
    </>
  );
};
