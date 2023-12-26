import { useState } from "react";
import "./input.css";

export default function Input({
  type,
  placeholder,
  name,
  value,
  className,
  onTextChange = (v) => {},
}) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPassword ? 'text' : type || "text"
    const handleChange = (e) => onTextChange(e.target.value)
  return (

    <input
      type={inputType}
      placeholder={placeholder}
      name={name}
      value={value}
      className={`input ${className}`}
      onChange={handleChange}
    />
  );
}
