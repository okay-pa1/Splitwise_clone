import "./css/index.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function OldExpenses() {
  const location = useLocation();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [groupDets, setGroupDets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isDeleteButton, setDeleteButton] = useState(false);

  // useEffect(() => {
  //   const { group } = location.state || {};
  //   if (group) {
  //     setGroups((prevGroups) => {
  //       if (!prevGroups.includes(group)) {
  //         return [...prevGroups, group];
  //       }
  //       return prevGroups;
  //     });
  //   }
  // }, [location.state]);
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await axios.get("/group/getallgroups");
      setGroupDets(res.data);
      const groupNames = res.data.map((singleGroup) => singleGroup.groupname);
      setGroups(groupNames);
      setLoading(false);
      setDeleteButton(false);
    };

    fetchGroups();
  }, [isDeleteButton]);

  const handleOldExpensesClick = () => {
    navigate("/oldexpenses");
  };

  const handleNewExpensesClick = () => {
    navigate("/newexpenses");
  };

  // const handleSingleExpensesClick = (group) => {
  //   navigate("/singleexpenses", { state: { numberOfUsers, userNames, group } });
  // };

  const handleSingleExpensesClick = (index) => {
    const group = groupDets[index];
    navigate("/singleexpenses", {
      state: {
        numberOfUsers: group.members.length,
        userNames: group.members,
        group: group.groupname,
      },
    });
  };

  const handleDeleteGroupClick = async (index) => {
    try {
      const group = groupDets[index];
      const groupId = group._id;
      const res = await axios.delete(`/group/deletegroup/${groupId}`);
      setDeleteButton(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <>
        <h2>Loading</h2>
      </>
    );
  }

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
              onClick={() => handleSingleExpensesClick(index)}
            >
              Expenses
            </button>
            <button
              className="old-btn"
              onClick={() => handleDeleteGroupClick(index)}
            >
              Delete Group
            </button>
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
