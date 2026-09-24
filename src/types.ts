export type RegisterFormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
};

export type LoginFormData = {
  email: string;
  password: string;
};

export interface Product {
  id: number;
  category: string;
  title: string;
  mainImage: string;
  price: number;
  desc: string;
  images: string[];
  colors: string[];
  sizes: string[];
  quantity: number;
  rate: number;
  discount: number;
  date: string;
  type: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: "male" | "female";
}

export type UserUpDateFormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};

export interface CartItem {
  id: number;
  category: string;
  title: string;
  mainImage: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  discount: number;
  userID: number;
  productID: number;
  type: string;
}

export interface Order {
  id?: number;
  userID: number | undefined;
  userName: string | undefined;
  userFirstname: string | undefined;
  userLastname: string | undefined;
  items: CartItem[];
  allPrice: number;
  address: string;
  phone: string;
  date: Date;
}

export type SortType = "default" | "asc" | "desc";

export type ProductTypeType =
  | "default"
  | "بگ"
  | "مام استایل"
  | "اسکینی"
  | "کارگو";
