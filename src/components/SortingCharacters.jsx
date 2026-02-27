import styles from "../styles/character-catalog.module.css";
import SelectItem from "./SelectItem";
import StarIcon from "../icons/StarIcon";
import Button from "./Button";
import ReloadIcon from "../icons/ReloadIcon";
import { useIsActive } from "../store/isActive";
import { useCharacters } from "../store/characters";

export default function SortingCharacters({ handleShowFavChar }) {
  function handleResetFilters() {
    if (urlPage > 1) {
      setUrlPage(1);
    }
    setFilter("status", "All status");
    setFilter("gender", "All gender");
    setFilter("species", "All species");
    setFilter("sorting", "Without sorting");
  }
  const { status, gender, species, sorting } = useCharacters((state) => state.filters);
  const setFilter = useCharacters((state) => state.setFilter);
  const urlPage = useCharacters((state) => state.urlPage);
  const setUrlPage = useCharacters((state) => state.setUrlPage);
  const isActive = useIsActive((state) => state.isActive);
  const setIsActive = useIsActive((state) => state.setIsActive);

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
        value={status}
        onChange={(e) => setFilter("status", e.target.value)}
      />
      <SelectItem
        id={2}
        className={styles["select_sorting-characters"]}
        options={genderOptions}
        value={gender}
        onChange={(e) => setFilter("gender", e.target.value)}
      />
      <SelectItem
        id={3}
        className={styles["select_sorting-characters"]}
        options={speciesOptions}
        value={species}
        onChange={(e) => setFilter("species", e.target.value)}
      />
      <SelectItem
        id={4}
        className={styles["select_sorting-characters"]}
        options={sortingOptions}
        value={sorting}
        onChange={(e) => setFilter("sorting", e.target.value)}
      />

      <Button
        btnClassName={isActive ? styles["btn-favorites-active"] : styles["btn-favorites"]}
        Icon={StarIcon}
        iconClassName={styles["icon-favorites"]}
        onClick={() => {
          if (!isActive) {
            setIsActive(true);
            return;
          }
          setIsActive(false);
        }}
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
