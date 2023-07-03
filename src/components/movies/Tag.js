import { useState } from "react";
import "./movies.css";

function Tag({ genre, filter, genres, setGenres }) {
  const [selected, setSelected] = useState(false);

  const handleTag = () => {
    if (selected) {
      const newGenres = genres.filter((item) => item !== genre);
      setGenres(newGenres);
      setSelected(false);
    }
    if (!selected) {
      setGenres([...genres, genre]);
      setSelected(true);
    }
  };

  if (filter) {
    return (
      <div className="tag clicked card" onClick={handleTag} value={genre}>
        {genre}
      </div>
    );
  }

  return (
    <li className={`tag ${selected ? "clicked" : ""}`} onClick={handleTag}>
      {genre}
    </li>
  );
}

export default Tag;
