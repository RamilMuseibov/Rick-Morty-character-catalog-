import React, { useEffect } from "react";
import styles from "./styles/character-catalog.module.css";
import InfoCharacters from "./components/InfoCharacters";
import SearchCharacters from "./components/SearchCharacters";
import SortingCharacters from "./components/SortingCharacters";
import ActiveCard from "./components/ActiveCard";
import SortingFavoritesCharacters from "./components/SortingFavoritesCharacters";
import SearchFavoritesCharacters from "./components/SearchFavoritesCharacters";
import { useCharacters } from "./store/characters";
import { useFavoriteCharacters } from "./store/favoritesCharacters";
import { useActiveCard } from "./store/activeCard";
import { useIsActive } from "./store/isActive";
import { useFavCharacterFilters } from "./store/favCharacterFilters";
import Pagination from "./components/Pagination";
import CharactersList from "./components/CharactersList";

export default function RickMortyCharacterCatalog() {
  const characters = useCharacters((state) => state.characters);
  const getCharacters = useCharacters((state) => state.getCharacters);

  const favoritesCharacters = useFavoriteCharacters((state) => state.favoritesCharacters);
  const setFavoritesCharacters = useFavoriteCharacters(
    (state) => state.setFavoritesCharacters,
  );

  const urlPage = useCharacters((state) => state.urlPage);
  const setUrlPage = useCharacters((state) => state.setUrlPage);

  const activeCard = useActiveCard((state) => state.activeCard);
  const setActiveCard = useActiveCard((state) => state.setActiveCard);

  const isActive = useIsActive((state) => state.isActive);
  const setIsActive = useIsActive((state) => state.setIsActive);

  const { name, status, gender, species, sorting } = useCharacters(
    (state) => state.filters,
  );

  const { nameFavChar, favCharStatus, favCharGender, favCharSpecies, favCharSorting } =
    useFavCharacterFilters((state) => state.favCharFilters);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [urlPage, activeCard]);

  useEffect(() => {
    getCharacters();
  }, [urlPage, status, gender, species, sorting]);

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      getCharacters();
    }, 700);

    return () => {
      clearTimeout(idTimeout);
    };
  }, [name]);

  useEffect(() => {
    setUrlPage(1);

    getCharacters();
  }, [status, gender, species]);

  const shownCharacters = isActive ? favoritesCharacters : characters;

  const filteredCharacters = shownCharacters.toSorted((a, b) =>
    sorting === "Without sorting"
      ? 0
      : sorting === "Name A-Z"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
  );

  const filteredFavoriteCharacters = favoritesCharacters
    .filter((char) => char.name.toLowerCase().includes(nameFavChar.toLowerCase()))
    .filter((char) =>
      favCharStatus === "All status" ? true : char.status === favCharStatus,
    )
    .filter((char) =>
      favCharGender === "All gender" ? true : char.gender === favCharGender,
    )
    .filter((char) =>
      favCharSpecies === "All species" ? true : char.species === favCharSpecies,
    )
    .sort((a, b) =>
      favCharSorting === "Without sorting"
        ? 0
        : favCharSorting === "Name A-Z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
    );

  const charactersToRender = isActive ? filteredFavoriteCharacters : filteredCharacters;

  function handleFavoriteClick(id) {
    const isFavorite = favoritesCharacters.some((favChar) => favChar.id === id);

    if (!isFavorite) {
      const favChar = filteredCharacters.find((favChar) => favChar.id === id);
      setFavoritesCharacters([...favoritesCharacters, favChar]);
      return;
    }
    setFavoritesCharacters(favoritesCharacters.filter((favChar) => favChar.id !== id));
  }

  function handleActiveCard(id) {
    if (activeCard?.id === id) {
      setActiveCard(null);
      return;
    }
    setActiveCard(filteredCharacters.find((char) => char.id === id));
  }

  function handleClosedActiveCard(id) {
    if (activeCard?.id === id) {
      setActiveCard(null);
      return;
    }
  }

  return (
    <div className={styles[`app_character-catalog`]}>
      <header className={styles["app_header"]}>
        <h1 className={styles["app-title"]}>Rick & Morty — character catalog</h1>
      </header>

      <main
        className={
          activeCard === null
            ? styles["app_main-container-active-card-hidden"]
            : styles["app_main-container"]
        }
      >
        <InfoCharacters
          filteredFavoriteCharacters={filteredFavoriteCharacters}
          styles={styles}
        />

        {isActive ? <SearchFavoritesCharacters /> : <SearchCharacters />}

        {isActive ? (
          <SortingFavoritesCharacters />
        ) : (
          <SortingCharacters filteredFavoriteCharacters={filteredFavoriteCharacters} />
        )}

        <CharactersList
          handleFavoriteClick={handleFavoriteClick}
          characters={charactersToRender}
          handleActiveCard={handleActiveCard}
        />
      </main>

      <ActiveCard
        activeCard={activeCard}
        handleClosedActiveCard={handleClosedActiveCard}
      />

      <Pagination />
    </div>
  );
}
