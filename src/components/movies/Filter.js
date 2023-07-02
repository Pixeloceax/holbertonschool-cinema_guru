import React from "react";
import "./movies.css";
import SearchBar from "../general/SearchBar";
import SelectInput from "../general/SelectInput";
import Tag from "./Tag";
import Input from "../general/Input";

const Filter = ({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle,
}) => {
  const genreOptions = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
  ];

  const handleMinYearChange = (e) => {
    setMinYear(Number(e.target.value));
  };

  const handleMaxYearChange = (e) => {
    setMaxYear(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  console.log(minYear, maxYear, sort, genres, title);

  return (
    <div>
      <SearchBar title={title} setTitle={setTitle} />
      <Input
        type="number"
        label="Minimum Year"
        defaultValue={minYear}
        onChange={handleMinYearChange}
      />
      <Input
        type="number"
        label="Maximum Year"
        defaultValue={maxYear}
        onChange={handleMaxYearChange}
      />
      <SelectInput
        label="Sort By"
        value={sort}
        onChange={handleSortChange}
        options={[
          { label: "Latest", value: "latest" },
          { label: "Oldest", value: "oldest" },
          { label: "Highest Rated", value: "highestrated" },
          { label: "Lowest Rated", value: "lowestrated" },
        ]}
      />
      <ul>
        {genreOptions.map((genreOption) => (
          <Tag
            key={genreOption}
            genre={genreOption}
            filter={genreOption}
            genres={genres}
            setGenres={setGenres}
          />
        ))}
      </ul>
    </div>
  );
};

export default Filter;
