import React from "react";
import "./general.css";

const SelectInput = ({
  label,
  options,
  multiple,
  className,
  value,
  setValue,
}) => {
  const handleSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setValue(multiple ? selectedOptions : selectedOptions[0]);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <select
        className={className}
        multiple={multiple}
        value={value}
        onChange={handleSelect}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
