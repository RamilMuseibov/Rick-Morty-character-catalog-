import { create } from "zustand";

export const useIsActive = create((set) => ({
  isActive: false,

  setIsActive: (isActive) => set({ isActive }),
}));
