import React from "react";
import "./general.css";

const SearchBar = ({ title, setTitle }) => {
  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <input type="text" value={title} onChange={handleInput} />
    </div>
  );
};

export default SearchBar;
