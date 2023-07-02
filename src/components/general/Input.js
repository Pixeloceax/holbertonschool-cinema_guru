import React from "react";
import "./general.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Input({
  label,
  type,
  className,
  value,
  setValue,
  icon,
  inputAttributes,
}) {
  const handleInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={className}>
      <div>
        {icon && <FontAwesomeIcon icon={icon} />}
        <label>{label}</label>
      </div>
      <input
        type={type}
        value={value}
        onChange={handleInput}
        {...inputAttributes}
      />
    </div>
  );
}

export default Input;
