import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import Button from "../../components/general/Button";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const loadMovies = useCallback(
    async (page) => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          navigate("/login");
        } else {
          const response = await axios.get(
            `http://localhost:8001/api/titles/advancedsearch?minYear=${minYear}&maxYear=${maxYear}&genres=${genres.join(
              ","
            )}&title=${title}&sort=${sort}&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data && response.data.titles) {
            setMovies((prevMovies) => [...prevMovies, ...response.data.titles]);
          } else {
            console.error(
              "Response data is not in the expected format:",
              response.data
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [minYear, maxYear, genres, title, sort, navigate]
  );

  useEffect(() => {
    loadMovies(page);
  }, [loadMovies, page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="dashboard">
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
      {movies.map((movie, index) => (
        <MovieCard key={`${movie.id}-${index}`} movie={movie} />
      ))}

      <Button text="Load More.." onClick={handleLoadMore} />
    </div>
  );
};

export default HomePage;
