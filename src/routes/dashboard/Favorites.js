import React, { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          navigate("/login");
        } else {
          const response = await axios.get(
            "http://localhost:8001/api/titles/favorite/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          setMovies(response.data);
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };
    fetchMovies();
  }, [navigate]);

  return (
    <div>
      <h1>Movies you like</h1>
      {movies.map((movie, index) => (
        <MovieCard key={index.id} movie={movie} />
      ))}
    </div>
  );
}
