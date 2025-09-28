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
          <Pagination>
            <PaginationContent>
              {products.meta.links.map((link, index) => {
                if (link.label === "&laquo; Previous") {
                  return (
                    <PaginationItem key={index}>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          link.url && setPage(link.url);
                        }}
                        disabled={!link.url}
                      />
                    </PaginationItem>
                  );
                }

                if (link.label === "Next &raquo;") {
                  return (
                    <PaginationItem key={index}>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          link.url && setPage(link.url);
                        }}
                        disabled={!link.url}
                      />
                    </PaginationItem>
                  );
                }

                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={link.active}
                      onClick={(e) => {
                        e.preventDefault();
                        link.url && setPage(link.url);
                      }}
                    >
                      {link.label}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
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
  return await response.json();
};

export default Catalog;
