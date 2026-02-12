export default function SelectItem({ className, name, id, options, onChange, value }) {
  return (
    <select onChange={onChange} value={value} className={className} name={name} id={id}>
      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
