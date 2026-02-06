import styles from "../styles/character-catalog.module.css";
import StarIcon from "../icons/StarIcon";

export function CharactersCard({ characters }) {
  return (
    <div className={styles["characters-catalog"]}>
      {characters?.map((character) => {
        const status = character.status.toLowerCase();

        return (
          <div key={character.id} className={styles["characters-card"]}>
            <img className={styles["character-card-image"]} src={character.image} />
            <button className={styles["character-card_btn-favorites"]}>
              <StarIcon className={styles["character-card_icon-favorites"]} />
            </button>

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
      })}
    </div>
  );
}
