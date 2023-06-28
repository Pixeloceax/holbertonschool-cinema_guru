import React from "react";
import "./auth.css";

import Input from "../../components/general/Input";
import Button from "../../components/general/Button";

const Register = ({ username, password, setUsername, setPassword }) => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={setUsername}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />

      <Button type="submit" text="Register" />
    </div>
  );
};

export default Register;
