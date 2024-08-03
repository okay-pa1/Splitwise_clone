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
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setpwdConf] = useState("");
  const [error, setError] = useState("");

  //Signing In
  const signIn = async (e) => {
    e.preventDefault();
    const formId = document.getElementById("signinform");
    if (password === passwordConfirm) {
      try {
        await axios.post("auth/signup", {
          username,
          email,
          password,
        });
        alert("User successfully registered");
        formId.reset();
      } catch (err) {
        alert("error signing in");
        formId.reset();
        console.log(err);
      }
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
        <form action="" id="signinform">
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
