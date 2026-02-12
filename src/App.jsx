import React, { useEffect, useState } from "react";
import styles from "./styles/character-catalog.module.css";
import CharactersCard from "./components/CharactersCard";
import InfoCharacters from "./components/InfoCharacters";
import SearchCharacters from "./components/SearchCharacters";
import SortingCharacters from "./components/SortingCharacters";

export default function RickMortyCharacterCatalog() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(null);
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState(false);

  const [statusFilter, setStatusFilter] = useState("All status");
  const [genderFilter, setGenderFilter] = useState("All gender");
  const [speciesFilter, setSpeciesFilter] = useState("All species");
  const [sorting, setSorting] = useState("Without sorting");

  useEffect(() => {
    async function getCharacters() {
      const urls = [
        `https://rickandmortyapi.com/api/character?page=${page}`,
        `https://rickandmortyapi.com/api/character?page=${page + 1}`,
      ];

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const data = await Promise.all(responses.map((res) => res.json()));
      const allCharacters = data.flatMap((page) => page.results);
      const allInfo = data[0].info;

      setCharacters(allCharacters);
      setInfo(allInfo);
    }

    getCharacters();
  }, []);

  const filteredCharacters = characters
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

    if (isFavorite) {
      setFavoritesCharacters(favoritesCharacters.filter((favChar) => favChar.id !== id));
    } else {
      const favChar = filteredCharacters.find((favChar) => favChar.id === id);
      setFavoritesCharacters([...favoritesCharacters, favChar]);
    }
  }

  return (
    <div className={styles[`app_character-catalog`]}>
      <header className={styles["app_header"]}>
        <h1 className={styles["app-title"]}>Rick & Morty — character catalog</h1>
      </header>

      <main className={styles["app_main-container"]}>
        <InfoCharacters
          characters={characters}
          favoritesCharacters={favoritesCharacters}
          styles={styles}
          info={info}
        />

        <SearchCharacters />

        <SortingCharacters
          characters={characters}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          speciesFilter={speciesFilter}
          setSpeciesFilter={setSpeciesFilter}
          sorting={sorting}
          setSorting={setSorting}
        />

        <CharactersCard
          isActive={isActive}
          handleFavoriteClick={handleFavoriteClick}
          characters={filteredCharacters}
          favoritesCharacters={favoritesCharacters}
        />
      </main>
    </div>
  );
}
