import { useEffect } from "react";
import { useCharacters } from "../store/characters";
import styles from "../styles/character-catalog.module.css";
import CharactersCard from "./CharactersCard";
import { useActiveCard } from "../store/activeCard";

export default function CharactersList({
  handleFavoriteClick,
  characters,
  handleActiveCard,
}) {
  //   const characters = useCharacters((state) => state.characters);
  //   const getCharacters = useCharacters((state) => state.getCharacters);
  //   const { name, status, gender, species, sorting } = useCharacters(
  //     (state) => state.filters,
  //   );
  //   const urlPage = useCharacters((state) => state.urlPage);
  //   const activeCard = useActiveCard((state) => state.activeCard);
  //   const setUrlPage = useCharacters((state) => state.setUrlPage);

  //   useEffect(() => {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   }, [urlPage, activeCard]);

  //   useEffect(() => {
  //     getCharacters();
  //   }, [urlPage, status, gender, species, sorting]);

  //   useEffect(() => {
  //     const idTimeout = setTimeout(() => {
  //       getCharacters();
  //     }, 700);

  //     return () => {
  //       clearTimeout(idTimeout);
  //     };
  //   }, [name]);

  //   useEffect(() => {
  //     setUrlPage(1);

  //     getCharacters();
  //   }, [status, gender, species]);

  return (
    <div className={styles["characters-list"]}>
      {characters.length === 0 ? (
        <div className={styles["error_characters-undefined"]}>Characters not found</div>
      ) : (
        characters.map((character) => {
          return (
            <CharactersCard
              key={character.id}
              character={character}
              handleFavoriteClick={handleFavoriteClick}
              handleActiveCard={handleActiveCard}
            />
          );
        })
      )}
    </div>
  );
}
