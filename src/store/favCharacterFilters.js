import { create } from "zustand";

export const useFavCharacterFilters = create((set) => ({
  favCharFilters: {
    nameFavChar: "",
    favCharStatus: "All status",
    favCharGender: "All gender",
    favCharSpecies: "All species",
    favCharSorting: "Without sorting",
  },

  setFavCharFilter: (key, value) =>
    set((state) => ({
      favCharFilters: { ...state.favCharFilters, [key]: value },
    })),
}));
