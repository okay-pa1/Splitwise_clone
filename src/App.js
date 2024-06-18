import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./comps/SignIn.js";
import Login from "./comps/Login.js";
import HomePage from "./comps/HomePage.js";
import Dashboard from "./comps/Dashboard.js";
import OldExpenses from "./comps/OldExpenses.js";
import NewExpenses from "./comps/NewExpenses.js";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/oldexpenses" element={<OldExpenses />} />
      <Route path="/newexpenses" element={<NewExpenses />} />
    </Routes>
  );
};

export default App;
