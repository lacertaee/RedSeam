import { useState } from "react";
import { CartBody } from "./CartBody";

export const Cart = ({ openCart, setOpenCart }) => {
  const [itemLength, setItemLength] = useState(0);
  return (
    <>
      {openCart && (
        <div
          className="fixed inset-0 bg-black z-0 transition-opacity duration-300"
          style={{ opacity: 0.3 }}
          onClick={() => setOpenCart(false)}
        />
      )}
      <div
        className={`bg-white z-10 h-full border fixed w-1/4 top-0 right-0 p-10 transform transition-transform duration-300 ${
          openCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center">
            <div className="poppins-medium text-xl">
              Shopping cart({itemLength})
            </div>
            <img
              onClick={() => setOpenCart(!openCart)}
              src="x-mark.svg"
              alt="close"
              className="cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-70"
            />
          </div>

          <CartBody setItemLength={setItemLength} cartOrCheckout="cart" />
        </div>
      </div>
    </>
  );
};
