import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDetailed } from "../hooks/useDetailed";
import { useFetch } from "../hooks/useFetch";

import { Size } from "./Size";
import { Image } from "./Image";
import { Color } from "./Color";

import { useQueryClient } from "@tanstack/react-query";

const Detailed = () => {
  const { id } = useParams();

  const { getProduct } = useDetailed();
  const { fetchData } = useFetch();

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const [productState, setProductState] = useState(null);

  useEffect(() => {
    if (product) {
      setProductState(product);
    }
  }, [product]);

  const sellable = product && product.quantity !== undefined;

  const [quantity, setQuantity] = useState(1);
  const [matchingKeys, setMatchingKeys] = useState(0);

  const addToCart = async () => {
    return await fetchData(
      `https://api.redseam.redberryinternship.ge/api/cart/products/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: quantity,
          color: productState.color,
          size: productState.size,
        }),
      }
    );
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addToCart"] });
      window.location.href = "/";
    },
    onError: () => {
      throw "Error";
    },
  });

  return (
    <div>
      <div className="poppins-light text-sm mt-7.5">Listing / Product</div>
      {productState && (
        <div className="mt-12.5 flex justify-between">
          <div className="flex gap-6">
            <div className="grid grid-cols-1 gap-2.5 max-w-[7.563rem] h-fit">
              {productState.images.map((image, idx) => (
                <Image
                  key={idx}
                  onClick={() => {
                    setProductState((prev) => ({
                      ...prev,
                      cover_image: image,
                    }));
                    setMatchingKeys(idx);
                  }}
                  image={image}
                />
              ))}
            </div>
            <img
              className="md:w-[43.938rem] border md:h-[58.563rem] object-cover"
              src={productState.images[matchingKeys]}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-14 md:w-[44rem]">
            <div className="poppins-semibold text-3xl flex flex-col gap-5">
              <div>{productState.name}</div>
              <div>$ {productState.price}</div>
            </div>
            <div className="flex flex-col gap-12">
              <div>
                <div className="poppins-regular">
                  {(productState.color === "Default" ||
                    productState.color === "Color 2") &&
                    setProductState((prev) => ({
                      ...prev,
                      color: productState.available_colors[0],
                    }))}
                  Color: {productState.color}
                </div>
                <div className="mt-4 flex gap-3">
                  {productState.available_colors.map((color, idx) => (
                    <Color
                      onClick={() => {
                        setProductState((prev) => ({
                          ...prev,
                          color: color,
                        }));
                        setMatchingKeys(idx);
                      }}
                      key={idx}
                      className={`${
                        color === productState.available_colors[matchingKeys]
                          ? "border-2 border-gray-300"
                          : "border-2 border-transparent"
                      }`}
                      color={color}
                    />
                  ))}
                </div>
              </div>
              <div className="w-[55%]">
                <div className="poppins-regular">Size: {productState.size}</div>
                <div className="mt-4 flex gap-2">
                  {productState.available_sizes.map((size, idx) => (
                    <Size
                      className={`
                        flex-1 text-center poppins-regular border rounded-[0.625rem] py-2.5 px-4
                        ${
                          size === productState.size
                            ? "border-[#10151F] bg-[#F8F6F7]"
                            : "border-[#E1DFE1] bg-white"
                        }`}
                      onClick={() =>
                        setProductState((prev) => ({
                          ...prev,
                          size: size,
                        }))
                      }
                      key={idx}
                      size={size}
                    />
                  ))}
                </div>
              </div>
              <div>
                {!sellable && (
                  <span className="poppins-light text-xs">
                    Not available right now!
                  </span>
                )}
                <div className="poppins-regular">Quantity</div>
                <div className="mt-4">
                  <Select
                    onValueChange={(val) => setQuantity(val)}
                    disabled={!sellable}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={quantity} />
                    </SelectTrigger>
                    <SelectContent>
                      {sellable &&
                        [...Array(productState.quantity).keys()].map((num) => (
                          <SelectItem key={num + 1} value={num + 1}>
                            {num + 1}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <button
                onClick={() => mutation.mutate()}
                className="disabled:opacity-60 flex justify-center items-center gap-2.5 rounded-[0.625rem] bg-[#FF4000] py-4 px-15 text-white poppins-medium text-lg"
                disabled={!sellable}
              >
                <img src="/shopping-cart-white.svg" alt="" />
                Add to cart
              </button>
              <hr className="border-t" />
              <div>
                <div className="flex justify-between items-center">
                  <div className="poppins-medium text-xl">Details</div>
                  <img
                    className="max-w-[6.875rem] max-h-[3.875rem]"
                    src={productState.brand.image}
                    alt=""
                  />
                </div>
                <div className="poppins-regular mt-2 flex flex-col gap-4.5">
                  <div>Brand: {productState.brand.name}</div>
                  <div>{productState.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detailed;
