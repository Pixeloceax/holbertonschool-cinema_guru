import { useEffect } from "react";
import "./movies.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Tag from "./Tag";

function MovieCard({ movies }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const unavaiable =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

  const handleClick = (type) => {
    const accessToken = localStorage.getItem("accessToken");
    if (type === "favorite") {
      if (isFavorite) {
        setIsFavorite(false);

        axios.delete(
          `http://localhost:8001/api/titles/favorite/${movies.imdbId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        setIsFavorite(true);
        axios.post(
          `http://localhost:8001/api/titles/favorite/${movies.imdbId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    if (type === "watchlater") {
      if (isWatchLater) {
        setIsWatchLater(false);
        axios.delete(
          `http://localhost:8001/api/titles/watchlater/${movies.imdbId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        setIsWatchLater(true);
        axios.post(
          `http://localhost:8001/api/titles/watchlater/${movies.imdbId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`http://localhost:8001/api/titles/favorite/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        data.forEach((element) => {
          if (element.id === movies.id) {
            setIsFavorite(true);
          }
        });
      })
      .catch((err) => console.error(err, "movies Card"));
    axios
      .get(`http://localhost:8001/api/titles/watchlater/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
      .then((data) => {
        data.forEach((element) => {
          if (element.id === movies.id) {
            setIsWatchLater(true);
          }
        });
      })
      .catch((err) => console.error(err, "movies Card"));
  }, []);

  return (
    <li className="movie-card-Container">
      <div className="icons-card">
        <span
          className={`icon-later-container ${isWatchLater ? "icon-red" : ""}`}
          onClick={() => handleClick("watchlater")}
        >
          <FontAwesomeIcon icon={faClock} />
        </span>
        <span
          className={`icon-fav-container ${isFavorite ? "icon-red" : ""}`}
          onClick={() => handleClick("favorite")}
        >
          <FontAwesomeIcon icon={faStar} />
        </span>
      </div>
      <div className="header-card">
        <picture className="card-container-img">
          {console.log(movies)}
          {movies.imageurls ? (
            <img
              width={300}
              height={300}
              src={movies.imageurls}
              alt={movies.title}
              onError={(e) => {
                e.target.src = unavaiable;
                e.onerror = null;
              }}
            />
          ) : (
            <img src={unavaiable} alt="not avalaible" />
          )}
        </picture>
        <span className="title-card">{movies.title}</span>
      </div>
      <div className="body-card">
        <p className="synopsis-card">
          {movies.synopsis === "" ? "-Not Avalaible-" : movies.synopsis}
        </p>
        <div className="genres-container-card">
          {movies.genres.map((item) => (
            <Tag key={item} genre={item} filter={true} />
          ))}
        </div>
      </div>
    </li>
  );
}

export default MovieCard;
