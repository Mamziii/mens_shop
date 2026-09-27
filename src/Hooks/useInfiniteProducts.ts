import { useInfiniteQuery } from "@tanstack/react-query";
import { API_URL } from "../config/api";


function useInfiniteDiscountProducts() {
  return useInfiniteQuery({
    queryKey: ["discount-products"],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `${API_URL}/products?_limit=4&_page=${pageParam}&discount_gte=1`
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
