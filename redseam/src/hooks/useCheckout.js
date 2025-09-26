import Cookies from "js-cookie";

export const useCheckout = () => {
  const token = Cookies.get("token");

  const submit = async (order) => {
    const response = await fetch(
      "https://api.redseam.redberryinternship.ge/api/cart/checkout",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  };

  return { submit };
};
