export default function Input({ className, type, placeholder, onChange }) {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
