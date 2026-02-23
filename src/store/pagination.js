import { create } from "zustand";
export const usePagination = create((set) => ({
  totalPages: 0,
  urlPage: 1,

  setTotalPages: (totalPages) => set({ totalPages }),
  setUrlPage: (urlPage) => set({ urlPage }),
}));
