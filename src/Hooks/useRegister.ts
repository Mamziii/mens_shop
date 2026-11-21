import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { RegisterFormData, RegisterResponse } from "../types";
import { API_URL } from "../config/api";

export default function useRegister() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData): Promise<RegisterResponse> => {
      const res = await axios.post<RegisterResponse>(`${API_URL}/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        gender: data.gender,
        role: "user",
      });

      return res.data;
    },

    onSuccess: () => {
      navigate("/login");
    },

    onError: (err: unknown) => {
      alert("ثبت نام ناموفق بود !!!!!");

      if (err instanceof AxiosError) {
        console.log(err.response?.data || err.message);
      } else if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    },
  });

  return mutation;
}