export default function Button({
  btnClassName,
  iconClassName,
  Icon,
  iconProps,
  children,
  onClick,
  disabled,
}) {
  return (
    <button className={btnClassName} onClick={onClick} disabled={disabled}>
      {Icon && <Icon className={iconClassName} {...iconProps} />}
      {children}
    </button>
  );
}
