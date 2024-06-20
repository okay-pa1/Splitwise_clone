import React, { useEffect, useState } from "react";
import "./css/index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//sign in component
export default function SignIn() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  //all the states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpwdConf] = useState("");
  const [error, setError] = useState("");

  //Signing In
  const signIn = (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      axios
        .post("http://localhost:5000/signin", { name, email, password })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }
  };

  //useeffect to show if passwords match
  useEffect(() => {
    if (password === passwordConfirm) {
      setError("");
    } else {
      setError("Passwords don't match");
    }
  }, [password, passwordConfirm]);

  return (
    <div>
      <div className="center">
        <h1>Sign Up</h1>
        <br />
        <form action="">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="User Name"
            required
          />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e-mail"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
          />
          <input
            type="password"
            onChange={(e) => setpwdConf(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <h5>{error}</h5>
          <button type="submit" onClick={signIn}>
            Sign Up
          </button>
          <h5>
            Don't have an account?
            <button className="blue" onClick={goToLogin}>
              click here
            </button>
          </h5>
        </form>
      </div>
    </div>
  );
}
