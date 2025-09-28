export function Card({ product }) {
  return (
    <div className="transition-all duration-200 hover:scale-105">
      <img
        className="shadow-xl w-[100%] rounded-[0.625rem]"
        src={product.cover_image}
        alt=""
      />
      <div className="mt-3">
        <div className="poppins-medium text-lg">{product.name}</div>
        <div className="poppins-medium">$ {product.price}</div>
      </div>
    </div>
  );
}
