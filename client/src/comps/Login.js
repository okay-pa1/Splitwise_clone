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
  const loginToApp = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const res = await axios.post("/auth/login", data);
    if (res.status === 200) {
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <div className="center">
        <h1>Login</h1>
        <br />
        <form ref={formRef} onSubmit={loginToApp}>
          <input type="text" name="username" placeholder="username" required />
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
