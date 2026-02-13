export default function Input({ className, type, placeholder, onChange, value }) {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
