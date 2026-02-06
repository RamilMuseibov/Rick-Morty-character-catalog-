import React, { useEffect, useState } from "react";
import styles from "../styles/character-catalog.module.css";
import { CharactersCard } from "./CharactersCard";
import InfoCharacters from "./InfoCharacters";
import SearchCharacters from "./SearchCharacters";
import SortingCharacters from "./SortingCharacters";

export default function RickMortyCharacterCatalog() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(null);
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);
  const [page, setPage] = useState(1);

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

        <SortingCharacters characters={characters} />

        <CharactersCard characters={characters} />
      </main>
    </div>
  );
}
