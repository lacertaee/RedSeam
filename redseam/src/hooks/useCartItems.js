import Cookies from "js-cookie";

export const useCartItems = () => {
  const token = Cookies.get("token");

  const getCartItems = async () => {
    const response = await fetch(
      "https://api.redseam.redberryinternship.ge/api/cart",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    return data;
  };

  return { getCartItems };
};
