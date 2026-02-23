import { create } from "zustand";

export const useCharacters = create((set) => ({
  characters: [],

  setCharacters: (characters) => set({ characters }),
}));


