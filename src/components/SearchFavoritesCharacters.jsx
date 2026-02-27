import ReloadIcon from "../icons/ReloadIcon";
import SearchIcon from "../icons/SearchIcon";
import { useFavCharacterFilters } from "../store/favCharacterFilters";
import { useCharacters } from "../store/characters";
import styles from "../styles/character-catalog.module.css";
import Button from "./Button";

export default function SearchFavoritesCharacters() {
  const { nameFavChar } = useFavCharacterFilters((state) => state.favCharFilters);
  const setFavCharFilter = useFavCharacterFilters((state) => state.setFavCharFilter);
  const urlPage = useCharacters((state) => state.urlPage);
  const setUrlPage = useCharacters((state) => state.setUrlPage);

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-field"]}>
        <SearchIcon className={styles["search-icon"]} />

        <input
          type={"text"}
          className={styles["input-search"]}
          placeholder={"Search by name or type..."}
          value={nameFavChar}
          onChange={(e) => {
            setFavCharFilter("nameFavChar", e.target.value);
          }}
        />
      </div>

      <Button
        disabled={nameFavChar === "" ? true : false}
        btnClassName={
          nameFavChar === "" ? styles["reset-btn-disabled"] : styles["reset-btn"]
        }
        Icon={ReloadIcon}
        onClick={() => {
          if (urlPage > 1) {
            setUrlPage(1);
          }
          setFavCharFilter("nameFavChar", "");
        }}
      />
    </div>
  );
}
