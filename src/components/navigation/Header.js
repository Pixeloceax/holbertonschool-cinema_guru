import React from "react";
import "../../routes/auth/auth.css";

const Header = ({ userUsername, setIsLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <img src="https://picsum.photos/100/100" alt="avatar" />
      <p>Welcome {userUsername}</p>
      <span onClick={logout}>
        <i></i> Logout
      </span>
    </nav>
  );
};

export default Header;
