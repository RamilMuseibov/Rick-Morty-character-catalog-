import { create } from "zustand";

export const useActiveCard = create((set) => ({
  activeCard: null,

  setActiveCard: (activeCard) => set({ activeCard }),
}));
