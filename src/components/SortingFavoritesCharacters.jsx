import styles from "../styles/character-catalog.module.css";
import SelectItem from "./SelectItem";
import StarIcon from "../icons/StarIcon";
import Button from "./Button";
import ReloadIcon from "../icons/ReloadIcon";

export default function SortingFavoritesCharacters({
  statusFavoritesFilter,
  setStatusFavoritesFilter,
  genderFavoritesFilter,
  setGenderFavoritesFilter,
  speciesFavoritesFilter,
  setSpeciesFavoritesFilter,
  favoritesSorting,
  setFavoritesSorting,
  handleShowFavChar,
  isActive,
  handleFavoritesResetFilters,
}) {
  const statusOptions = ["All status", "Alive", "Dead", "unknown"];

  const genderOptions = ["All gender", "Male", "Female", "Genderless", "unknown"];

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
    "unknown",
  ];

  const sortingOptions = ["Without sorting", "Name A-Z", "Name Z-A"];

  return (
    <div className={styles["select-container_sorting-characters"]}>
      <SelectItem
        id={1}
        className={styles["select_sorting-characters"]}
        options={statusOptions}
        value={statusFavoritesFilter}
        onChange={(e) => setStatusFavoritesFilter(e.target.value)}
      />
      <SelectItem
        id={2}
        className={styles["select_sorting-characters"]}
        options={genderOptions}
        value={genderFavoritesFilter}
        onChange={(e) => setGenderFavoritesFilter(e.target.value)}
      />
      <SelectItem
        id={3}
        className={styles["select_sorting-characters"]}
        options={speciesOptions}
        value={speciesFavoritesFilter}
        onChange={(e) => setSpeciesFavoritesFilter(e.target.value)}
      />
      <SelectItem
        id={4}
        className={styles["select_sorting-characters"]}
        options={sortingOptions}
        value={favoritesSorting}
        onChange={(e) => setFavoritesSorting(e.target.value)}
      />

      <Button
        btnClassName={styles["btn-favorites-active"]}
        Icon={StarIcon}
        iconClassName={styles["icon-favorites"]}
        onClick={handleShowFavChar}
      >
        Back to all
      </Button>

      <Button
        btnClassName={styles["btn-reset-filters"]}
        Icon={ReloadIcon}
        iconClassName={styles["icon-reset"]}
        onClick={handleFavoritesResetFilters}
      >
        Reset filters
      </Button>
    </div>
  );
}
