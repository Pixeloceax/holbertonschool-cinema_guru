import React from "react";
import "./general.css";

const Button = ({ text, className, onClick, icon }) => {
  return (
    <button className={className} onClick={onClick}>
      {icon && <span className="icon">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
