import { create } from "zustand";

export const useFavoriteCharacters = create((set) => ({
  favoritesCharacters: [],

  setFavoritesCharacters: (favoritesCharacters) => set({ favoritesCharacters }),
}));
