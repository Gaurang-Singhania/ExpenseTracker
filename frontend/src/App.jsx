import React from "react";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Home from "./Home";
import MyExpense from "./pages/MyExpense";
import AddExpense from "./pages/AddExpense";
import SetBudget from "./pages/SetBudget";
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/myExpense" element={<MyExpense />} />
          <Route path="/addExpense" element={<AddExpense />} />
          <Route path="/setBudget" element={<SetBudget />} />
          <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
