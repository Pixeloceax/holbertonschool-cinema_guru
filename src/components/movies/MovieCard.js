import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import Tag from "./Tag";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const API_URL = "http://localhost:8001";
  const unavailable =
    "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";

  const handleClick = async (type) => {
    const accessToken = localStorage.getItem("accessToken");
    const url = `${API_URL}/api/titles/${type}/${movie.imdbId}`;
    const method = isFavorite || isWatchLater ? "delete" : "post";
    try {
      const response = await axios[method](
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        if (type === "favorite") {
          setIsFavorite(!isFavorite);
        } else if (type === "watchlater") {
          setIsWatchLater(!isWatchLater);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const favoriteUrl = `${API_URL}/api/titles/favorite/`;
    const watchLaterUrl = `${API_URL}/api/titles/watchlater/`;
    const fetchData = async () => {
      try {
        const [favoriteRes, watchLaterRes] = await Promise.all([
          axios.get(favoriteUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          axios.get(watchLaterUrl, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);
        const favoriteIds = favoriteRes.data.map((item) => item.id);
        const watchLaterIds = watchLaterRes.data.map((item) => item.id);
        setIsFavorite(favoriteIds.includes(movie.id));
        setIsWatchLater(watchLaterIds.includes(movie.id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [movie.id]);

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
          <img
            width={300}
            height={300}
            src={movie.imageurls.length > 0 ? movie.imageurls[0] : unavailable}
            alt={movie.title.title}
            onError={(e) => {
              e.target.src = unavailable;
            }}
          />
        </picture>
        <span className="title-card">{movie.title.title}</span>
      </div>
      <div className="body-card">
        <p className="synopsis-card">{movie.synopsis || "-Not Available-"}</p>
        <div className="genres-container-card">
          <ul>
            {movie.genres.map((item, index) => (
              <Tag key={`${item}-${index}`} genre={item} filter={true} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default MovieCard;
