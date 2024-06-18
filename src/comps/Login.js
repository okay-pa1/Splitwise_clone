import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/index.css";
import { useRef, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const goToSignIn = () => {
    navigate("/signin");
  };
  const formRef = useRef(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  async function formSubmit(e) {
    e.preventDefault();
    // const formData = new FormData(formRef.current);
    // const data = {};
    // formData.forEach((value, key) => {
    //   data[key] = value;
    // });
    navigate("/dashboard");
    console.log(password, email);
    // console.log(data);
  }
  return (
    <div>
      <div className="center">
        <h1>Login</h1>
        <br />
        <form ref={formRef} onSubmit={formSubmit}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e-mail"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
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

// const creds = {
//   name: "",
//   pwd: "",
// };

export default Login;
