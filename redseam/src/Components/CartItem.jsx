import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeleteCartItem } from "../hooks/useDeleteCartItem";
import { debounce } from "lodash";
import { Stepper } from "./Stepper";
import { usePatchQuantity } from "../hooks/usePatchQuantity";

export const CartItem = ({
  item,
  change,
  setChange,
  token,
  subtotal,
  setSubtotal,
}) => {
  const patchQuantity = usePatchQuantity();
  const { deleteProduct } = useDeleteCartItem();
  const [quantity, setQuantity] = useState(item.quantity);

  const queryClient = useQueryClient();

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
        src={item.cover_image}
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
          <div className="poppins-medium text-[1.125rem]">
            $ {item.total_price}
          </div>
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
            className="cursor-pointer"
          >
            Remove
          </div>
        </div>
      </div>
    </div>
  );
};
