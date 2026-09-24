import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ShoppingCart,
  AlertCircle,
  Phone,
  ChevronLeft,
  Package,
} from "lucide-react";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/useAuth";
import useOrder from "../../Hooks/useOrders";
import CartItem from "../../Components/CartItem/CartItem";
import type { Order } from "../../types";

type OrderFormData = {
  address: string;
  phone: string;
};

const DELIVERY_COST = 90_000;
const FREE_SHIPPING_LIMIT = 5_000_000;

export default function Cart() {
  const { cart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);

  const orderMutation = useOrder(cart);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OrderFormData>({
    mode: "onChange",
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost =
    totalPrice >= FREE_SHIPPING_LIMIT ? 0 : DELIVERY_COST;

  const finalTotal = totalPrice + shippingCost;

  const onSubmitOrder = (data: OrderFormData) => {
    if (!user) {
      alert("لطفاً ابتدا وارد شوید.");
      return;
    }

    const order: Order = {
      userID: user.id,
      userName: user.username,
      userFirstname: user.firstName,
      userLastname: user.lastName,
      items: cart,
      allPrice: finalTotal,
      address: data.address,
      phone: data.phone,
      date: new Date(),
    };

    orderMutation.mutate(order);
  };

  // user doesnt login
  if (!user) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
        <div className="bg-card border border-border rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShoppingCart size={28} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-text-main mb-3">سبد خرید</h2>
          <p className="text-text-secondary mb-6">
            برای مشاهده سبد خرید، لطفاً ابتدا وارد حساب کاربری خود شوید.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            ورود به حساب
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light pb-16">
      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/*page title */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart size={26} className="text-primary" />
          <h1 className="text-2xl font-bold text-text-main">
            سبد خرید
            <span className="text-text-secondary font-normal text-lg pr-1">
              {user.firstName} {user.lastName}
            </span>
          </h1>
        </div>

        {/* step 1 */}
        {step === 1 && (
          <>
            {cart.length === 0 ? (
              <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-background-light flex items-center justify-center">
                  <Package size={36} className="text-text-secondary" />
                </div>
                <h3 className="text-lg font-medium text-text-main mb-2">
                  سبد خرید شما خالی است
                </h3>
                <p className="text-text-secondary mb-6">
                  هنوز محصولی به سبد اضافه نکرده‌اید
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
                >
                  شروع خرید
                  <ChevronLeft size={18} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <CartItem key={item.id} {...item} />
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                    <h3 className="font-bold text-text-main mb-5">
                      خلاصه سفارش
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">جمع سفارش</span>
                        <span className="font-medium text-text-main">
                          {totalPrice.toLocaleString()} تومان
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-text-secondary">هزینه ارسال</span>
                        <span className="font-medium text-text-main">
                          {shippingCost === 0
                            ? "رایگان"
                            : `${shippingCost.toLocaleString()} تومان`}
                        </span>
                      </div>

                      <div className="border-t border-border my-3" />

                      <div className="flex justify-between text-base">
                        <span className="font-medium text-text-main">
                          جمع کل
                        </span>
                        <span className="font-bold text-primary">
                          {finalTotal.toLocaleString()} تومان
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 p-3.5 bg-primary/5 border border-primary/10 rounded-xl">
                      <div className="flex items-center gap-2 text-sm font-medium text-text-main mb-1.5">
                        <AlertCircle size={16} className="text-primary" />
                        یادآوری
                      </div>
                      <p className="text-xs text-text-secondary leading-5">
                        امکان اتمام موجودی محصولات تا قبل از پرداخت کامل وجود
                        دارد.
                      </p>
                      <div className="flex items-center gap-2 mt-2.5 text-xs text-text-secondary">
                        <Phone size={13} />
                        خدمات مشتریان: ۰۹۲۲۳۲۷۹۴۹۱
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full mt-5 py-3.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm"
                    >
                      ادامه و ثبت سفارش
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* step 2 */}
        {step === 2 && (
          <div className="max-w-xl mx-auto">
            {cart.length === 0 ? (
              <p className="text-center text-text-secondary py-10">
                سبد خرید شما خالی است
              </p>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmitOrder)}
                className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-xl font-bold text-text-main mb-6">
                  اطلاعات ارسال سفارش
                </h2>

                <div className="space-y-1.5 mb-5">
                  <label className="block text-sm font-medium text-text-main">
                    آدرس
                  </label>
                  <textarea
                    rows={3}
                    placeholder="تهران، خیابان آزادی، پلاک ۱۲۳"
                    {...register("address", {
                      required: "آدرس خود را وارد کنید",
                      minLength: {
                        value: 10,
                        message: "آدرس باید حداقل ۱۰ کاراکتر باشد",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-xl border bg-background-light text-text-main
                               placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all resize-none
                               ${
                                 errors.address
                                   ? "border-error focus:ring-error/20"
                                   : "border-border focus:ring-primary/20 focus:border-primary"
                               }`}
                  />
                  {errors.address && (
                    <p className="text-sm text-error flex items-center gap-1.5">
                      <AlertCircle size={14} />
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 mb-6">
                  <label className="block text-sm font-medium text-text-main">
                    شماره موبایل
                  </label>
                  <input
                    type="text"
                    placeholder="09123456789"
                    {...register("phone", {
                      required: "شماره موبایل خود را وارد کنید",
                      pattern: {
                        value: /^09\d{9}$/,
                        message: "شماره وارد شده معتبر نیست (مثال: 09123456789)",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-xl border bg-background-light text-text-main
                               placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all
                               ${
                                 errors.phone
                                   ? "border-error focus:ring-error/20"
                                   : "border-border focus:ring-primary/20 focus:border-primary"
                               }`}
                  />
                  {errors.phone && (
                    <p className="text-sm text-error flex items-center gap-1.5">
                      <AlertCircle size={14} />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="bg-background-light rounded-xl p-4 mb-6 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">جمع سفارش</span>
                    <span>{totalPrice.toLocaleString()} تومان</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">ارسال</span>
                    <span>
                      {shippingCost === 0
                        ? "رایگان"
                        : `${shippingCost.toLocaleString()} تومان`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-text-main pt-2 border-t border-border">
                    <span>مبلغ قابل پرداخت</span>
                    <span className="text-primary">
                      {finalTotal.toLocaleString()} تومان
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-xl border border-border text-text-main font-medium hover:bg-background-light transition-colors"
                  >
                    بازگشت به سبد
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid || orderMutation.isPending}
                    className={`flex-1 py-3 rounded-xl font-medium text-white transition-all ${
                      !isValid || orderMutation.isPending
                        ? "bg-primary/50 cursor-not-allowed"
                        : "bg-primary hover:bg-primary-dark shadow-sm"
                    }`}
                  >
                    {orderMutation.isPending
                      ? "در حال ثبت سفارش..."
                      : "ثبت نهایی سفارش"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}