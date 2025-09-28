import { useQuery } from "@tanstack/react-query";
import { PaginationDemo } from "./PaginationDemo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";

const Catalog = ({ range, sortIt }) => {
  const [page, setPage] = useState(
    "https://api.redseam.redberryinternship.ge/api/products"
  );
  const { data: products } = useQuery({
    queryKey: ["products", page, range, sortIt],
    queryFn: () => getProducts(page, range, sortIt),
  });

  return (
    <>
      {products && (
        <>
          <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(25.75rem,1fr))] gap-6">
            {products.data.map((product) => (
              <Link key={product.id} to={`/${product.id}`}>
                <Card product={product} />
              </Link>
            ))}
          </div>
          <div className="mt-22">
            <PaginationDemo setPage={setPage} products={products} />
          </div>
        </>
      )}
    </>
  );
};

const getProducts = async (page, range, sortIt) => {
  const url = new URL(page);

  if (range.to !== 0) {
    url.searchParams.set("filter[price_from]", range.from);
    url.searchParams.set("filter[price_to]", range.to);
  }
  url.searchParams.set("sort", sortIt);

  const response = await fetch(url);
  return await response.json();
};

export default Catalog;
