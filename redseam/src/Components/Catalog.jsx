import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Link } from "react-router-dom";

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
          <div className="mt-[2rem] grid grid-cols-[repeat(auto-fill,minmax(25.75rem,1fr))] gap-[1.5rem]">
            {products.data.map((product) => (
              <Link key={product.id} to={`/${product.id}`}>
                <Card product={product} />
              </Link>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    products.links.prev && setPage(products.links.prev);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>2</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink>9</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    products.links.next && setPage(products.links.next);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
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
  const data = await response.json();
  return data;
};

function Card({ product }) {
  return (
    <div>
      <img
        className="shadow-xl w-[100%] rounded-[0.625rem]"
        src={product.cover_image}
        alt=""
      />
      <div className="mt-[0.75rem]">
        <div className="poppins-medium text-[1.125rem]">{product.name}</div>
        <div className="poppins-medium">$ {product.price}</div>
      </div>
    </div>
  );
}

export default Catalog;
