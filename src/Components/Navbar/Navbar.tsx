import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";
import SearchBox from "../SearchBox/SearchBox";
import { useAuth } from "../../Context/useAuth";
import { useCart } from "../../Context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, token, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = !!token && !!user;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* right - logo + cart */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="flex items-center gap-2.5 group">
                <span className="text-xl lg:text-2xl font-bold tracking-wide group-hover:text-primary-dark transition-colors">
                  <span className="text-primary">ves</span>
                  <span className="text-accent">per</span>
                </span>
              </Link>

              <Link
                to="/cart"
                className="relative p-2.5 rounded-full text-text-main hover:bg-background-light hover:text-primary transition-colors"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -left-1 w-5 h-5   flex items-center justify-center bg-primary text-white text-[11px] font-bold rounded-full">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* center - menu in desktop size */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              <nav>
                <ul className="flex items-center gap-7">
                  <li>
                    <Link
                      to="/new-products"
                      className="text-sm font-medium text-text-main hover:text-primary transition-colors relative group"
                    >
                      جدیدترین‌ها
                      <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>

                  {/* clothes */}
                  <li className="relative group">
                    <button className="flex items-center gap-1 text-sm font-medium text-text-main hover:text-primary transition-colors">
                      لباس
                      <ChevronDown
                        size={14}
                        className="group-hover:rotate-180 transition-transform duration-200"
                      />
                    </button>
                    <div className="absolute top-full right-0 mt-3 w-130 bg-card border border-border rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-5">
                      <div className="grid grid-cols-4 gap-6">
                        <ul className="space-y-2">
                          <li>
                            <Link
                              to="/پیراهن"
                              className="block text-sm text-text-main hover:text-primary py-1 hover:bg-gray-100 p-2 rounded-md"
                            >
                              پیراهن
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/هودی و سوییشرت"
                              className="block text-sm text-text-main hover:text-primary py-1 hover:bg-gray-100 p-2 rounded-md"
                            >
                              سوییشرت و هودی
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/کاپشن"
                              className="block text-sm text-text-main hover:text-primary py-1 hover:bg-gray-100 p-2 rounded-md"
                            >
                              کاپشن
                            </Link>
                          </li>
                        </ul>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              to="/شلوار لی"
                              className="block text-sm text-text-main hover:text-primary py-1 hover:bg-gray-100 p-2 rounded-md"
                            >
                              شلوار جین
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/شلوار پارچه ای"
                              className="block text-sm text-text-main hover:text-primary py-1 hover:bg-gray-100 p-2 rounded-md"
                            >
                              شلوار پارچه‌ای
                            </Link>
                          </li>
                        </ul>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              to="/تی شرت"
                              className="block text-sm text-text-main hover:text-primary py-1 hover:bg-gray-100 p-2 rounded-md"
                            >
                              تیشرت
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/کت تک"
                              className="block text-sm text-text-main hover:text-primary py-1 hover:bg-gray-100 p-2 rounded-md"
                            >
                              کت تک
                            </Link>
                          </li>
                        </ul>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              to="/شلوارک"
                              className="block text-sm text-text-main hover:text-primary py-1 hover:bg-gray-100 p-2 rounded-md"
                            >
                              شلوارک
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  {/* shoes */}
                  <li className="relative group">
                    <button className="flex items-center gap-1 text-sm font-medium text-text-main hover:text-primary transition-colors">
                      کفش
                      <ChevronDown
                        size={14}
                        className="group-hover:rotate-180 transition-transform duration-200"
                      />
                    </button>
                    <div className="absolute top-full right-0 mt-3 w-56 bg-card border border-border rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-4">
                      <ul className="space-y-2">
                        <li>
                          <Link
                            to="/کفش روزمره"
                            className="block text-sm text-text-main hover:text-primary py-1.5 hover:bg-gray-100 p-2 rounded-md"
                          >
                            کفش روزمره
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/کفش رسمی"
                            className="block text-sm text-text-main hover:text-primary py-1.5 hover:bg-gray-100 p-2 rounded-md"
                          >
                            کفش رسمی
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/بوت و نیم بوت"
                            className="block text-sm text-text-main hover:text-primary py-1.5 hover:bg-gray-100 p-2 rounded-md"
                          >
                            بوت و نیم بوت
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/* accessories */}
                  <li className="relative group">
                    <button className="flex items-center gap-1 text-sm font-medium text-text-main hover:text-primary transition-colors">
                      اکسسوری
                      <ChevronDown
                        size={14}
                        className="group-hover:rotate-180 transition-transform duration-200"
                      />
                    </button>
                    <div className="absolute top-full right-0 mt-3 w-48 bg-card border border-border rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-4">
                      <ul className="space-y-2">
                        <li>
                          <Link
                            to="/کلاه"
                            className="block text-sm text-text-main hover:text-primary py-1.5 hover:bg-gray-100 p-2 rounded-md"
                          >
                            کلاه
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/عطر و ادکلن"
                            className="block text-sm text-text-main hover:text-primary py-1.5 hover:bg-gray-100 p-2 rounded-md"
                          >
                            ادکلن
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/کمربند"
                            className="block text-sm text-text-main hover:text-primary py-1.5 hover:bg-gray-100 p-2 rounded-md"
                          >
                            کمربند
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li>
                    <Link
                      to="/discounts"
                      className="text-sm font-medium text-text-main hover:text-primary transition-colors relative group"
                    >
                      تخفیف‌ها
                      <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                </ul>
              </nav>

              <SearchBox />
            </div>

            {/* left */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2">
                {isAuthenticated ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-background-light transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User size={18} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium text-text-main max-w-35 truncate">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
                        <div className="p-2">
                          <Link
                            to="/داشبورد"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-main hover:bg-background-light rounded-xl transition-colors"
                          >
                            <LayoutDashboard
                              size={18}
                              className="text-primary"
                            />
                            داشبورد کاربر
                          </Link>
                          <Link
                            to="/سفارشات من"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-main hover:bg-background-light rounded-xl transition-colors"
                          >
                            <Package size={18} className="text-primary" />
                            سفارشات من
                          </Link>
                          <div className="my-1 border-t border-border" />
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/5 rounded-xl transition-colors"
                          >
                            <LogOut size={18} />
                            خروج از حساب
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-text-main hover:text-primary transition-colors"
                    >
                      ورود
                    </Link>
                    <Link
                      to="/register"
                      className="px-5 py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                    >
                      ثبت‌نام
                    </Link>
                  </>
                )}
              </div>

              {/* mobile icons */}
              <div className="flex items-center gap-1 lg:hidden">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 rounded-full text-text-main hover:bg-background-light hover:text-primary transition-colors"
                >
                  <Search size={22} />
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2.5 rounded-full text-text-main hover:bg-background-light hover:text-primary transition-colors"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-card z-50 shadow-2xl 
                    transform transition-transform duration-300 ease-in-out lg:hidden
                    ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-border bg-background-light">
          <span className="text-lg font-bold">
            <span className="text-primary">ves</span>
            <span className="text-accent">per</span>
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-card text-text-secondary"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1 overflow-y-auto h-[calc(100%-80px)]">
          <Link
            to="/new-products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-3.5 hover:bg-background-light rounded-xl font-medium"
          >
            جدیدترین‌ها
          </Link>

          {/* clothes accordion */}
          <div>
            <button
              onClick={() => toggleAccordion("clothes")}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-background-light rounded-xl font-medium"
            >
              <span>لباس</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  openAccordion === "clothes" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openAccordion === "clothes"
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pr-6 pb-2 space-y-1">
                <Link
                  to="/پیراهن"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  پیراهن
                </Link>
                <Link
                  to="/هودی و سوییشرت"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  سوییشرت و هودی
                </Link>
                <Link
                  to="/کاپشن"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  کاپشن
                </Link>
                <Link
                  to="/تی شرت"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  تیشرت
                </Link>
                <Link
                  to="/کت تک"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  کت تک
                </Link>
                <Link
                  to="/شلوار لی"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  شلوار جین
                </Link>
                <Link
                  to="/شلوار پارچه ای"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  شلوار پارچه‌ای
                </Link>
                <Link
                  to="/شلوارک"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  شلوارک
                </Link>
              </div>
            </div>
          </div>

          {/* shoes accordion */}
          <div>
            <button
              onClick={() => toggleAccordion("shoes")}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-background-light rounded-xl font-medium"
            >
              <span>کفش</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  openAccordion === "shoes" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openAccordion === "shoes"
                  ? "max-h-48 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pr-6 pb-2 space-y-1">
                <Link
                  to="/کفش روزمره"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  کفش روزمره
                </Link>
                <Link
                  to="/کفش رسمی"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  کفش رسمی
                </Link>
                <Link
                  to="/بوت و نیم بوت"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  کفش نیم بوت - بوت
                </Link>
              </div>
            </div>
          </div>

          {/* accessories accordion */}
          <div>
            <button
              onClick={() => toggleAccordion("accessories")}
              className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-background-light rounded-xl font-medium"
            >
              <span>اکسسوری</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  openAccordion === "accessories" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openAccordion === "accessories"
                  ? "max-h-48 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pr-6 pb-2 space-y-1">
                <Link
                  to="/کلاه"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  کلاه
                </Link>
                <Link
                  to="/عطر و ادکلن"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  ادکلن
                </Link>
                <Link
                  to="/کمربند"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary rounded-lg"
                >
                  کمربند
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/discounts"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-3.5 hover:bg-background-light rounded-xl font-medium text-error"
          >
            تخفیف‌ها
          </Link>

          <div className="my-4 border-t border-border" />

          {/* user section in mobile */}
          {isAuthenticated ? (
            <>
              <div className="px-4 py-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-main">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-text-secondary">
                      حساب کاربری شما
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/داشبورد"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3.5 flex items-center gap-3 hover:bg-background-light rounded-xl"
              >
                <LayoutDashboard size={18} className="text-primary" />
                داشبورد کاربر
              </Link>

              <Link
                to="/سفارشات من"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3.5 flex items-center gap-3 hover:bg-background-light rounded-xl"
              >
                <Package size={18} className="text-primary" />
                سفارشات من
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3.5 flex items-center gap-3 hover:bg-background-light rounded-xl"
              >
                <ShoppingCart size={18} className="text-primary" />
                سبد خرید
                {cartCount > 0 && (
                  <span className="mr-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-3.5 flex items-center gap-3 hover:bg-error/5 text-error rounded-xl w-full text-right"
              >
                <LogOut size={18} />
                خروج از حساب
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3.5 flex items-center gap-3 hover:bg-background-light rounded-xl"
              >
                <User size={18} className="text-primary" />
                ورود به حساب
              </Link>

              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-4 mt-2 py-3 text-center bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
              >
                ثبت‌نام
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* search modal mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative bg-card p-4 pt-5 shadow-lg">
            <div className="flex items-center gap-3">
              <SearchBox
                isMobile={true}
                onClose={() => setIsSearchOpen(false)}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-text-secondary hover:text-primary font-medium px-3 shrink-0"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
