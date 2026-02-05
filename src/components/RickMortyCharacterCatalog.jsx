import React, { useEffect, useState } from "react";
import styles from "../styles/character-catalog.module.css";
import HumansIcon from "../icons/HumansIcon";
import EyeIcon from "../icons/EyeIcon";
import StarIcon from "../icons/StarIcon";
import StatIcon from "../icons/StatIcon";
import SearchIcon from "../icons/SearchIcon";
import ReloadIcon from "../icons/ReloadIcon";
import { StatItem } from "./StatItem";
import { SelectItem } from "./SelectItem";

export default function RickMortyCharacterCatalog() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(null);
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);

  const statusOptions = [
    "All status",
    ...Array.from(new Set(characters.map((character) => character.status))),
  ];

  const genderOptions = [
    "All gender",
    ...Array.from(new Set(characters.map((character) => character.gender))),
  ];

  const typesOptions = [
    "All types",
    ...Array.from(
      new Set(
        characters.map((character) => {
          return character.type.split("(")[0];
        }),
      ),
    ),
  ].filter((gender) => gender);

  const sortingOptions = ["Without sorting", "Name A-Z", "Name Z-A"];

  console.log(statusOptions);
  console.log(genderOptions);
  console.log(typesOptions);

  console.log(characters);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=1`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      });
  }, []);

  return (
    <div className={styles[`app_character-catalog`]}>
      <h1 className={styles["app-title"]}>Rick & Morty — character catalog</h1>

      <main className={styles["app_main-container"]}>
        <div className={styles["info_container"]}>
          <StatItem
            className={styles["all-info-characters"]}
            Icon={HumansIcon}
            total={"Total"}
            label={info?.count}
          />

          <StatItem
            className={styles["all-info-characters"]}
            Icon={EyeIcon}
            total={"Shown"}
            label={characters.length}
          />

          <StatItem
            className={styles["all-info-characters"]}
            Icon={StarIcon}
            color={"#57cb60"}
            total={"Favorites"}
            label={favoritesCharacters.length}
          />

          <StatItem
            className={styles["all-info-characters"]}
            Icon={StatIcon}
            total={"Top-3 types"}
            label={info?.count}
          />
        </div>

        <div className={styles["search-container"]}>
          <div className={styles["search-field"]}>
            <SearchIcon className={styles["search-icon"]} />
            <input
              className={styles["input-search"]}
              type="text"
              placeholder="Search by name or type..."
            />
          </div>
          <button className={styles["reset-icon"]}>
            <ReloadIcon />
          </button>
        </div>

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
            options={typesOptions}
            value={"All types"}
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

        <div className={styles["character-catalog"]}>
          {characters.map((character) => {
            return (
              <div key={character.id} className={styles["catalog"]}>
                <img className={styles["character-image"]} src={character.image} />
                <div>{character.name}</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
