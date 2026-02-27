import styles from "../styles/character-catalog.module.css";
import StarIcon from "../icons/StarIcon";
import Button from "./Button";
import { useFavoriteCharacters } from "../store/favoritesCharacters";

export default function CharactersCard({
  character,
  handleFavoriteClick,
  handleActiveCard,
}) {
  const status = character.status.toLowerCase();
  const favoritesCharacters = useFavoriteCharacters((state) => state.favoritesCharacters);
  const isFavorite = favoritesCharacters.some((favChar) => favChar.id === character.id);

  return (
    <div
      key={character.id}
      className={styles["characters-card"]}
      onClick={() => handleActiveCard(character.id)}
    >
      <img className={styles["character-card-image"]} src={character.image} />

      <Button
        btnClassName={styles["character-card_btn-favorites"]}
        Icon={StarIcon}
        iconClassName={
          isFavorite
            ? styles["character-card_icon-favorites-active"]
            : styles["character-card_icon-favorites"]
        }
        iconProps={{ filled: isFavorite, colorFilled: "#57cb60" }}
        onClick={(e) => {
          e.stopPropagation();
          handleFavoriteClick(character.id);
        }}
      />

      <span
        className={
          styles[
            status === "alive"
              ? "character-card_status-alive"
              : status === "dead"
                ? "character-card_status-dead"
                : "character-card_status-unknown"
          ]
        }
      >
        {character.status}
      </span>

      <div className={styles[""]}>
        <span className={styles["character-card_name"]}>{character.name}</span>
        <span className={styles["character-card_gender"]}>
          {character.species} • {character.gender}
        </span>
      </div>
    </div>
  );
}
