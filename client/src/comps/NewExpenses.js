import React, { useState } from "react";
import "./css/index.css";
import { useNavigate } from "react-router-dom";
const NewExpenses = () => {
  const navigate = useNavigate();

  const handleOldExpensesClick = () => {
    navigate("/oldexpenses");
  };

  const handleNewExpensesClick = () => {
    navigate("/newexpenses");
  };
  const [numberOfUsers, setNumberOfUsers] = useState(1);
  const [userNames, setUserNames] = useState([""]);
  const [group, setGroupName] = useState("");
  const handleNumberOfUsersChange = (e) => {
    const newNumberOfUsers = parseInt(e.target.value);
    setNumberOfUsers(newNumberOfUsers);

    setUserNames(new Array(newNumberOfUsers).fill(""));
  };

  const handleNameChange = (index, newName) => {
    setUserNames((prevUserNames) => {
      const updatedUserNames = [...prevUserNames];
      updatedUserNames[index] = newName;
      return updatedUserNames;
    });
  };
  const handleGroupChange = (h) => {
    setGroupName(h);
  };
  const handleSubmit = () => {
    console.log(userNames, numberOfUsers, group, "from new expenses");
    navigate("/newexpenses/singleexpenses", {
      state: { numberOfUsers, userNames, group },
    });
    // useNavigate.push("/newexpenses/oldexpenses", { value: numberOfUsers });
  };

  const renderInputBoxes = () => {
    return userNames.map((name, index) => (
      <input
        key={index}
        type="text"
        value={name}
        className="new-input"
        onChange={(e) => handleNameChange(index, e.target.value)}
        placeholder={`Enter name for user ${index + 1}`}
      />
    ));
  };

  return (
    <>
      <div className="new-input modal">
        <p>Enter the new expense</p>
        <label htmlFor="numberOfUsers">Number of Users:</label>
        <input
          // key={index}
          type="text"
          // value={name}
          className="new-input"
          onChange={(e) => handleGroupChange(e.target.value)}
          placeholder={`Enter name of the group`}
        />
        <input
          id="numberOfUsers"
          type="number"
          min="1"
          value={numberOfUsers}
          onChange={handleNumberOfUsersChange}
        />
        {renderInputBoxes()}
        <button onClick={handleSubmit}>Submit</button>
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
};

export default NewExpenses;
