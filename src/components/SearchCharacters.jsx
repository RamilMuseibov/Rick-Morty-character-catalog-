import ReloadIcon from "../icons/ReloadIcon";
import SearchIcon from "../icons/SearchIcon";
import styles from "../styles/character-catalog.module.css";
import Button from "./Button";
import Input from "./Input";

export default function SearchCharacters({ onChange, value, onClick, name }) {
  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-field"]}>
        <SearchIcon className={styles["search-icon"]} />

        <Input
          type={"text"}
          className={styles["input-search"]}
          placeholder={"Search by name or type..."}
          value={value}
          onChange={onChange}
        />
      </div>

      <Button
        disabled={name === "" ? true : false}
        btnClassName={name === "" ? styles["reset-btn-disabled"] : styles["reset-btn"]}
        Icon={ReloadIcon}
        onClick={onClick}
      />
    </div>
  );
}
