import { create } from "zustand";

export const useInfo = create((set) => ({
  info: null,
  setInfo: (info) => set({ info }),
}));
