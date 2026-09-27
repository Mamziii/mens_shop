import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "../types";
import { API_URL } from "../config/api";


// get
const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/products`);
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
