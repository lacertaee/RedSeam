import { CartBody } from "./CartBody";
import { Header } from "./Header";
import { DialogDemo } from "./CheckoutSuccess";
import { useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Error } from "./Error";
import { Input } from "./Input";
import Cookies from "js-cookie";
import { useFetch } from "../hooks/useFetch";
import { Empty } from "./Empty";

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const { fetchData } = useFetch();
  const formRef = useRef(null);

  const submit = async (order) => {
    return await fetchData(
      "https://api.redseam.redberryinternship.ge/api/cart/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );
  };

  const getCartItems = async () => {
    return await fetchData(
      "https://api.redseam.redberryinternship.ge/api/cart"
    );
  };

  const user = Cookies.get("user");
  const token = Cookies.get("token");

  const [empty, setEmpty] = useState(false);

  const [errors, setErrors] = useState({});

  const { data: items = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: !!token,
  });

  const checkoutMutation = useMutation({
    mutationFn: (order) => submit(order),
    onSuccess: () => {
      setOpen(true);
      setErrors({});
      formRef.current?.reset();
    },
    onError: (error) => {
      setErrors(error.errors);
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const order = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
      address: formData.get("address"),
      zip_code: formData.get("zip_code"),
    };
    checkoutMutation.mutate(order);
  };

  const hasError = (field) => {
    if (errors[field]) return "border-red-500";
  };

  return (
    <div className="mx-[6.25rem]">
      <Header />
      <div className="mt-18 poppins-semibold text-[2.625rem]">Checkout</div>
      <form ref={formRef} className="flex gap-32 mt-10.5" onSubmit={handleForm}>
        <div className="w-3/4 pt-18 pl-12 rounded-2xl bg-[#F8F6F7] p-6">
          <div className="poppins-medium text-xl">Order Details</div>
          <div className="mt-11.5 w-fit grid grid-cols-1 lg:grid-cols-[277px_277px] gap-x-6 gap-y-8">
            <div>
              <Input
                className={hasError("name")}
                type="text"
                name="name"
                placeholder="Name"
              />
              {errors?.name?.map((error, idx) => (
                <Error error={error} key={idx} />
              ))}
            </div>
            <div>
              <Input
                className={hasError("surname")}
                type="text"
                name="surname"
                placeholder="Surname"
              />
              {errors?.surname?.map((error, idx) => (
                <Error error={error} key={idx} />
              ))}
            </div>
            <div className="col-span-1 md:col-span-2">
              <div
                className={`bg-white flex items-center border rounded-sm p-2 ${hasError(
                  "email"
                )}`}
              >
                <img src="/envelope.svg" alt="" className="mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`w-full outline-none`}
                  defaultValue={user ? JSON.parse(user).email : ""}
                />
              </div>
              {errors?.email?.map((error, idx) => (
                <Error error={error} key={idx} />
              ))}
            </div>

            <div>
              <Input
                className={hasError("address")}
                type="text"
                name="address"
                placeholder="Address"
              />
              {errors?.address?.map((error, idx) => (
                <Error error={error} key={idx} />
              ))}
            </div>
            <div>
              <Input
                className={hasError("zip_code")}
                type="text"
                name="zip_code"
                placeholder="Zip code"
              />
              {errors?.zip_code?.map((error, idx) => (
                <Error error={error} key={idx} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/4">
          {empty ? <Empty /> : <CartBody cartOrCheckout="checkout" />}
          {(items?.length > 0 && !empty) && (
            <DialogDemo
              open={open}
              setOpen={setOpen}
              onClose={() => setEmpty(true)}
              trigger={
                <button
                  type="submit"
                  className="w-full bg-[#FF4000] rounded-[0.625rem] text-white text-lg py-4 mt-4 cursor-pointer"
                >
                  Pay
                </button>
              }
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Checkout;
