import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Authentication from "./routes/auth/Authentication";
import Dashboard from "./routes/dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post("http://localhost:8001/api/auth/", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setUsername(response.data.username);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUsername("");
      });
  }, []);

  return isLoggedIn ? (
    <Dashboard userUsername={username} setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <Authentication
      setIsLoggedIn={setIsLoggedIn}
      setUserUsername={setUsername}
    />
  );
}

export default App;
