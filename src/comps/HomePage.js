import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/index.css";
import image1 from "./assets/accounting.png";
export default function HomePage() {
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/signin");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <header>
        <nav className="hnav">
          <h3 id="title">Wisdom Split </h3>
          <ul className="items">
            <li>
              <button className="lbtn" onClick={goToLogin}>
                Login
              </button>
            </li>
            <li>
              <button className="sbtn" onClick={goToSignUp}>
                Sign Up
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <div class="cont">
        <div class="side">
          <h2>Welcome</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel enim
            rerum quis consequatur aliquid ullam ipsam nihil neque similique
            cumque iure nobis mollitia consequuntur, est, modi reprehenderit
            quibusdam nemo commodi expedita veritatis? Officiis rem vitae facere
            iusto sed animi impedit.
          </p>
          <button onClick={goToSignUp}>Get Started</button>
        </div>
        <div class="imagediv">
          <img src={image1} alt="" />
        </div>
      </div>
    </>
  );
}
