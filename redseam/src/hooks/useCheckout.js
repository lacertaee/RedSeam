import { useFetch } from "./useFetch";

export const useCheckout = () => {
  const { fetchData } = useFetch();

  const submit = async (order) => {
    return await fetchData("https://api.redseam.redberryinternship.ge/api/cart/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  };

  return { submit };
};
