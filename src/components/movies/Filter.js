import "./movies.css";
import Input from "../general/Input";
import SearchBar from "../general/SearchBar";
import Tag from "./Tag";
import SelectInput from "../general/SelectInput";

function Filter({
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
}) {
  const options = [
    "default",
    "latest",
    "oldest",
    "highestrated",
    "lowestrated",
  ];
  const tags = [
    "action",
    "drama",
    "comedy",
    "biography",
    "romance",
    "thriller",
    "war",
    "history",
    "sport",
    "sci-fic",
    "documentary",
    "crime",
    "fantasy",
  ];

  return (
    <div className="filter-container">
      <div className="left-filter">
        <SearchBar title={title} setTitle={setTitle} />
        <div className="input-search">
          <Input
            label={"Min Date:"}
            type={"number"}
            className={"input"}
            inputAttributes={{ for: "min-date" }}
            value={minYear}
            setValue={setMinYear}
          />
          <Input
            label={"Max Date:"}
            type={"number"}
            className={"input"}
            inputAttributes={{ for: "max-date" }}
            value={maxYear}
            setValue={setMaxYear}
          />
          <SelectInput
            className={"input"}
            label={"Sort:"}
            options={options}
            setValue={setSort}
          />
        </div>
      </div>
      <div className="tags-filter">
        {tags.map((item) => (
          <Tag genre={item} genres={genres} setGenres={setGenres} key={item} />
        ))}
      </div>
    </div>
  );
}

export default Filter;
