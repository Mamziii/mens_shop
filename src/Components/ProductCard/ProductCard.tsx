import { Link } from "react-router-dom";
import { useState } from "react";
import type { Product } from "../../types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const hoverImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.mainImage;

  const isOutOfStock = product.quantity === 0;

  return (
    <Link
      to={`/${product.category}/${product.id}`}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-3/4 overflow-hidden bg-background-light">
        {/* main image */}
        <img
          src={product.mainImage}
          alt={product.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* hover image */}
        <img
          src={hoverImage}
          alt={product.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 bg-error text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
            {product.discount}٪ تخفیف
          </span>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <span className="bg-white text-error text-sm font-bold px-4 py-2 rounded-full shadow-md">
              ناموجود
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-text-secondary mb-1">{product.category}</p>
        <h3 className="text-xl font-bold text-text-main line-clamp-2 mb-3 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-text-main">
            {finalPrice.toLocaleString()} تومان
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-text-secondary line-through">
              {product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}