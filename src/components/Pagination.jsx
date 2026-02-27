import React from "react";
import styles from "../styles/character-catalog.module.css";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import Button from "./Button";
import { useCharacters } from "../store/characters";
import { useIsActive } from "../store/isActive";

export default function Pagination() {
  const characters = useCharacters((state) => state.characters);
  const isActive = useIsActive((state) => state.isActive);
  const urlPage = useCharacters((state) => state.urlPage);
  const setUrlPage = useCharacters((state) => state.setUrlPage);
  const totalPages = useCharacters((state) => state.totalPages);

  return (
    <div
      className={
        isActive || characters.length === 0
          ? styles["pagination-container-hidden"]
          : styles["pagination-container"]
      }
    >
      <Button
        disabled={urlPage === 1}
        btnClassName={
          urlPage === 1 ? styles["disabled-btn"] : styles["pagination_btn-left"]
        }
        iconClassName={urlPage === 1 ? "" : styles["pagination_icon-left"]}
        Icon={ArrowLeftIcon}
        onClick={() => setUrlPage(urlPage - 1)}
      />
      {urlPage} of {totalPages}
      <Button
        disabled={urlPage === totalPages}
        btnClassName={
          urlPage === totalPages ? styles["disabled-btn"] : styles["pagination_btn-right"]
        }
        iconClassName={urlPage === totalPages ? "" : styles["pagination_icon-right"]}
        Icon={ArrowRightIcon}
        onClick={() => setUrlPage(urlPage + 1)}
      />
    </div>
  );
}
