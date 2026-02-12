export default function Button({
  btnClassName,
  iconClassName,
  Icon,
  iconProps,
  children,
  onClick,
}) {
  return (
    <button className={btnClassName} onClick={onClick}>
      {Icon && <Icon className={iconClassName} {...iconProps} />}
      {children}
    </button>
  );
}
