import { CartBody } from "./CartBody";
import { Header } from "./Header";
import { DialogDemo } from "./CheckoutSuccess";
import { useState } from "react";
import { useCheckout } from "../hooks/useCheckout";
import { useMutation } from "@tanstack/react-query";
import { Error } from "./Error";
import { Input } from "./Input";

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const { submit } = useCheckout();

  const [errors, setErrors] = useState({});

  const checkoutMutation = useMutation({
    mutationFn: (order) => submit(order),
    onSuccess: () => {
      setOpen(true);
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

  return (
    <div className="mx-[6.25rem]">
      <Header />
      <div className="mt-[4.5rem] poppins-semibold text-[2.625rem]">
        Checkout
      </div>
      <form className="flex gap-32 mt-10.5" onSubmit={handleForm}>
        <div className="w-3/4 pt-18 pl-12 rounded-2xl bg-[#F8F6F7] p-6">
          <div className="poppins-medium text-xl">Order Details</div>
          <div className="mt-11.5 w-fit grid grid-cols-1 lg:grid-cols-[277px_277px] gap-x-6 gap-y-8">
            <div>
              <Input type="text" name="name" placeholder="Name" />
              {errors?.name?.map((error, idx) => (
                <Error error={error} key={idx} />
              ))}
            </div>
            <div>
              <Input type="text" name="surname" placeholder="Surname" />
              {errors?.surname?.map((error, idx) => (
                <Error error={error} key={idx} />
              ))}
            </div>
            <div className="bg-white col-span-1 md:col-span-2 flex items-center border rounded-sm p-2">
              <img src="/envelope.svg" alt="" className="mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none"
              />
            </div>

            <div>
              <Input type="text" name="address" placeholder="Address" />
              {errors?.address?.map((error, idx) => (
                <Error error={error} key={idx} />
              ))}
            </div>
            <div>
              <Input type="text" name="zip_code" placeholder="Zip code" />
              {errors?.zip_code?.map((error, idx) => (
                <Error error={error} key={idx} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/4">
          <CartBody cartOrCheckout="checkout" />
          <DialogDemo
            open={open}
            setOpen={setOpen}
            trigger={
              <button
                type="submit"
                className="w-full bg-[#FF4000] rounded-[0.625rem] text-white text-[1.125rem] py-4 mt-4"
              >
                Pay
              </button>
            }
          />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
