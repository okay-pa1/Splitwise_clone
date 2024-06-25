import "./css/index.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function OldExpenses() {
  const location = useLocation();

  const navigate = useNavigate();
  const handleOldExpensesClick = () => {
    navigate("/oldexpenses");
  };
  const handleNewExpensesClick = () => {
    navigate("/newexpenses");
  };
  const { group } = location.state || {};

  const numberOfUsers = 4;
  const userNames = ["hello", "bye", "hi", "die"];
  console.log(numberOfUsers);
  const handleSingleExpensesClick = () => {
    navigate("/singleexpenses", { state: { numberOfUsers, userNames, group } });
  };
  return (
    <>
      <div className="Old_Expenses">
        <p className="old-head">All Expenses</p>
        <div className="old-flex">
          <span className="exp-num">1</span>
          <p className="exp-name">{group}</p>
          <button className="old-btn" onClick={handleSingleExpensesClick}>
            Expenses
          </button>
          <button className="old-btn">Delete Expense</button>
        </div>
        <div className="old-flex">
          <span className="exp-num">2</span>
          <p className="exp-name">Bengaluru</p>
          <button className="old-btn" onClick={handleSingleExpensesClick}>
            Expenses
          </button>
          <button className="old-btn">Delete Expense</button>
        </div>
        <div className="old-flex">
          <span className="exp-num">3</span>
          <p className="exp-name">Delhi</p>
          <button className="old-btn" onClick={handleSingleExpensesClick}>
            Expenses
          </button>
          <button className="old-btn">Delete Expense</button>
        </div>
        <div className="old-flex">
          <span className="exp-num">4</span>
          <p className="exp-name">mumbai</p>
          <button className="old-btn" onClick={handleSingleExpensesClick}>
            Expenses
          </button>
          <button className="old-btn">Delete Expense</button>
        </div>
        <div className="old-flex">
          <span className="exp-num">5</span>
          <p className="exp-name">chennai</p>
          <button className="old-btn" onClick={handleSingleExpensesClick}>
            Expenses
          </button>
          <button className="old-btn">Delete Expense</button>
        </div>
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
