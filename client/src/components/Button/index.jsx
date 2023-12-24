import "./button.css";

export default function Button({ type, children, className, onClick }) {
  return (
    <button
      type={type || "button"}
      className={`button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
