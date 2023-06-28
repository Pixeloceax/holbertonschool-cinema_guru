import React, { useState } from "react";
import "./general.css";

const Input = ({
  label,
  type,
  className,
  value,
  setValue,
  icon,
  inputAttributes,
}) => {
  [value, setValue] = useState("");

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <div className="input-container">
        {icon && <span className="icon">{icon}</span>}
        <input
          className={className}
          type={type}
          value={value}
          onChange={handleInput}
          {...inputAttributes}
        />
      </div>
    </div>
  );
};

export default Input;
