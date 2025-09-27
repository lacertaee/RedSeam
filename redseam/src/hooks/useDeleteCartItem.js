import { useFetch } from "./useFetch";

export const useDeleteCartItem = () => {
  const { fetchData } = useFetch();

  const deleteProduct = async (itemId) => {
    return await fetchData(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${itemId}`,
      {
        method: "DELETE",
      }
    );
  };

  return { deleteProduct };
};
