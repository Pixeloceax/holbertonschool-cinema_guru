import React, { useState } from "react";
import "./auth.css";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";

function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [_switch, setSwitch] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSwitch = (value) => {
    setSwitch(value);
    setPassword("");
    setUsername("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_switch) {
      axios
        .post("http://localhost:8001/api/auth/login", {
          username,
          password,
        })
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setUserUsername(username);
            setIsLoggedIn(true);
          }
        });
    } else {
      axios
        .post("http://localhost:8001/api/auth/register", {
          username,
          password,
        })
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setUserUsername(username);
            setIsLoggedIn(true);
          }
        });
    }
  };

  return (
    <div className="auth">
      <form className="authentication" onSubmit={handleSubmit}>
        <ul>
          <li
            onClick={() => handleSwitch(true)}
            className={_switch ? "active" : ""}
          >
            Sign in
          </li>
          <li
            onClick={() => handleSwitch(false)}
            className={!_switch ? "active" : ""}
          >
            Sign up
          </li>
        </ul>
        {_switch ? (
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        ) : (
          <Register
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        )}
      </form>
    </div>
  );
}

export default Authentication;
