import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./comps/SignIn.js";
import Login from "./comps/Login.js";
import HomePage from "./comps/HomePage.js";
import Dashboard from "./comps/Dashboard.js";
import OldExpenses from "./comps/OldExpenses.js";
import NewExpenses from "./comps/NewExpenses.js";
import SingleExpenses from "./comps/SingleExpenses.js";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/oldexpenses" element={<OldExpenses />} />
      <Route path="/newexpenses" element={<NewExpenses />} />
      <Route path="/newexpenses/oldexpenses" element={<OldExpenses />} />
      <Route path="/newexpenses/singleexpenses" element={<SingleExpenses />} />
      <Route path="/singleexpenses" element={<SingleExpenses />} />
      <Route
        path="/newexpenses/singleexpenses/oldexpenses"
        element={<OldExpenses />}
      />
    </Routes>
  );
};

export default App;
