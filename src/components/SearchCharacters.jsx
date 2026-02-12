import ReloadIcon from "../icons/ReloadIcon";
import SearchIcon from "../icons/SearchIcon";
import styles from "../styles/character-catalog.module.css";
import Button from "./Button";

export default function SearchCharacters() {
  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-field"]}>
        <SearchIcon className={styles["search-icon"]} />
        <input
          className={styles["input-search"]}
          type="text"
          placeholder="Search by name or type..."
        />
      </div>

      <Button btnClassName={styles["reset-icon"]} Icon={ReloadIcon} />
    </div>
  );
}
