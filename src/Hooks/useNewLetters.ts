import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../Context/useAuth";

type NewsletterResponse = {
  id: number;
  email: string;
  date: string;
};

export default function useNewLetters() {
  const { user, token } = useAuth();

  // ایجاد instance مستقیم axios
  const api = axios.create({
    baseURL: "http://localhost:4000",
  });

  return useMutation<NewsletterResponse, Error, string>({
    mutationFn: async (email: string) => {
      // Checking if logged in
      if (!user || !token) {
        throw new Error("not-authenticated");
      }

      // Duplicate email
      const { data: existing } = await api.get(`/newsLetter?email=${email}`);

      if (existing.length > 0) {
        throw new Error("duplicate");
      }

      // newsLetter
      const response = await api.post("/newsLetter", {
        email,
        userId: user.id,
        date: new Date().toISOString(),
      });

      return response.data;
    },
  });
}

export { useNewLetters };