import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Header } from "./Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Detailed = () => {
  const { id } = useParams();

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const sellable = product && product.quantity !== undefined;

  return (
    <div className="mx-[6.25rem]">
      <Header />
      <div className="poppins-light text-sm mt-7.5">Listing / Product</div>
      {product && (
        <div className="mt-12.5 flex justify-between">
          <div className="flex gap-6">
            <div className="grid grid-cols-1 gap-2.5 max-w-[7.563rem] h-fit">
              {product.images.map((image) => (
                <Image image={image} />
              ))}
            </div>
            <img
              className="md:w-[43.938rem] border md:h-[58.563rem] object-cover"
              src={product.cover_image}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-14 md:w-[44rem]">
            <div className="poppins-semibold text-3xl flex flex-col gap-5">
              <div>{product.name}</div>
              <div>$ {product.price}</div>
            </div>
            <div className="flex flex-col gap-12">
              <div>
                <div className="poppins-regular">
                  Color: {product.color ? product.color : "Choose it!"}
                </div>
                <div className="mt-4 flex gap-3">
                  {product.available_colors.map((color) => (
                    <Color color={color} />
                  ))}
                </div>
              </div>
              <div>
                <div className="poppins-regular">Size: L</div>
                <div className="mt-4 flex gap-2">
                  {product.available_sizes.map((size) => (
                    <Size size={size} />
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
                  <Select className="w-[]" disabled={!sellable}>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {sellable &&
                        [...Array(product.quantity).keys()].map((num) => (
                          <SelectItem value={num + 1}>{num + 1}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <button className="flex justify-center items-center gap-2.5 rounded-[0.625rem] bg-[#FF4000] py-4 px-15 text-white poppins-medium text-lg">
                <img src="/shopping-cart-white.svg" alt="" />
                Add to cart
              </button>
              <hr className="border-t" />
              <div>
                <div className="flex justify-between items-center">
                  <div className="poppins-medium text-xl">Details</div>
                  <img
                    className="max-w-[6.875rem] max-h-[3.875rem]"
                    src={product.brand.image}
                    alt=""
                  />
                </div>
                <div className="poppins-regular mt-2 flex flex-col gap-4.5">
                  <div>Brand: {product.brand.name}</div>
                  <div>{product.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Size = ({ size }) => {
  return (
    <div className="flex-1 text-center poppins-regular border rounded-[0.625rem] py-2.5 px-4">
      {size}
    </div>
  );
};

const Image = ({ image }) => {
  return (
    <div className="shadow-lg">
      <img src={image} alt="" />
    </div>
  );
};

const Color = ({ color }) => {
  return (
    <div className="p-1 border-2 rounded-full">
      <div
        style={{ background: color.toLowerCase() }}
        className="size-9.5 rounded-full"
      ></div>
    </div>
  );
};

const getProduct = async (id) => {
  const response = await fetch(
    `https://api.redseam.redberryinternship.ge/api/products/${id}`
  );
  return await response.json();
};

export default Detailed;
