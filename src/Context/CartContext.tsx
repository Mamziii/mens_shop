import { createContext, useContext } from "react";
import type { CartItem } from "../types";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "quantity" | "userID">) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // get user cart
  const { data: cart = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const res = await api.get(`/cart?userID=${user.id}`);
      return res.data;
    },
    enabled: !!user,
  });

  // add to cart function
  const addToCartMutation = useMutation({
    mutationFn: async (item: Omit<CartItem, "id" | "quantity" | "userID">) => {
      if (!user) throw new Error("ابتدا وارد شوید");

      // Check if the product already exists
      const existing = cart.find(
        (product) =>
          product.productID === item.productID &&
          product.size === item.size &&
          product.color === item.color &&
          product.userID === user.id,
      );

      if (existing) {
        // if exists , add one item
        await api.patch(`/cart/${existing.id}`, {
          quantity: existing.quantity + 1,
        });
      } else {
        // if doesnt exists , add to cart
        await api.post("/cart", {
          ...item,
          quantity: 1,
          userID: user.id,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      toast.success("محصول به سبد خرید اضافه شد");
    },
    onError: () => {
      toast.error("خطا در افزودن به سبد خرید");
    },
  });

  // add quantity function
  const increaseMutation = useMutation({
    mutationFn: async (id: number) => {
      const target = cart.find((p) => p.id === id);
      if (!target) return;
      await api.patch(`/cart/${id}`, { quantity: target.quantity + 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
  });

  // remove quantity function
  const decreaseMutation = useMutation({
    mutationFn: async (id: number) => {
      const target = cart.find((p) => p.id === id);
      if (!target) return;

      if (target.quantity <= 1) {
        await api.delete(`/cart/${id}`);
      } else {
        await api.patch(`/cart/${id}`, { quantity: target.quantity - 1 });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
  });

  // delete one item function
  const removeMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      toast.error("محصول از سبد خرید حذف شد");
    },
  });

  // clear cart function
  const clearMutation = useMutation({
    mutationFn: async () => {
      await Promise.all(cart.map((item) => api.delete(`/cart/${item.id}`)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
      toast.success("سبد خرید خالی شد");
    },
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart: (item) => addToCartMutation.mutate(item),
        increase: (id) => increaseMutation.mutate(id),
        decrease: (id) => decreaseMutation.mutate(id),
        remove: (id) => removeMutation.mutate(id),
        clear: () => clearMutation.mutate(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ==================== Providers ====================

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
