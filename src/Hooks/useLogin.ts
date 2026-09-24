import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import type { LoginFormData } from "../types";

export default function useLogin() {
  const auth = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await axios.post("http://localhost:4000/login", {
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
    onError: (err: any) => {
      alert("ورود ناموفق!!!!");
      console.log(err.res?.data || err.message);
    },
  });

  return mutation;
}
