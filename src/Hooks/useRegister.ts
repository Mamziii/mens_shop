import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { RegisterFormData } from "../types";

export default function useRegister() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const res = await axios.post("http://localhost:4000/register", {
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

    onError: (err: any) => {
      alert("ثبت نام ناموفق بود !!!!!");
      console.log(err.res?.data || err.message);
    },
  });

  return mutation;
}
