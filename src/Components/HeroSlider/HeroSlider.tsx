import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "مجموعه پاییز و زمستان",
    subtitle: "جدیدترین استایل‌های مردانه",
    image: "./home/heroslide/newproducts.png",
    link: "/new-products",
    buttonText: "مشاهده مجموعه",
  },
  {
    id: 2,
    title: "تا ۴۰٪ تخفیف ویژه",
    subtitle: "روی منتخب محصولات",
    image: "./home/heroslide/discounts.png",
    link: "/discounts",
    buttonText: "مشاهده تخفیف‌ها",
  },
  {
    id: 3,
    title: "کفش‌های رسمی و روزمره",
    subtitle: "کیفیت و راحتی در کنار هم",
    image: "./home/heroslide/shoes.png",
    link: "/کفش روزمره",
    buttonText: "خرید کفش",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // auto play every 5.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <section className="relative h-100 md:h-125 lg:h-145 overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-l from-black/70 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="max-w-lg text-white">
                <p className="text-accent font-medium mb-2 text-sm md:text-base">
                  {slide.subtitle}
                </p>
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <Link
                  to={slide.link}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {slide.buttonText}
                  <ArrowLeft size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* prev button */}
      <button
        onClick={prevSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white
                   hover:bg-white/30 transition-colors flex items-center justify-center cursor-pointer"
      >
        <ChevronRight size={22} />
      </button>

      {/* next button */}
      <button
        onClick={nextSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm text-white
                   hover:bg-white/30 transition-colors flex items-center justify-center cursor-pointer"
      >
        <ChevronLeft size={22} />
      </button>

      {/* dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2.5 cursor-pointer"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
