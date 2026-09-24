import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/useAuth";
import type { Product } from "../types";

export function useAddToCart() {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (
    product: Product,
    selectedSize: string | null,
    selectedColor: string | null,
    finalPrice?: number, 
  ) => {
    if (!user) {
      alert("لطفا ابتدا وارد سایت شوید!!!");
      return false;
    }

    if (!selectedSize || !selectedColor) {
      alert(`لطفا سایز و رنگ «${product.title}» را انتخاب کنید`);
      return false;
    }

    addToCart({
      productID: product.id,
      title: product.title,
      price: finalPrice ?? product.price,
      mainImage: product.mainImage,
      category: product.category,
      discount: product.discount,
      type: product.type || "",
      color: selectedColor,
      size: selectedSize,
    });

    return true;
  };

  return { handleAddToCart };
}