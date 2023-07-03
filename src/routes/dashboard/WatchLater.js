import axios from "axios";
import { useEffect, useState } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";

const WatchLater = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8001/api/titles/watchLater/", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setMovies(response.data);
      });
  }, []);
  return (
    <div className="personal-moovies">
      <div className="fav">
        <h1>MOVIES TO WATCH LATER</h1>
        {console.log(movies, "movies from favorites")}
        <div className="cards">
          {movies.map((movies) => (
            <MovieCard key={movies.id} movies={movies} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchLater;
