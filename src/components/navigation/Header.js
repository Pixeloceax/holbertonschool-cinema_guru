import React from "react";
import "./navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Button from "../general/Button";

const Header = ({ userUsername, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };
  return (
    <nav className="header">
      <h1>Cinema Guru</h1>
      <div>
        <img src="https://picsum.photos/100/100" alt="Welcome user" />
        <p>Welcome {userUsername}</p>
        <span>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <Button
            onClick={() => handleLogout()}
            text="Logout"
            className="button_logout"
          />
        </span>
      </div>
    </nav>
  );
};

export default Header;
