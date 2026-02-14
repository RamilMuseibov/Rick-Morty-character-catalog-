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

export default function RickMortyCharacterCatalog() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(null);
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [urlPage, setUrlPage] = useState(1);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All status");
  const [genderFilter, setGenderFilter] = useState("All gender");
  const [speciesFilter, setSpeciesFilter] = useState("All species");
  const [sorting, setSorting] = useState("Without sorting");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [urlPage, activeCard]);

  useEffect(() => {
    async function getCharacters() {
      const urlPage1 = urlPage * 2 - 1;
      const urlPage2 = urlPage * 2;

      const urls = [
        `https://rickandmortyapi.com/api/character?page=${urlPage1}&name=${name}`,
        `https://rickandmortyapi.com/api/character?page=${urlPage2}&name=${name}`,
      ];

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));
      const allCharacters = data.flatMap((page) => (page.results ? page.results : []));
      const allInfo = data[0].info;

      setCharacters(allCharacters);
      setInfo(allInfo);

      setTotalPages(Math.ceil(allInfo?.count / 40));
    }

    getCharacters();
  }, [urlPage, name]);

  const shownCharacters = isActive ? favoritesCharacters : characters;

  const filteredCharacters = shownCharacters
    .filter((char) =>
      statusFilter === "All status" ? true : char.status === statusFilter,
    )
    .filter((char) =>
      genderFilter === "All gender" ? true : char.gender === genderFilter,
    )
    .filter((char) =>
      speciesFilter === "All species" ? true : char.species === speciesFilter,
    )
    .sort((a, b) =>
      sorting === "Without sorting"
        ? 0
        : sorting === "Name A-Z"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
    );

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

  function handleInputReset() {
    if (urlPage > 1) {
      setUrlPage(1);
    }
    setName("");
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
          characters={characters}
          favoritesCharacters={favoritesCharacters}
          styles={styles}
          info={info}
        />

        <SearchCharacters
          name={name}
          onChange={handleCharSearch}
          value={name}
          onClick={handleInputReset}
        />

        <SortingCharacters
          onClick={handleShowFavChar}
          isActive={isActive}
          characters={characters}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          speciesFilter={speciesFilter}
          setSpeciesFilter={setSpeciesFilter}
          sorting={sorting}
          setSorting={setSorting}
          favoritesCharacters={favoritesCharacters}
        />

        <CharactersCard
          handleFavoriteClick={handleFavoriteClick}
          characters={filteredCharacters}
          favoritesCharacters={favoritesCharacters}
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
