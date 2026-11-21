import axios, { AxiosError } from "axios";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Order, CartItem, Product } from "../types";
import { API_URL } from "../config/api";

export default function useOrder(cart: CartItem[]) {
  const { clear } = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: Order) => {
      for (const item of cart) {
        // get product
        const productRes = await axios.get<Product>(
          `${API_URL}/products/${item.productID}`
        );
        const product = productRes.data;

        if (product.quantity < item.quantity) {
          throw new Error(`موجودی محصول "${product.title}" کافی نیست`);
        }

        await axios.patch(`${API_URL}/products/${item.productID}`, {
          quantity: product.quantity - item.quantity,
        });
      }

      // create order
      return await axios.post(`${API_URL}/orders`, order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      alert("سفارش با موفقیت ثبت شد!");
      clear();
      queryClient.invalidateQueries();
      navigate("/cart");
    },
    onError: (error: unknown) => {
      console.error(error);

      let message = "خطا در ثبت سفارش";

      if (error instanceof Error) {
        message = error.message;
      } else if (error instanceof AxiosError) {
        message = error.response?.data?.message || error.message;
      }

      alert(message);
    },
  });
}