import { StatItem } from "./StatItem";
import HumansIcon from "../icons/HumansIcon";
import EyeIcon from "../icons/EyeIcon";
import StarIcon from "../icons/StarIcon";
import StatIcon from "../icons/StatIcon";
import GetTopSpecies from "./GetTopSpecies";

export default function InfoCharacters({
  characters,
  favoritesCharacters,
  styles,
  info,
}) {
  const top3Label = GetTopSpecies(characters);

  return (
    <div className={styles["info-characters_container"]}>
      <StatItem
        className={styles["all-info-characters"]}
        Icon={HumansIcon}
        total={"Total"}
        label={info?.count}
      />

      <StatItem
        className={styles["all-info-characters"]}
        Icon={EyeIcon}
        total={"Shown"}
        label={characters.length}
      />

      <StatItem
        className={styles["all-info-characters"]}
        Icon={StarIcon}
        color={"#57cb60"}
        total={"Favorites"}
        label={favoritesCharacters.length}
      />

      <StatItem
        className={styles["all-info-characters"]}
        Icon={StatIcon}
        total={"Top-3 species"}
        label={top3Label}
        labelClassName={styles["all-info-characters_top3"]}
      />
    </div>
  );
}
