import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";

export const PaginationDemo = ({ setPage, products }) => {
  if (!products?.meta?.links || !Array.isArray(products.meta.links)) {
    return null;
  }

  const pageLinks = products.meta.links.filter(
    (link) =>
      link && link.label !== "&laquo; Previous" && link.label !== "Next &raquo;"
  );

  const previousLink = products.meta.links.find(
    (link) => link && link.label === "&laquo; Previous"
  );
  const nextLink = products.meta.links.find(
    (link) => link && link.label === "Next &raquo;"
  );
  const currentPage = products.meta.current_page || 1;
  const totalPages = pageLinks.length;

  const renderPaginationItems = () => {
    if (totalPages <= 6) {
      return pageLinks
        .map((link, index) => {
          if (!link) return null;
          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={link.active || false}
                onClick={(e) => {
                  e.preventDefault();
                  link.url && setPage(link.url);
                }}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })
        .filter(Boolean);
    }

    const items = [];

    if (currentPage >= 8) {
      if (pageLinks[0]) {
        items.push(
          <PaginationItem key="page-1">
            <PaginationLink
              isActive={pageLinks[0].active || false}
              onClick={(e) => {
                e.preventDefault();
                pageLinks[0].url && setPage(pageLinks[0].url);
              }}
            >
              {pageLinks[0].label}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (pageLinks[1]) {
        items.push(
          <PaginationItem key="page-2">
            <PaginationLink
              isActive={pageLinks[1].active || false}
              onClick={(e) => {
                e.preventDefault();
                pageLinks[1].url && setPage(pageLinks[1].url);
              }}
            >
              {pageLinks[1].label}
            </PaginationLink>
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );

      for (let i = Math.max(0, totalPages - 3); i < totalPages; i++) {
        if (pageLinks[i]) {
          items.push(
            <PaginationItem key={`page-${i + 1}`}>
              <PaginationLink
                isActive={pageLinks[i].active || false}
                onClick={(e) => {
                  e.preventDefault();
                  pageLinks[i].url && setPage(pageLinks[i].url);
                }}
              >
                {pageLinks[i].label}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }
    } else {
      if (pageLinks[currentPage - 1]) {
        items.push(
          <PaginationItem key={`page-${currentPage}`}>
            <PaginationLink
              isActive={pageLinks[currentPage - 1].active || false}
              onClick={(e) => {
                e.preventDefault();
                pageLinks[currentPage - 1].url &&
                  setPage(pageLinks[currentPage - 1].url);
              }}
            >
              {pageLinks[currentPage - 1].label}
            </PaginationLink>
          </PaginationItem>
        );
      }

      const nextPage = currentPage + 1;
      if (nextPage <= totalPages && nextPage < 9 && pageLinks[nextPage - 1]) {
        items.push(
          <PaginationItem key={`page-${nextPage}`}>
            <PaginationLink
              isActive={pageLinks[nextPage - 1].active || false}
              onClick={(e) => {
                e.preventDefault();
                pageLinks[nextPage - 1].url &&
                  setPage(pageLinks[nextPage - 1].url);
              }}
            >
              {pageLinks[nextPage - 1].label}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < 8) {
        items.push(
          <PaginationItem key="ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      if (pageLinks[8]) {
        items.push(
          <PaginationItem key="page-9">
            <PaginationLink
              isActive={pageLinks[8].active || false}
              onClick={(e) => {
                e.preventDefault();
                pageLinks[8].url && setPage(pageLinks[8].url);
              }}
            >
              {pageLinks[8].label}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (pageLinks[9]) {
        items.push(
          <PaginationItem key="page-10">
            <PaginationLink
              isActive={pageLinks[9].active || false}
              onClick={(e) => {
                e.preventDefault();
                pageLinks[9].url && setPage(pageLinks[9].url);
              }}
            >
              {pageLinks[9].label}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              previousLink?.url && setPage(previousLink.url);
            }}
            disabled={!previousLink?.url}
          />
        </PaginationItem>

        {renderPaginationItems()}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              nextLink?.url && setPage(nextLink.url);
            }}
            disabled={!nextLink?.url}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
