import styles from "../styles/character-catalog.module.css";
import { SelectItem } from "./SelectItem";
import StarIcon from "../icons/StarIcon";

export default function SortingCharacters({ characters }) {
  const statusOptions = [
    "All status",
    ...Array.from(new Set(characters.map((character) => character.status))),
  ];

  const genderOptions = [
    "All gender",
    ...Array.from(new Set(characters.map((character) => character.gender))),
  ];

  const speciesOptions = [
    "All species",
    ...Array.from(new Set(characters.map((character) => character.species))),
  ];

  const sortingOptions = ["Without sorting", "Name A-Z", "Name Z-A"];

  return (
    <div className={styles["select-container_sorting-characters"]}>
      <SelectItem
        id={1}
        className={styles["select_sorting-characters"]}
        options={statusOptions}
        value={"All status"}
      />
      <SelectItem
        id={2}
        className={styles["select_sorting-characters"]}
        options={genderOptions}
        value={"All genders"}
      />
      <SelectItem
        id={3}
        className={styles["select_sorting-characters"]}
        options={speciesOptions}
        value={"All species"}
      />
      <SelectItem
        id={4}
        className={styles["select_sorting-characters"]}
        options={sortingOptions}
        value={"Sorting"}
      />

      <button className={styles["btn-favorites"]}>
        <StarIcon className={styles["icon-favorites"]} />
        Favorites
      </button>
    </div>
  );
}
