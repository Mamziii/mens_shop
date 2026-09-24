import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import useLogin from "../../Hooks/useLogin"; 
import type { LoginFormData } from "../../types";

export default function Login() {
  const [visiblePass, setVisiblePass] = useState(false);
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-3xl shadow-xl p-8 md:p-10">
          {/* logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <span className="text-3xl font-bold tracking-wide">
                <span className="text-primary">ves</span>
                <span className="text-accent">per</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-text-main mt-2">ورود به حساب</h1>
            <p className="text-sm text-text-secondary mt-2">
              خوش آمدید! لطفا وارد حساب کاربری خود شوید
            </p>
          </div>

          {/* login form */}
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-5">
            
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-text-main">
                ایمیل
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                autoComplete="new-email"
                {...register("email", {
                  required: "وارد کردن ایمیل اجباری است",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "ایمیل وارد شده معتبر نمی‌باشد",
                  },
                })}
                className={`w-full px-4 py-3 rounded-xl border bg-background-light text-text-main
                           placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all
                           ${
                             errors.email
                               ? "border-error focus:ring-error/20"
                               : "border-border focus:ring-primary/20 focus:border-primary"
                           }`}
              />
              {errors.email && (
                <p className="flex items-center gap-1.5 text-sm text-error mt-1">
                  <AlertCircle size={15} />
                  {errors.email.message}
                </p>
              )}
            </div>

            
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-text-main">
                رمز عبور
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={visiblePass ? "password" : "text"}
                  placeholder="رمز عبور خود را وارد کنید"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "وارد کردن رمز عبور اجباری است",
                    minLength: {
                      value: 6,
                      message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                    },
                  })}
                  className={`w-full px-4 py-3 pl-12 rounded-xl border bg-background-light text-text-main
                             placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 transition-all
                             ${
                               errors.password
                                 ? "border-error focus:ring-error/20"
                                 : "border-border focus:ring-primary/20 focus:border-primary"
                             }`}
                />
                <button
                  type="button"
                  onClick={() => setVisiblePass(!visiblePass)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
                >
                  {visiblePass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1.5 text-sm text-error mt-1">
                  <AlertCircle size={15} />
                  {errors.password.message}
                </p>
              )}
            </div>

            
            <button
              type="submit"
              disabled={!isValid || isPending}
              className={`w-full py-3.5 rounded-xl font-medium text-white transition-all mt-2
                         ${
                           !isValid || isPending
                             ? "bg-primary/50 cursor-not-allowed"
                             : "bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg"
                         }`}
            >
              {isPending ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          
          <p className="text-center text-sm text-text-secondary mt-8">
            هنوز ثبت‌نام نکرده‌اید؟{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:text-primary-dark transition-colors"
            >
              ثبت‌نام کنید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}