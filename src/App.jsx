import React, { useEffect, useState } from "react";
import styles from "./styles/character-catalog.module.css";
import CharactersCard from "./components/CharactersCard";
import InfoCharacters from "./components/InfoCharacters";
import SearchCharacters from "./components/SearchCharacters";
import SortingCharacters from "./components/SortingCharacters";
import Button from "./components/Button";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import ActiveCard from "./components/ActiveCard";
import getCharacters from "./utils/getCharacters";
import SortingFavoritesCharacters from "./components/SortingFavoritesCharacters";
import SearchFavoritesCharacters from "./components/SearchFavoritesCharacters";
import { useCharacters } from "./store/characters";
import { useInfo } from "./store/info";
import { usePagination } from "./store/pagination";
import { useFavoriteCharacters } from "./store/favoritesCharacters";
import { useActiveCard } from "./store/activeCard";
import { useIsActive } from "./store/isActive";
import { useAllCharacterFilters } from "./store/allCharacterFilters";

export default function RickMortyCharacterCatalog() {
  const characters = useCharacters((state) => state.characters);
  const setCharacters = useCharacters((state) => state.setCharacters);

  const favoritesCharacters = useFavoriteCharacters((state) => state.favoritesCharacters);
  const setFavoritesCharacters = useFavoriteCharacters(
    (state) => state.setFavoritesCharacters,
  );

  const setInfo = useInfo((state) => state.setInfo);

  const totalPages = usePagination((state) => state.totalPages);
  const setTotalPages = usePagination((state) => state.setTotalPages);

  const urlPage = usePagination((state) => state.urlPage);
  const setUrlPage = usePagination((state) => state.setUrlPage);

  const activeCard = useActiveCard((state) => state.activeCard);
  const setActiveCard = useActiveCard((state) => state.setActiveCard);

  const isActive = useIsActive((state) => state.isActive);
  const setIsActive = useIsActive((state) => state.setIsActive);

  const name = useAllCharacterFilters((state) => state.name);
  const setName = useAllCharacterFilters((state) => state.setName);

  const statusFilter = useAllCharacterFilters((state) => state.statusFilter);
  const setStatusFilter = useAllCharacterFilters((state) => state.setStatusFilter);

  const genderFilter = useAllCharacterFilters((state) => state.genderFilter);
  const setGenderFilter = useAllCharacterFilters((state) => state.setGenderFilter);

  const speciesFilter = useAllCharacterFilters((state) => state.speciesFilter);
  const setSpeciesFilter = useAllCharacterFilters((state) => state.setSpeciesFilter);

  const sorting = useAllCharacterFilters((state) => state.sorting);
  const setSorting = useAllCharacterFilters((state) => state.setSorting);

  const nameFavChar = useAllCharacterFilters((state) => state.nameFavChar);
  const setNameFavChar = useAllCharacterFilters((state) => state.setNameFavChar);

  const statusFavoritesFilter = useAllCharacterFilters(
    (state) => state.statusFavoritesFilter,
  );
  const setStatusFavoritesFilter = useAllCharacterFilters(
    (state) => state.setStatusFavoritesFilter,
  );

  const genderFavoritesFilter = useAllCharacterFilters(
    (state) => state.genderFavoritesFilter,
  );
  const setGenderFavoritesFilter = useAllCharacterFilters(
    (state) => state.setGenderFavoritesFilter,
  );

  const speciesFavoritesFilter = useAllCharacterFilters(
    (state) => state.speciesFavoritesFilter,
  );
  const setSpeciesFavoritesFilter = useAllCharacterFilters(
    (state) => state.setSpeciesFavoritesFilter,
  );

  const favoritesSorting = useAllCharacterFilters((state) => state.favoritesSorting);
  const setFavoritesSorting = useAllCharacterFilters(
    (state) => state.setFavoritesSorting,
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [urlPage, activeCard]);

  useEffect(() => {
    getCharacters(
      urlPage,
      name,
      setCharacters,
      setInfo,
      setTotalPages,
      statusFilter,
      genderFilter,
      speciesFilter,
      setUrlPage,
    );
  }, [urlPage]);

  useEffect(() => {
    const idTimeout = setTimeout(() => {
      getCharacters(
        urlPage,
        name,
        setCharacters,
        setInfo,
        setTotalPages,
        statusFilter,
        genderFilter,
        speciesFilter,
        setUrlPage,
      );
    }, 700);

    return () => {
      clearTimeout(idTimeout);
    };
  }, [name]);

  console.log(name);

  useEffect(() => {
    setUrlPage(1);

    getCharacters(
      urlPage,
      name,
      setCharacters,
      setInfo,
      setTotalPages,
      statusFilter,
      genderFilter,
      speciesFilter,
      setUrlPage,
    );
  }, [statusFilter, genderFilter, speciesFilter]);

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
      statusFavoritesFilter === "All status"
        ? true
        : char.status === statusFavoritesFilter,
    )
    .filter((char) =>
      genderFavoritesFilter === "All gender"
        ? true
        : char.gender === genderFavoritesFilter,
    )
    .filter((char) =>
      speciesFavoritesFilter === "All species"
        ? true
        : char.species === speciesFavoritesFilter,
    )
    .sort((a, b) =>
      favoritesSorting === "Without sorting"
        ? 0
        : favoritesSorting === "Name A-Z"
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

  function handleShowFavChar() {
    if (!isActive) {
      setIsActive(true);
      return;
    }
    setIsActive(false);
  }

  function handleCharSearch(e) {
    if (urlPage > 1) {
      setUrlPage(1);
    }
    setName(e.target.value);
  }

  function handleFavCharSearch(e) {
    setNameFavChar(e.target.value);
  }

  function handleResetFilters() {
    if (urlPage > 1) {
      setUrlPage(1);
    }
    setStatusFilter("All status");
    setGenderFilter("All gender");
    setSpeciesFilter("All species");
    setSorting("Without sorting");
  }

  function handleFavoritesResetFilters() {
    setStatusFavoritesFilter("All status");
    setGenderFavoritesFilter("All gender");
    setSpeciesFavoritesFilter("All species");
    setFavoritesSorting("Without sorting");
  }

  function handleInputReset() {
    if (urlPage > 1) {
      setUrlPage(1);
    }
    setName("");
    setNameFavChar("");
  }

  function handleBtnNextChar() {
    setUrlPage(urlPage + 1);
  }

  function handleBtnPrevChar() {
    setUrlPage(urlPage - 1);
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

        {isActive ? (
          <SearchFavoritesCharacters
            handleFavCharSearch={handleFavCharSearch}
            handleInputReset={handleInputReset}
          />
        ) : (
          <SearchCharacters
            handleCharSearch={handleCharSearch}
            handleInputReset={handleInputReset}
          />
        )}

        {isActive ? (
          <SortingFavoritesCharacters
            handleFavoritesResetFilters={handleFavoritesResetFilters}
            handleShowFavChar={handleShowFavChar}
          />
        ) : (
          <SortingCharacters
            filteredFavoriteCharacters={filteredFavoriteCharacters}
            handleResetFilters={handleResetFilters}
            handleShowFavChar={handleShowFavChar}
          />
        )}

        <CharactersCard
          handleFavoriteClick={handleFavoriteClick}
          characters={charactersToRender}
          handleActiveCard={handleActiveCard}
        />
      </main>

      <div
        className={
          isActive || characters.length === 0
            ? styles["pagination-container-hidden"]
            : styles["pagination-container"]
        }
      >
        <Button
          disabled={urlPage === 1}
          btnClassName={
            urlPage === 1 ? styles["disabled-btn"] : styles["pagination_btn-left"]
          }
          iconClassName={urlPage === 1 ? "" : styles["pagination_icon-left"]}
          Icon={ArrowLeftIcon}
          onClick={handleBtnPrevChar}
        />
        {urlPage} of {totalPages}
        <Button
          disabled={urlPage === totalPages}
          btnClassName={
            urlPage === totalPages
              ? styles["disabled-btn"]
              : styles["pagination_btn-right"]
          }
          iconClassName={urlPage === totalPages ? "" : styles["pagination_icon-right"]}
          Icon={ArrowRightIcon}
          onClick={handleBtnNextChar}
        />
      </div>

      <ActiveCard
        activeCard={activeCard}
        handleClosedActiveCard={handleClosedActiveCard}
      />
    </div>
  );
}
