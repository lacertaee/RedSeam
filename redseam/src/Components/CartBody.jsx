import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Empty } from "./Empty";
import { useCartItems } from "../hooks/useCartItems";
import { CartItem } from "./CartItem";
import Cookies from "js-cookie";

export const CartBody = ({ cartOrCheckout }) => {
  const { getCartItems } = useCartItems();

  const isCart = cartOrCheckout === "cart";
  const delivery = 5;

  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [change, setChange] = useState(false);

  const token = Cookies.get("token");

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setItems(data);
      const newSubtotal = data.reduce(
        (acc, item) => acc + (item.total_price || 0),
        0
      );
      setSubtotal(newSubtotal);
    }
  }, [data]);

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
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  token={token}
                  change={change}
                  setChange={setChange}
                  item={item}
                  subtotal={subtotal}
                  setSubtotal={setSubtotal}
                  setItems={setItems}
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
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
