import styles from "../styles/character-catalog.module.css";
import SelectItem from "./SelectItem";
import StarIcon from "../icons/StarIcon";
import Button from "./Button";

export default function SortingCharacters({
  characters,
  statusFilter,
  setStatusFilter,
  genderFilter,
  setGenderFilter,
  speciesFilter,
  setSpeciesFilter,
  sorting,
  setSorting,
  onClick,
  isActive, 
}) {
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
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      />
      <SelectItem
        id={2}
        className={styles["select_sorting-characters"]}
        options={genderOptions}
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
      />
      <SelectItem
        id={3}
        className={styles["select_sorting-characters"]}
        options={speciesOptions}
        value={speciesFilter}
        onChange={(e) => setSpeciesFilter(e.target.value)}
      />
      <SelectItem
        id={4}
        className={styles["select_sorting-characters"]}
        options={sortingOptions}
        value={sorting}
        onChange={(e) => setSorting(e.target.value)}
      />

      <Button
        btnClassName={isActive ? styles["btn-favorites-active"] : styles["btn-favorites"]}
        Icon={StarIcon}
        iconClassName={styles["icon-favorites"]}
        onClick={onClick}
      >
        Favorites
      </Button>
    </div>
  );
}
