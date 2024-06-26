import React from "react";
import "./css/index.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleOldExpensesClick = () => {
    navigate("/oldexpenses");
  };

  const handleNewExpensesClick = () => {
    navigate("/newexpenses");
  };

  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p>
          Welcome to your Wisdom wise application. Here you can manage group
          expenses easily.
        </p>
      </div>
      <div>
        <nav className="btn-flex">
          <button className="btn" onClick={handleOldExpensesClick}>
            All Expenses
          </button>
          <button className="btn" onClick={handleNewExpensesClick}>
            Create a New Group
          </button>
        </nav>
      </div>
    </>
  );
}

export default Dashboard;
