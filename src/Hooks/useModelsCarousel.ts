import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type CarouselItem = {
  id: number;
  title: string;
  image: string;
  route: string;
};

const fetchModelsCarousel = async (): Promise<CarouselItem[]> => {
  const res = await axios.get("http://localhost:4000/modelsCarousel");
  return res.data;
};

export function useModelsCarousel() {
  return useQuery({
    queryKey: ["modelsCarousel"],
    queryFn: fetchModelsCarousel,
  });
}