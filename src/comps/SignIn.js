import React, { useEffect, useState } from "react";
import "./css/index.css";
import { useNavigate } from "react-router-dom";

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

  //printing data entered from the user
  const printData = (e) => {
    e.preventDefault();
    console.log(name, email, password, passwordConfirm);
    navigate("/dashboard");
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
          />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e-mail"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
          <input
            type="password"
            onChange={(e) => setpwdConf(e.target.value)}
            placeholder="Confirm Password"
          />
          <h5>{error}</h5>
          <button type="submit" onClick={printData}>
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
