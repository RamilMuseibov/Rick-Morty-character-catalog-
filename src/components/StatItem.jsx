import styles from "../styles/character-catalog.module.css";

export function StatItem({ className, Icon, total, label }) {
  return (
    <div className={className}>
      <Icon className={styles["icon"]} />
      <div className={styles["stat-content"]}>
        <h4 className={styles["stat-label"]}>{total}</h4>
        <h2 className={styles["stat-value"]}>{label}</h2>
      </div>
    </div>
  );
}
