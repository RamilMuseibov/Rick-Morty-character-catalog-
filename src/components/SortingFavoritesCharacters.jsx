import styles from "../styles/character-catalog.module.css";
import SelectItem from "./SelectItem";
import StarIcon from "../icons/StarIcon";
import Button from "./Button";
import ReloadIcon from "../icons/ReloadIcon";
import { useFavCharacterFilters } from "../store/favCharacterFilters";
import { useIsActive } from "../store/isActive";

export default function SortingFavoritesCharacters() {
  function handleFavoritesResetFilters() {
    setFavCharFilter("favCharStatus", "All status");
    setFavCharFilter("favCharGender", "All gender");
    setFavCharFilter("favCharSpecies", "All species");
    setFavCharFilter("favCharSorting", "Without sorting");
  }

  const isActive = useIsActive((state) => state.isActive);
  const setIsActive = useIsActive((state) => state.setIsActive);

  const { favCharStatus, favCharGender, favCharSpecies, favCharSorting } =
    useFavCharacterFilters((state) => state.favCharFilters);
  const setFavCharFilter = useFavCharacterFilters((state) => state.setFavCharFilter);

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
        value={favCharStatus}
        onChange={(e) => setFavCharFilter("favCharStatus", e.target.value)}
      />
      <SelectItem
        id={2}
        className={styles["select_sorting-characters"]}
        options={genderOptions}
        value={favCharGender}
        onChange={(e) => setFavCharFilter("favCharGender", e.target.value)}
      />
      <SelectItem
        id={3}
        className={styles["select_sorting-characters"]}
        options={speciesOptions}
        value={favCharSpecies}
        onChange={(e) => setFavCharFilter("favCharSpecies", e.target.value)}
      />
      <SelectItem
        id={4}
        className={styles["select_sorting-characters"]}
        options={sortingOptions}
        value={favCharSorting}
        onChange={(e) => setFavCharFilter("favCharSorting", e.target.value)}
      />

      <Button
        btnClassName={styles["btn-favorites-active"]}
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
