import { useState } from "react";

export function useSelection<T>() {
  const [selectedOption, setSelectedOption] = useState<{
    [itemId: number]: T;
  }>({});

  const handleOptionSelect = (itemId: number, option: T) => {
    setSelectedOption((prev) => {
      if (prev[itemId] === option) {
        const newOptions = { ...prev };
        delete newOptions[itemId];
        return newOptions;
      } else {
        return { ...prev, [itemId]: option };
      }
    });
  };

  return { selectedOption, handleOptionSelect, setSelectedOption };
}
