import { useQuery, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

export const Cart = ({ openCart, setOpenCart }) => {
  return (
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
        <Link to={"/checkout"}>
          <button className="w-full bg-[#FF4000] rounded-[0.625rem] text-white text-[1.125rem] py-4 mt-4">
            Go to checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export const CartBody = ({ cartOrCheckout }) => {
  const isCart = cartOrCheckout === "cart";
  const token = Cookies.get("token");
  const delivery = 5;

  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [change, setChange] = useState(false);

  const { data } = useQuery({
    queryKey: ["cart", token],
    queryFn: () => getCartItems(token),
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

const CartItem = ({
  item,
  change,
  setChange,
  token,
  subtotal,
  setSubtotal,
  setItems,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const deleteMutation = useMutation({
    mutationFn: (itemId) => deleteProduct(itemId, token),
    onSuccess: (_, itemId) => {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    },
  });

  const debouncedPatchQuantity = debounce((qty) => {
    patchQuantity(item.id, qty, token);
  }, 1000);

  const handleQuantityChange = (newQty) => {
    setQuantity(newQty);
    debouncedPatchQuantity(newQty);
  };

  return (
    <div className="flex gap-4 items-center">
      <img
        className="w-[100px] h-[134px] border rounded-xl"
        src={item.cover_image}
        alt=""
      />
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="poppins-medium text-sm">{item.name}</div>
            <div className="poppins-regular text-xs text-[#3E424A]">
              {item.color}
            </div>
            <div className="poppins-regular text-xs text-[#3E424A]">
              {item.size}
            </div>
          </div>
          <div className="poppins-medium text-[1.125rem]">
            $ {item.total_price}
          </div>
        </div>
        <div className="flex justify-between items-center poppins-regular text-xs text-[#3E424A]">
          <Stepper
            subtotal={subtotal}
            setSubtotal={setSubtotal}
            change={change}
            setChange={setChange}
            item={item}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <div
            onClick={() => deleteMutation.mutate(item.id)}
            className="cursor-pointer"
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
};

function Stepper({
  subtotal,
  setSubtotal,
  change,
  setChange,
  value,
  onChange,
  item,
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border px-2 py-1 w-fit">
      <button
        onClick={() => {
          onChange(value - 1);
          item.quantity = value - 1;
          item.total_price -= item.price;
          setSubtotal(subtotal - item.price);
          setChange(!change);
        }}
        disabled={value <= 1}
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 7.75C3.33579 7.75 3 8.08579 3 8.5C3 8.91421 3.33579 9.25 3.75 9.25L12.25 9.25C12.6642 9.25 13 8.91421 13 8.5C13 8.08579 12.6642 7.75 12.25 7.75H3.75Z"
            fill={`${value <= 1 ? "#E1DFE1" : "#3E424A"}`}
          />
        </svg>
      </button>

      <span className="text-center poppins-regular text-xs">{value}</span>
      <button
        onClick={() => {
          onChange(value + 1);
          item.quantity = value + 1;
          item.total_price += item.price;
          setSubtotal(subtotal + item.price);
          setChange(!change);
        }}
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.75 4.25C8.75 3.83579 8.41421 3.5 8 3.5C7.58579 3.5 7.25 3.83579 7.25 4.25V7.75H3.75C3.33579 7.75 3 8.08579 3 8.5C3 8.91421 3.33579 9.25 3.75 9.25L7.25 9.25V12.75C7.25 13.1642 7.58579 13.5 8 13.5C8.41421 13.5 8.75 13.1642 8.75 12.75V9.25L12.25 9.25C12.6642 9.25 13 8.91421 13 8.5C13 8.08579 12.6642 7.75 12.25 7.75H8.75V4.25Z"
            fill="#3E424A"
          />
        </svg>
      </button>
    </div>
  );
}

const getCartItems = async (token) => {
  const response = await fetch(
    "https://api.redseam.redberryinternship.ge/api/cart",
    {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    }
  );
  return await response.json();
};

const patchQuantity = async (productId, qty, token) => {
  await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity: qty }),
    }
  );
};

const deleteProduct = async (itemId, token) => {
  const response = await fetch(
    `https://api.redseam.redberryinternship.ge/api/cart/products/${itemId}`,
    {
      method: "DELETE",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    }
  );
  return await response.json();
};

const Empty = () => (
  <div className="mt-38 flex flex-col items-center">
    <img src="/Making Credit Purchase Online Securely.svg" alt="" />
    <div className="poppins-semibold text-2xl mt-6">Ooops!</div>
    <div className="poppins-regular text-sm mt-2.5 text-[#3E424A]">
      You’ve got nothing in your cart just yet...
    </div>
    <button className="mt-15 bg-[#FF4000] py-2.5 px-10 rounded-[0.625rem] text-white poppins-regular text-sm">
      Start shopping
    </button>
  </div>
);
