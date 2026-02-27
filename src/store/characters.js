import { create } from "zustand";

export const useCharacters = create((set, get) => ({
  characters: [],
  info: null,

  totalPages: 0,
  urlPage: 1,

  setTotalPages: (totalPages) => set({ totalPages }),
  setUrlPage: (urlPage) => set({ urlPage }),

  filters: {
    name: "",
    status: "All status",
    gender: "All gender",
    species: "All species",
    sorting: "Without sorting",
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  getCharacters: async () => {
    const { urlPage, filters } = get();

    const { name, status, gender, species, sorting } = filters;

    const urlPage1 = urlPage * 2 - 1;
    const urlPage2 = urlPage * 2;

    const querys = `${name ? `&name=${name}` : ""}${status === "All status" ? "" : `&status=${status}`}${gender === "All gender" ? "" : `&gender=${gender}`}${species === "All species" ? "" : `&species=${species}`}`;

    const urls = [
      `https://rickandmortyapi.com/api/character?page=${urlPage1}${querys}`,
      `https://rickandmortyapi.com/api/character?page=${urlPage2}${querys}`,
    ];

    const responses = await Promise.all(urls.map((url) => fetch(url)));

    if (responses.some((response) => !response.ok)) {
      set({ characters: [] });
      set({ info: null });
      set({ totalPages: 0 });

      return;
    }

    const data = await Promise.all(responses.map((res) => res.json()));
    const allCharacters = data.flatMap((page) => (page.results ? page.results : []));
    const allInfo = data[0].info;

    set({ characters: allCharacters });
    set({ info: allInfo });
    set({ totalPages: Math.ceil(allInfo?.count / 40) });
  },
}));
