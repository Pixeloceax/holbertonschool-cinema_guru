import React, { useState, useEffect } from "react";
import "./navigation.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Activity from "../Activity";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [selected, setSelected] = useState("home");
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  function setPage(pageName) {
    setSelected(pageName);
    if (pageName === "Home") {
      navigate("/home");
    } else if (pageName === "Favorites") {
      navigate("/favorites");
    } else if (pageName === "Watch Later") {
      navigate("/watchlater");
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8001/api/activity", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <nav className="sidebar">
      <ul className="sidebar_link">
        <li onClick={() => setPage("Home")}>
          <FontAwesomeIcon icon={faFolder} />
          <p>Home</p>
        </li>
        <li onClick={() => setPage("Favorites")}>
          <FontAwesomeIcon icon={faStar} />
          <p>Favorites</p>
        </li>
        <li onClick={() => setPage("Watch Later")}>
          <FontAwesomeIcon icon={faClock} />
          <p>Watch Later</p>
        </li>
      </ul>
      <ul className="sidebar_activities">
        <h1>Latest Activities</h1>
        {activities.slice(0, 10).map((activity) => (
          <Activity activity={activity} />
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
