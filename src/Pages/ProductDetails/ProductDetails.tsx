import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ChevronRight,
  ShoppingCart,
  AlertCircle,
  Truck,
} from "lucide-react";
import { useFetchAllProducts } from "../../Hooks/useFetchProducts";
import { useAuth } from "../../Context/useAuth";
import { useAddToCart } from "../../Hooks/useAddToCart";
import SimilarProducts from "../../Components/SimilarProducts/SimilarProducts";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleAddToCart } = useAddToCart();

  const { data: products = [], isLoading, isError } = useFetchAllProducts();

  const product = products.find((item) => item.id.toString() === id);

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setActiveImage(null);
    setSelectedSize(null);
    setSelectedColor(null);
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    img.style.transformOrigin = `${x}px ${y}px`;
    img.style.transform = "scale(1.8)";
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (!img) return;

    img.style.transformOrigin = "center";
    img.style.transform = "scale(1)";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-text-secondary">در حال بارگذاری...</div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background-light flex flex-col items-center justify-center gap-4">
        <p className="text-text-main text-lg">محصول مورد نظر یافت نشد</p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
        >
          بازگشت
        </button>
      </div>
    );
  }

  const allImages = [product.mainImage, ...(product.images || [])];
  const currentImage = activeImage || product.mainImage;

  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const similarProducts = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  const onAddToCart = () => {
    if (!user) {
      alert("لطفا ابتدا وارد حساب کاربری خود شوید");
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      alert("لطفا سایز را انتخاب کنید");
      return;
    }

    if (!selectedColor) {
      alert("لطفا رنگ را انتخاب کنید");
      return;
    }

    const success = handleAddToCart(
      product,
      selectedSize,
      selectedColor,
      finalPrice
    );

    if (success) {
      setSelectedSize(null);
      setSelectedColor(null);
    }
  };

  return (
    <div className="bg-background-light min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* return btn */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-6 transition-colors"
        >
          <ChevronRight size={18} />
          بازگشت
        </button>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* images */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImage === img
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`تصویر ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div
              className="relative flex-1 aspect-3/4 rounded-2xl overflow-hidden bg-card border border-border cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imgRef}
                src={currentImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-200"
              />

              {product.discount > 0 && (
                <span className="absolute top-4 right-4 bg-error text-white text-sm font-medium px-3 py-1.5 rounded-full">
                  {product.discount}٪ تخفیف
                </span>
              )}
            </div>
          </div>

          {/* detials */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-text-main mb-3 leading-snug">
              {product.title}
            </h1>

            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.ceil(product.rate)
                      ? "fill-accent text-accent"
                      : "text-border"
                  }
                />
              ))}
              <span className="text-sm text-text-secondary mr-2">
                ({product.rate})
              </span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-bold text-text-main">
                {finalPrice.toLocaleString()} تومان
              </span>
              {product.discount > 0 && (
                <span className="text-lg text-text-secondary line-through">
                  {product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-text-secondary leading-7 mb-6">{product.desc}</p>

            <div className="flex items-center gap-2 text-sm mb-6">
              <span className="text-text-secondary">موجودی انبار:</span>
              <span
                className={`font-medium ${
                  product.quantity > 0 ? "text-success" : "text-error"
                }`}
              >
                {product.quantity > 0 ? `${product.quantity} عدد` : "ناموجود"}
              </span>
            </div>

            <div className="border-t border-border my-2" />

            {/* color */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-medium text-text-main mb-3">
                  رنگ:
                  {selectedColor && (
                    <span className="text-text-secondary font-normal mr-2">
                      انتخاب شده
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-primary scale-110 ring-2 ring-primary/30"
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* size */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-text-main mb-3">
                  سایز:
                  {selectedSize && (
                    <span className="text-text-secondary font-normal mr-2">
                      {selectedSize}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-48px h-11 px-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "bg-primary text-white border-primary"
                          : "bg-card text-text-main border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* free delivery */}
            <div className="flex items-center gap-2 mt-6 p-3.5 bg-primary/5 border border-primary/10 rounded-xl text-sm text-text-main">
              <Truck size={18} className="text-primary shrink-0" />
              <span>
                ارسال رایگان برای خریدهای بالای{" "}
                <strong>۵,۰۰۰,۰۰۰</strong> تومان
              </span>
            </div>

            {/* add to cart btn */}
            <button
              onClick={onAddToCart}
              disabled={product.quantity === 0}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-white transition-all ${
                product.quantity === 0
                  ? "bg-text-secondary/40 cursor-not-allowed"
                  : "bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg"
              }`}
            >
              <ShoppingCart size={20} />
              {product.quantity === 0 ? "ناموجود" : "افزودن به سبد خرید"}
            </button>

            {!user && (
              <p className="flex items-center gap-1.5 text-sm text-text-secondary mt-3">
                <AlertCircle size={15} />
                برای افزودن به سبد، ابتدا وارد حساب کاربری شوید
              </p>
            )}
          </div>
        </div>

        {/* similar products */}
        <SimilarProducts products={similarProducts} />
      </div>
    </div>
  );
}