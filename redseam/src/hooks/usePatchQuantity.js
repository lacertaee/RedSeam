import { useFetch } from "./useFetch";

export const usePatchQuantity = () => {
  const { fetchData } = useFetch();

  const patchQuantity = async (productId, qty) => {
    await fetchData(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: qty }),
      }
    );
  };
  return patchQuantity;
};
