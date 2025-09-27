import { useFetch } from "./useFetch";

export const useDetailed = () => {
  const { fetchData } = useFetch();

  const getProduct = async (id) => {
    return await fetchData(`https://api.redseam.redberryinternship.ge/api/products/${id}`);
  };

  return { getProduct };
};
