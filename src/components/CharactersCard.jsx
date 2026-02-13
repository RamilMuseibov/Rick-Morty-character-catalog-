import styles from "../styles/character-catalog.module.css";
import StarIcon from "../icons/StarIcon";
import Button from "./Button";

export default function CharactersCard({
  characters,
  handleFavoriteClick,
  favoritesCharacters,
  handleActiveCard,
}) {
  return (
    <div className={styles["characters-catalog"]}>
      {characters.length === 0 ? (
        <div className={styles["error_characters-undefined"]}>Персонажи не найдeны</div>
      ) : (
        characters.map((character) => {
          const status = character.status.toLowerCase();
          const isFavorite = favoritesCharacters.some(
            (favChar) => favChar.id === character.id,
          );

          return (
            <div
              onClick={() => handleActiveCard(character.id)}
              key={character.id}
              className={styles["characters-card"]}
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
        })
      )}
    </div>
  );
}
