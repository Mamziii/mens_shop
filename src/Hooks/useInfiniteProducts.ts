import { useInfiniteQuery } from "@tanstack/react-query";

function useInfiniteDiscountProducts() {
  return useInfiniteQuery({
    queryKey: ["discount-products"],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `http://localhost:4000/products?_limit=4&_page=${pageParam}&discount_gte=1`
      );

      return res.json();
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 4) return undefined;
      return pages.length + 1;
    },
  });
}

export { useInfiniteDiscountProducts };
