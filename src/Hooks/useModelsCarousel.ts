import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/api";


export type CarouselItem = {
  id: number;
  title: string;
  image: string;
  route: string;
};

const fetchModelsCarousel = async (): Promise<CarouselItem[]> => {
  const res = await axios.get(`${API_URL}/modelsCarousel`);
  return res.data;
};

export function useModelsCarousel() {
  return useQuery({
    queryKey: ["modelsCarousel"],
    queryFn: fetchModelsCarousel,
  });
}