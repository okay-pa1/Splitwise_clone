import "./css/index.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function OldExpenses() {
  const location = useLocation();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const { group } = location.state || {};
    if (group) {
      setGroups((prevGroups) => {
        if (!prevGroups.includes(group)) {
          return [...prevGroups, group];
        }
        return prevGroups;
      });
    }
  }, [location.state]);

  const numberOfUsers = 4;
  const userNames = ["hello", "bye", "hi", "die"];
  console.log(numberOfUsers);

  const handleOldExpensesClick = () => {
    navigate("/oldexpenses");
  };

  const handleNewExpensesClick = () => {
    navigate("/newexpenses");
  };

  const handleSingleExpensesClick = (group) => {
    navigate("/singleexpenses", { state: { numberOfUsers, userNames, group } });
  };
  
  return (
    <>
      <div className="Old_Expenses">
        <p className="old-head">All Expenses</p>
        {groups.map((group, index) => (
          <div className="old-flex" key={index}>
            <span className="exp-num">{index + 1}</span>
            <p className="exp-name">{group}</p>
            <button
              className="old-btn"
              onClick={() => handleSingleExpensesClick(group)}
            >
              Expenses
            </button>
            <button className="old-btn">Delete Expense</button>
          </div>
        ))}
      </div>
      <div>
        <nav className="btn-flex">
          <button className="btn" onClick={handleOldExpensesClick}>
            OldExpenses
          </button>
          <button className="btn" onClick={handleNewExpensesClick}>
            NewExpenses
          </button>
        </nav>
      </div>
    </>
  );
}

export default OldExpenses;
