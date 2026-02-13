import styles from "../styles/character-catalog.module.css";
import FilmIcon from "../icons/FilmIcon";
import HeartIcon from "../icons/HeartIcon";
import HumanIcon from "../icons/HumanIcon";
import LocationIcon from "../icons/LocationIcon";
import PlanetIcon from "../icons/PlanetIcon";
import ClosedIcon from "../icons/ClosedIcon";
import Button from "./Button";

export default function ActiveCard({ activeCard, handleClosedActiveCard }) {
  return (
    <div
      className={
        activeCard === null ? styles["active-card-hidden"] : styles["active-card"]
      }
    >
      <h2 className={styles["active-card_title"]}>
        Detailed information
        <Button
          Icon={ClosedIcon}
          btnClassName={styles["active-card_closed-btn"]}
          onClick={() => handleClosedActiveCard(activeCard.id)}
        />
      </h2>
      <div className={styles["active-card_full-info-container"]}>
        <img className={styles["active-card-image"]} src={activeCard?.image} />
        <span className={styles["active-card_name"]}>{activeCard?.name}</span>
        <span className={styles["active-card_species"]}>{activeCard?.species}</span>
        <div className={styles["active-card_gender-container"]}>
          <HumanIcon className={styles["active-card_gender-icon"]} />
          <span className={styles["active-card_gender-title"]}>Gender:</span>
          <span className={styles["active-card_gender-subtitle"]}>
            {activeCard?.gender}
          </span>
        </div>

        <div className={styles["active-card_status-container"]}>
          <HeartIcon className={styles["active-card_status-icon"]} />
          <span className={styles["active-card_status-title"]}>Status:</span>
          <span className={styles["active-card_status-subtitle"]}>
            {activeCard?.status}
          </span>
        </div>

        <div className={styles["active-card_planet-container"]}>
          <PlanetIcon className={styles["active-card_planet-icon"]} />
          <span className={styles["active-card_planet-title"]}>Planet:</span>
          <span className={styles["active-card_planet-subtitle"]}>
            {activeCard?.origin?.name}
          </span>
        </div>

        <div className={styles["active-card_location-container"]}>
          <LocationIcon className={styles["active-card_location-icon"]} />
          <span className={styles["active-card_location-title"]}>Location:</span>
          <span className={styles["active-card_location-subtitle"]}>
            {activeCard?.location?.name}
          </span>
        </div>

        <div className={styles["active-card_episode-container"]}>
          <FilmIcon className={styles["active-card_episode-icon"]} />
          <span className={styles["active-card_episode-title"]}>Episodes:</span>
          <span className={styles["active-card_episode-subtitle"]}>
            {activeCard?.episode?.length}
          </span>
        </div>
      </div>
    </div>
  );
}
