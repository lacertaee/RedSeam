export const usePatchQuantity = () => {
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
  return patchQuantity;
};
