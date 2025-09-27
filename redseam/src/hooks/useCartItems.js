import { useFetch } from "./useFetch";

export const useCartItems = () => {
  const { fetchData } = useFetch();

  const getCartItems = async () => {
    return await fetchData("https://api.redseam.redberryinternship.ge/api/cart");
  };

  return { getCartItems };
};
