import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "../hooks/useFetch";
import { debounce } from "lodash";
import { Stepper } from "./Stepper";

export const CartItem = ({
  item,
  change,
  setChange,
  subtotal,
  setSubtotal,
}) => {
  const { fetchData } = useFetch();
  const [quantity, setQuantity] = useState(item.quantity);

  const queryClient = useQueryClient();

  const index = item.available_colors.indexOf(item.color);

  const correctImage = item.images[index];

  const deleteProduct = async (itemId) => {
    return await fetchData(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${itemId}`,
      {
        method: "DELETE",
      }
    );
  };

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

  const deleteMutation = useMutation({
    mutationFn: ({ itemId }) => deleteProduct(itemId),
    onMutate: ({ itemId }) => {
      queryClient.setQueryData(["cart"], (old) =>
        old ? old.filter((i) => i.id !== itemId) : []
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const debouncedPatchQuantity = debounce((qty) => {
    patchQuantity(item.id, qty);
  }, 1000);

  const handleQuantityChange = (newQty) => {
    setQuantity(newQty);
    debouncedPatchQuantity(newQty);
  };

  return (
    <div className="flex gap-4 items-center">
      <img
        className="w-[100px] h-[134px] border rounded-xl"
        src={correctImage}
        alt=""
      />
      <div className="flex flex-col gap-3 w-full">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="poppins-medium text-sm">{item.name}</div>
            <div className="poppins-regular text-xs text-[#3E424A]">
              {item.color}
            </div>
            <div className="poppins-regular text-xs text-[#3E424A]">
              {item.size}
            </div>
          </div>
          <div className="poppins-medium text-lg">$ {item.total_price}</div>
        </div>
        <div className="flex justify-between items-center poppins-regular text-xs text-[#3E424A]">
          <Stepper
            subtotal={subtotal}
            setSubtotal={setSubtotal}
            change={change}
            setChange={setChange}
            item={item}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <div
            onClick={() => deleteMutation.mutate({ itemId: item.id })}
            className="cursor-pointer transition-all duration-200 hover:text-red-600 hover:font-medium"
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
};
