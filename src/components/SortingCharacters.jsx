import styles from "../styles/character-catalog.module.css";
import SelectItem from "./SelectItem";
import StarIcon from "../icons/StarIcon";
import Button from "./Button";
import ReloadIcon from "../icons/ReloadIcon";

export default function SortingCharacters({
  statusFilter,
  setStatusFilter,
  genderFilter,
  setGenderFilter,
  speciesFilter,
  setSpeciesFilter,
  sorting,
  setSorting,
  handleShowFavChar,
  isActive,
  handleResetFilters,
}) {
  const statusOptions = ["All status", "Alive", "Dead", "Unknown"];

  const genderOptions = ["All gender", "Male", "Female", "Genderless", "Unknown"];

  const speciesOptions = [
    "All species",
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological Creature",
    "Animal",
    "Robot",
    "Cronenberg",
    "Disease",
    "Unknown",
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
        onClick={handleShowFavChar}
      >
        {isActive ? "Back to all" : "Favorites"}
      </Button>

      <Button
        btnClassName={styles["btn-reset-filters"]}
        Icon={ReloadIcon}
        iconClassName={styles["icon-reset"]}
        onClick={handleResetFilters}
      >
        Reset filters
      </Button>
    </div>
  );
}
