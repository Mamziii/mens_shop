import { Link } from "react-router-dom";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  ArrowLeft,
} from "lucide-react";
import { useFetchAllProducts } from "../../Hooks/useFetchProducts";

// components
import HeroSlider from "../../Components/HeroSlider/HeroSlider";
import ProductCard from "../../Components/ProductCard/ProductCard";
import ModelsCarousel from "../../Components/ModelsCarousel/ModelsCarousel";

export default function Home() {
  const { data: products = [], isLoading } = useFetchAllProducts();
  const targetDate = new Date("02/01/2026");
  const newestProducts = products
    .filter((item) => new Date(item.date) >= targetDate)
    .slice(0, 8);
  const discountProducts = products.filter((p) => p.discount > 0).slice(0, 8);

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero */}
      <HeroSlider />

      {/* Models Carousel */}
      <section className="container mx-auto px-4 max-w-7xl py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text-main">
            دسته‌بندی محصولات
          </h2>
        </div>
        <ModelsCarousel />
      </section>

      {/* new products */}
      <section className="bg-card py-14">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-main">جدیدترین‌ها</h2>
            <Link
              to="/new-products"
              className="text-sm text-primary hover:text-accent font-medium flex items-center gap-2 hover:gap-1 transition-all"
            >
              مشاهده همه
              <ArrowLeft size={16} />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-3/4 rounded-2xl bg-background-light animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {newestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* discount banner */}
      <section className="container mx-auto px-4 max-w-7xl py-14">
        <div className="relative rounded-3xl overflow-hidden h-56 md:h-72">
          <img
            src="./home/discount_section.png"
            alt="تخفیف ویژه"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 flex items-center">
            <div className="px-8 md:px-14 text-white max-w-lg">
              <p className="text-accent font-medium mb-2">پیشنهاد ویژه</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-5">
                تا ۴۰٪ تخفیف روی منتخب محصولات
              </h2>
              <Link
                to="/discounts"
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-background-light px-6 py-3 rounded-xl font-medium transition-colors"
              >
                مشاهده تخفیف‌ها
                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* discount products */}
      <section className="container mx-auto px-4 max-w-7xl pb-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-text-main">
            پیشنهادهای شگفت‌انگیز
          </h2>
          <Link
            to="/discounts"
            className="text-sm text-primary hover:text-accent font-medium flex items-center gap-2 hover:gap-1 transition-all"
          >
            مشاهده همه
            <ArrowLeft size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-3/4 rounded-2xl bg-background-light animate-pulse"
              />
            ))}
          </div>
        ) : discountProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {discountProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary py-10">
            در حال حاضر محصول تخفیف‌داری وجود ندارد
          </p>
        )}
      </section>

      {/* advantages */}
      <section className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Truck size={26} className="text-primary" />
              </div>
              <h3 className="font-medium text-text-main">ارسال سریع</h3>
              <p className="text-sm text-text-secondary">ارسال به سراسر کشور</p>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck size={26} className="text-primary" />
              </div>
              <h3 className="font-medium text-text-main">ضمانت اصالت</h3>
              <p className="text-sm text-text-secondary">تضمین کیفیت کالا</p>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <RefreshCw size={26} className="text-primary" />
              </div>
              <h3 className="font-medium text-text-main">۷ روز بازگشت</h3>
              <p className="text-sm text-text-secondary">بازگشت آسان کالا</p>
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Headphones size={26} className="text-primary" />
              </div>
              <h3 className="font-medium text-text-main">پشتیبانی</h3>
              <p className="text-sm text-text-secondary">پاسخگویی همیشگی</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
