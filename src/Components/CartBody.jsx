import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Empty } from "./Empty";
import { useFetch } from "../hooks/useFetch";
import { CartItem } from "./CartItem";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export const CartBody = ({ setItemLength, cartOrCheckout }) => {
  const { fetchData } = useFetch();

  const getCartItems = async () => {
    return await fetchData(
      "https://api.redseam.redberryinternship.ge/api/cart"
    );
  };

  const isCart = cartOrCheckout === "cart";
  const delivery = 5;

  const [subtotal, setSubtotal] = useState(0);
  const [change, setChange] = useState(false);

  const token = Cookies.get("token");

  const { data: items = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: !!token,
  });

  useEffect(() => {
    if (items) {
      const newSubtotal = items.reduce(
        (acc, item) => acc + (item.total_price || 0),
        0
      );
      setSubtotal(newSubtotal);
      setItemLength && setItemLength(items.length);
    }
  }, [items]);

  return (
    <div
      className={`flex flex-col ${
        isCart ? "justify-between mt-12" : "gap-20"
      } flex-1`}
    >
      {items?.length > 0 ? (
        <>
          <ScrollArea className={`${isCart ? "h-[31rem]" : "h-[19rem]"}`}>
            <div className={`${isCart ? "mt-6" : ""} flex flex-col gap-9`}>
              {items.map((item, index) => (
                <CartItem
                  key={`${item.id}-${index}`}
                  token={token}
                  change={change}
                  setChange={setChange}
                  item={item}
                  subtotal={subtotal}
                  setSubtotal={setSubtotal}
                />
              ))}
            </div>
          </ScrollArea>

          <div className={`flex flex-col gap-4 ${isCart ? "mb-24" : "mb-20"}`}>
            <div className="flex justify-between poppins-regular text-[#3E424A]">
              <div>Items subtotal</div>
              <div>$ {subtotal}</div>
            </div>
            <div className="flex justify-between poppins-regular text-[#3E424A]">
              <div>Delivery</div>
              <div>$ {delivery}</div>
            </div>
            <div className="flex justify-between poppins-medium text-xl">
              <div>Total</div>
              <div>$ {subtotal + delivery}</div>
            </div>
          </div>
          {isCart && (
            <Link to={"/checkout"}>
              <button
                type="button"
                className="w-full bg-[#FF4000] rounded-[0.625rem] text-white text-lg py-4 mt-4 cursor-pointer transition-all duration-200 hover:bg-[#E63600] hover:scale-105"
              >
                Go to Checkout
              </button>
            </Link>
          )}
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
