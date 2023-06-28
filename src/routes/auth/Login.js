import React from "react";
import "./auth.css";

import Input from "../../components/general/Input";
import Button from "../../components/general/Button";

const Login = ({ username, password, setUsername, setPassword }) => {
  return (
    <div>
      <Input
        label="Username"
        type="text"
        value={username}
        onChange={setUsername}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />

      <Button type="submit" text="Sign In" />
    </div>
  );
};

export default Login;
