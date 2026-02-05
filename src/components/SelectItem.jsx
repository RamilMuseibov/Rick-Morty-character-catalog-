import styles from "../styles/character-catalog.module.css";

export function SelectItem({ className, name, id, options }) {
  return (
    <select className={className} name={name} id={id}>
      {options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
