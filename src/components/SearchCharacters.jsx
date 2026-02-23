import ReloadIcon from "../icons/ReloadIcon";
import SearchIcon from "../icons/SearchIcon";
import { useAllCharacterFilters } from "../store/allCharacterFilters";
import styles from "../styles/character-catalog.module.css";
import Button from "./Button";

export default function SearchCharacters({ handleCharSearch, handleInputReset }) {
  const name = useAllCharacterFilters((state) => state.name);

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-field"]}>
        <SearchIcon className={styles["search-icon"]} />

        <input
          type={"text"}
          className={styles["input-search"]}
          placeholder={"Search by name or type..."}
          value={name}
          onChange={handleCharSearch}
        />
      </div>

      <Button
        disabled={name === "" ? true : false}
        btnClassName={name === "" ? styles["reset-btn-disabled"] : styles["reset-btn"]}
        Icon={ReloadIcon}
        onClick={handleInputReset}
      />
    </div>
  );
}
