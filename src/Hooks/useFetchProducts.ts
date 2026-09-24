import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "../types";

// get
const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get("http://localhost:4000/products");
  return res.data;
};

export function useFetchAllProducts() {
  // get all products
  const productsQuery = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  return {
    ...productsQuery,
  };
}
