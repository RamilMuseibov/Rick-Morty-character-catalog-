import { create } from "zustand";

export const useAllCharacterFilters = create((set) => ({
  name: "",
  statusFilter: "All status",
  genderFilter: "All gender",
  speciesFilter: "All species",
  sorting: "Without sorting",

  nameFavChar: "",
  statusFavoritesFilter: "All status",
  genderFavoritesFilter: "All gender",
  speciesFavoritesFilter: "All species",
  favoritesSorting: "Without sorting",

  setName: (name) => set({ name }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setGenderFilter: (genderFilter) => set({ genderFilter }),
  setSpeciesFilter: (speciesFilter) => set({ speciesFilter }),
  setSorting: (sorting) => set({ sorting }),

  setNameFavChar: (nameFavChar) => set({ nameFavChar }),
  setStatusFavoritesFilter: (statusFavoritesFilter) => set({ statusFavoritesFilter }),
  setGenderFavoritesFilter: (genderFavoritesFilter) => set({ genderFavoritesFilter }),
  setSpeciesFavoritesFilter: (speciesFavoritesFilter) => set({ speciesFavoritesFilter }),
  setFavoritesSorting: (favoritesSorting) => set({ favoritesSorting }),
}));
