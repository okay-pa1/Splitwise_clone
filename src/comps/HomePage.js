import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate("/signin");
  };
  return (
    <div>
      <h2>Homepage</h2>
      <button onClick={goToSignUp}>Get Started</button>
    </div>
  );
}
