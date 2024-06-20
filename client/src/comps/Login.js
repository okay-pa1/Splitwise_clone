import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/index.css";
import { useRef } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const goToSignIn = () => {
    navigate("/signin");
  };
  const formRef = useRef(null);
  const loginToApp = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    axios
      .post("http://localhost:5000/login", data)
      .then((result) => {
        if (result.data === "Success") {
          navigate("/dashboard");
        } else {
          console.log(result.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="center">
        <h1>Login</h1>
        <br />
        <form ref={formRef} onSubmit={loginToApp}>
          <input type="email" name="email" placeholder="e-mail" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <br />
          <button type="submit">Login</button>
          <br />
          <br />
          <h3>
            Don't have an account?
            <button className="blue " onClick={goToSignIn}>
              click here
            </button>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Login;
