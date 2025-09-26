export const useDetailed = () => {
  const getProduct = async (id) => {
    const response = await fetch(
      `https://api.redseam.redberryinternship.ge/api/products/${id}`
    );
    return await response.json();
  };

  return { getProduct };
};
