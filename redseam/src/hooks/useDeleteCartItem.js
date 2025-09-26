export const useDeleteCartItem = () => {
  const deleteProduct = async (itemId, token) => {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  };

  return { deleteProduct };
};
