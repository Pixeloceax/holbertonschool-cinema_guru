import React from "react";
import "./general.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ text, className, onClick, icon }) {
  return (
    <button className={className} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {text}
    </button>
  );
}

export default Button;
