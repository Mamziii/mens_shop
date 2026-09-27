import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../Context/useAuth";
import type { User, UserUpDateFormData } from "../types";
import { API_URL } from "../config/api";

export const useUsers = () => {
  const { token, login } = useAuth();
  const queryClient = useQueryClient();

  //  Get User 
  const fetchUsers = async (): Promise<User[]> => {
    const res = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<User[], Error>({
    queryKey: ["usersList"],
    queryFn: fetchUsers,
    enabled: !!token,
  });

  // Delete User
  const deleteUser = useMutation({
    mutationFn: (userId: number) =>
      axios.delete(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
    },
  });

  //Update User
  const updateUser = useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: UserUpDateFormData;
    }) =>
      axios.patch(`${API_URL}/users/${userId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: (res) => {
      // کاربر به‌روزرسانی شد، کش را تازه می‌کنیم
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
      // آپدیت کردن اطلاعات کاربر لاگین شده
      login(token!, res.data);
    },
  });

  return {
    users,
    isLoading,
    isError,
    error,
    deleteUser,
    updateUser,
  };
};
