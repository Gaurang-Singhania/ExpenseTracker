import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { getExpensesByUser } from "../Api";
import moment from "moment";
import { useCookies } from "react-cookie";


const MyExpense = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [userId, setUserId] = useState(cookies.userId);
  const [expenses, setExpenses] = useState(null);
  const [activeMonth, setActiveMonth] = useState(moment().toISOString());
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchExpenses = async () => {
    try {
      const response = await getExpensesByUser(userId, activeMonth.toString());
      setExpenses(response.data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId, activeMonth]);

  const handleMonthClick = (clickedMonth) => {
    setActiveMonth(clickedMonth);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const months = Array.from({ length: 12 }, (_, i) =>
    moment().subtract(i, "months").toISOString()
  );

  const filteredExpenses = expenses
    ? expenses.filter(
        (expense) =>
          selectedCategory === "All" || expense.category === selectedCategory
      )
    : [];

  const totalAmountSpent = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 mt-4 px-8">
        <div className="flex mb-4">
          {months.map((month) => (
            <div
              key={month}
              onClick={() => handleMonthClick(month)}
              className={`px-4 py-2 cursor-pointer text-xl ${
                month === activeMonth
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {moment(month).format("MMM YYYY")}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="mr-2 text-gray-700">
            Filter by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="All">All</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-xl">
              <th className="px-4 py-2 border border-gray-300">Name</th>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
              <th className="px-4 py-2 border border-gray-300">Category</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense._id} className="bg-white font-semibold">
                <td className="px-4 py-2 border border-gray-300">
                  {expense.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {expense.description}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  ₹ {expense.amount}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {expense.category}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {moment(expense.date).format("DD MMM YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <div className="text-xl font-semibold">Total Amount Spent:</div>
          <div className="ml-2 text-xl font-semibold text-gray-700">
            ₹ {totalAmountSpent.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyExpense;
