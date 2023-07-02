import "./auth.css";
import Input from "../../components/general/Input";
import Button from "../../components/general/Button";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

const Login = ({ username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h1 className="authentication-header">Sign in with your account</h1>
      <Input
        type="text"
        icon={faUser}
        label="Username:"
        value={username}
        setValue={setUsername}
        className="input username"
      />
      <Input
        type="password"
        icon={faKey}
        label="Password:"
        value={password}
        setValue={setPassword}
        className="input password"
      />
      <Button text="Sign in" icon={faKey} className="button" type="submit" />
    </div>
  );
};

export default Login;
