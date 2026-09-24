import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Pencil, X, AlertCircle, Mail, AtSign, Shield } from "lucide-react";
import { useAuth } from "../../Context/useAuth";
import { useUsers } from "../../Hooks/useUser";
import type { UserUpDateFormData } from "../../types";
import toast from "react-hot-toast";

export default function UserInfos() {
  const { user } = useAuth();
  const { updateUser } = useUsers();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UserUpDateFormData>({
    mode: "onChange",
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      });
    }
  }, [user, reset]);

  if (!user) return null;

  const onSubmit = (data: UserUpDateFormData) => {
    updateUser.mutate(
      { userId: user.id, data },
      {
        onSuccess: () => {
          toast.success("اطلاعات با موفقیت به‌روزرسانی شد");
        setIsModalOpen(false);
        },
        onError: () => {
          alert("خطا در به‌روزرسانی اطلاعات.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background-light pb-16">
      <div className="container mx-auto px-4 max-w-lg py-10">
        {/* هدر */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
            <User size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">اطلاعات حساب</h1>
            <p className="text-sm text-text-secondary mt-0.5">
              مشاهده و ویرایش مشخصات
            </p>
          </div>
        </div>

        {/* کارت اطلاعات */}
        <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
          {/* آواتار */}
          <div className="bg-background-light px-6 py-8 flex flex-col items-center border-b border-border">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <User size={36} className="text-primary" />
            </div>
            <h2 className="text-lg font-bold text-text-main">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-text-secondary mt-1">@{user.username}</p>
          </div>

          {/* جزئیات */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-background-light flex items-center justify-center shrink-0">
                <User size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">نام</p>
                <p className="text-sm font-medium text-text-main">
                  {user.firstName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-background-light flex items-center justify-center shrink-0">
                <User size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">نام خانوادگی</p>
                <p className="text-sm font-medium text-text-main">
                  {user.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-background-light flex items-center justify-center shrink-0">
                <AtSign size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">نام کاربری</p>
                <p className="text-sm font-medium text-text-main">
                  {user.username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-background-light flex items-center justify-center shrink-0">
                <Mail size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">ایمیل</p>
                <p className="text-sm font-medium text-text-main">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-background-light flex items-center justify-center shrink-0">
                <Shield size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">نقش</p>
                <p className="text-sm font-medium text-text-main">
                  {user.role === "admin" ? "ادمین" : "کاربر عادی"}
                </p>
              </div>
            </div>
          </div>

          {/* دکمه ویرایش */}
          <div className="px-6 pb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm"
            >
              <Pencil size={17} />
              ویرایش اطلاعات
            </button>
          </div>
        </div>
      </div>

      {/* مودال ویرایش */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-card border border-border rounded-3xl shadow-xl w-full max-w-md p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-main">
                ویرایش اطلاعات
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-background-light text-text-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* نام */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">
                  نام
                </label>
                <input
                  {...register("firstName", {
                    required: "وارد کردن نام الزامی است",
                  })}
                  className={`w-full px-4 py-3 rounded-xl border bg-background-light text-text-main
                             focus:outline-none focus:ring-2 transition-all
                             ${
                               errors.firstName
                                 ? "border-error focus:ring-error/20"
                                 : "border-border focus:ring-primary/20 focus:border-primary"
                             }`}
                />
                {errors.firstName && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* نام خانوادگی */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">
                  نام خانوادگی
                </label>
                <input
                  {...register("lastName", {
                    required: "وارد کردن نام خانوادگی الزامی است",
                  })}
                  className={`w-full px-4 py-3 rounded-xl border bg-background-light text-text-main
                             focus:outline-none focus:ring-2 transition-all
                             ${
                               errors.lastName
                                 ? "border-error focus:ring-error/20"
                                 : "border-border focus:ring-primary/20 focus:border-primary"
                             }`}
                />
                {errors.lastName && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* نام کاربری */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">
                  نام کاربری
                </label>
                <input
                  {...register("username", {
                    required: "وارد کردن نام کاربری الزامی است",
                  })}
                  className={`w-full px-4 py-3 rounded-xl border bg-background-light text-text-main
                             focus:outline-none focus:ring-2 transition-all
                             ${
                               errors.username
                                 ? "border-error focus:ring-error/20"
                                 : "border-border focus:ring-primary/20 focus:border-primary"
                             }`}
                />
                {errors.username && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* ایمیل */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-main">
                  ایمیل
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "وارد کردن ایمیل الزامی است",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "ایمیل معتبر نیست",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-xl border bg-background-light text-text-main
                             focus:outline-none focus:ring-2 transition-all
                             ${
                               errors.email
                                 ? "border-error focus:ring-error/20"
                                 : "border-border focus:ring-primary/20 focus:border-primary"
                             }`}
                />
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-sm text-error">
                    <AlertCircle size={14} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* دکمه‌ها */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-border text-text-main font-medium hover:bg-background-light transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={!isValid || updateUser.isPending}
                  className={`flex-1 py-3 rounded-xl font-medium text-white transition-all ${
                    !isValid || updateUser.isPending
                      ? "bg-primary/50 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-dark shadow-sm"
                  }`}
                >
                  {updateUser.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}