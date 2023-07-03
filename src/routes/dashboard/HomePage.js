import React, { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import Button from "../../components/general/Button";
import axios from "axios";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMovies(page);
  }, [minYear, maxYear, genres, sort, title]);

  const loadMovies = (page) => {
    const accessToken = localStorage.getItem("accessToken");
    const params = {
      minYear,
      maxYear,
      genres: genres.join(","),
      title,
      sort,
    };
    const options = {
      method: "GET",
      url: "http://localhost:8001/api/titles/advancedsearch",
      params: { page: page, ...params },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setMovies(response.data.titles);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="homepage">
      <Filter
        minYear={minYear}
        maxYear={maxYear}
        genres={genres}
        sort={sort}
        title={title}
        setMinYear={setMinYear}
        setMaxYear={setMaxYear}
        setGenres={setGenres}
        setSort={setSort}
        setTitle={setTitle}
      />

      <div className="cards">
        {movies.map((movies) => (
          <MovieCard key={movies.id} movies={movies} />
        ))}
      </div>

      <Button text="Load More.." onClick={handleLoadMore} />
    </div>
  );
}

export default HomePage;
