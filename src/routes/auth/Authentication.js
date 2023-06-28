import "./auth.css";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
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
      console.log(username, password);
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
          console.log(username, password);
          if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setUserUsername(username);
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  };
  return (
    <form className="authentication" onSubmit={handleSubmit}>
      <header>
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
      </header>
      <main>
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
      </main>
    </form>
  );
};

export default Authentication;
