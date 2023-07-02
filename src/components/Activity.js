import React from "react";
import "./components.css";

const Activity = ({ activity }) => {
  return (
    <li className="activity-item">
      <p>
        <span className="activity-user">{activity.title.title}</span>
      </p>
    </li>
  );
};

export default Activity;
