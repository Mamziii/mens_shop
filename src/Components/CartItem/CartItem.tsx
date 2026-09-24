import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import type { CartItem as CartItemType } from "../../types";

export default function CartItem({
  id,
  productID,
  mainImage,
  title,
  price,
  quantity,
  color,
  size,
  type,
  discount,
  category
}: CartItemType) {
  const { decrease, increase, remove } = useCart();

  return (
    <div className="flex gap-4 p-4 bg-card border border-border rounded-2xl hover:shadow-sm transition-shadow">
      {/* image */}
      <Link to={`/${category}/${productID}`} className="shrink-0">
        <img
          src={mainImage}
          alt={title}
          className="w-24 h-28 sm:w-28 sm:h-32 object-cover rounded-xl bg-background-light"
        />
      </Link>

      {/* details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        {/* title */}
        <div>
          <Link
            to={`/product/${productID}`}
            className="text-sm sm:text-base font-medium text-text-main hover:text-primary line-clamp-2 transition-colors"
          >
            {title}
          </Link>

          {/* size - color */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-sm text-text-secondary">
            <div className="flex items-center gap-1.5">
              <span>سایز:</span>
              <span className="font-medium text-text-main">{size}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span>رنگ:</span>
              <span
                className="w-4 h-4 rounded-full border border-border inline-block"
                style={{ backgroundColor: color }}
                title={color}
              />
            </div>

            {type ? (
              <div className="flex items-center gap-1.5">
                <span>نوع:</span>
                <span className="font-medium text-text-main">{type}</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* price - quantity - delete */}
        <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
          {/* quantity */}
          <div className="flex items-center border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => increase(id)}
              className="w-9 h-9 flex items-center justify-center text-text-main hover:bg-background-light transition-colors"
            >
              <Plus size={15} />
            </button>

            <span className="w-9 text-center text-sm font-medium text-text-main">
              {quantity}
            </span>

            <button
              onClick={() => decrease(id)}
              className="w-9 h-9 flex items-center justify-center text-text-main hover:bg-background-light transition-colors"
            >
              <Minus size={15} />
            </button>
          </div>

          {/* price */}
          <div className="text-left">
            <p className="font-bold text-text-main">
              {(price * quantity).toLocaleString()} تومان
            </p>
            {discount > 0 && (
              <p className="text-xs text-text-secondary line-through">
                {(price * quantity).toLocaleString()}
              </p>
            )}
          </div>

          {/* delete btn */}
          <button
            onClick={() => remove(id)}
            className="p-2 rounded-lg text-text-secondary hover:text-error hover:bg-error/5 transition-colors"
            title="حذف از سبد"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
