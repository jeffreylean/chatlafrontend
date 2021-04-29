import "./Login.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/chatroom");
      })
      .catch((e) => alert(e.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/chatroom");
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <form>
          <label>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
          />
        </form>
        <button className="login__button" type="submit" onClick={login}>
          Login
        </button>
        <button className="login__register" type="submit" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
