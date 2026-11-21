import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import type { LoginFormData, LoginResponse } from "../types";
import { API_URL } from "../config/api";

export default function useLogin() {
  const auth = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData): Promise<LoginResponse> => {
      const res = await axios.post<LoginResponse>(`${API_URL}/login`, {
        email: data.email,
        password: data.password,
      });

      return res.data;
    },
    onSuccess: (data) => {
      const { accessToken, user } = data;
      auth.login(accessToken, user);
      navigate("/");
    },
    onError: (err: unknown) => {
      alert("ورود ناموفق!!!!");

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