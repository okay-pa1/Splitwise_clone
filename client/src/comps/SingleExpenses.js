import React, { useState } from "react";
import "./css/index.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function SingleExpenses() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { numberOfUsers, userNames, group } = location.state || {};
  const [fromUserId, setFromUserId] = useState("");
  const [toUserIds, setToUserIds] = useState([]);
  const [expense, setExpense] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleFromUserIdChange = (event) => {
    setFromUserId(event.target.value);
  };

  const handleToUserIdsChange = (event) => {
    const userIds = event.target.value.split(",").map((id) => id.trim());
    setToUserIds(userIds);
  };

  const handleExpenseChange = (event) => {
    setExpense(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newExpense = {
      from: parseInt(fromUserId),
      to: toUserIds.map((id) => parseInt(id)),
      amount: parseFloat(expense),
    };
    setExpenses([...expenses, newExpense]);
    setToUserIds([]);
    setFromUserId("");
    setExpense("");
    setModal(false);
  };

  const calculateNetBalances = (expenses) => {
    const netBalances = new Array(numberOfUsers).fill(0);
    expenses.forEach(({ from, to, amount }) => {
      const splitAmount = amount / to.length;
      netBalances[from - 1] += amount;
      to.forEach((userId) => {
        netBalances[userId - 1] -= splitAmount;
      });
    });
    return netBalances;
  };

  const simplifyDebts = (netBalances) => {
    const transactions = [];
    const creditors = [];
    const debtors = [];

    netBalances.forEach((balance, index) => {
      if (balance > 0) {
        creditors.push({ balance, index });
      } else if (balance < 0) {
        debtors.push({ balance: -balance, index });
      }
    });

    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const settlementAmount = Math.min(debtor.balance, creditor.balance);

      transactions.push({
        from: debtor.index + 1,
        to: creditor.index + 1,
        amount: settlementAmount,
      });

      debtor.balance -= settlementAmount;
      creditor.balance -= settlementAmount;

      if (debtor.balance === 0) i++;
      if (creditor.balance === 0) j++;
    }

    return transactions;
  };
  const handleAllExpenses = () => {
    console.log("hello");
    navigate("/newexpenses/singleexpenses/oldexpenses", { state: { group } });
  };
  const netBalances = calculateNetBalances(expenses);
  const simplifiedDebts = simplifyDebts(netBalances);

  const renderUserDivs = () => {
    return userNames.map((user, index) => (
      <div key={index} className="member">
        <span className="single-id">{index + 1}</span>
        <p className="member-name">{user}</p>
        <span className="amount">{netBalances[index].toFixed(2)}</span>
      </div>
    ));
  };
  return (
    <>
      <div className="expense-container">
        <div className="group-info">
          <div className="single-head">
            <p className="group-name">{group}</p>
          </div>
          <div className="total-members">
            <p>Total Number of Members:</p>
            <span className="num">{numberOfUsers}</span>
          </div>
        </div>
        <section className="members-section">{renderUserDivs()}</section>
      </div>
      {!modal && (
        <button className="btn-expense" onClick={() => setModal(true)}>
          Add Expense
        </button>
      )}
      {modal && (
        <div className="expense-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fromUserId">From User ID:</label>
              <input
                type="number"
                id="fromUserId"
                className="form-control"
                value={fromUserId}
                onChange={handleFromUserIdChange}
                placeholder="Enter User ID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="toUserIds">To User IDs (comma separated):</label>
              <input
                type="text"
                id="toUserIds"
                className="form-control"
                value={toUserIds.join(", ")}
                onChange={handleToUserIdsChange}
                placeholder="Enter User IDs"
              />
            </div>
            <div className="form-group">
              <label htmlFor="expense">Expense:</label>
              <input
                type="number"
                id="expense"
                className="form-control"
                value={expense}
                onChange={handleExpenseChange}
                placeholder="Enter expense"
              />
            </div>

            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </div>
      )}
      <div className="simplified-debts">
        <h2>Simplified Debts</h2>
        {simplifiedDebts.map((transaction, index) => (
          <div key={index}>
            User {transaction.from} owes User {transaction.to}₹
            {transaction.amount.toFixed(2)}
          </div>
        ))}
      </div>
      <button className="btn" onClick={handleAllExpenses}>
        all expenses
      </button>
    </>
  );
}

export default SingleExpenses;
