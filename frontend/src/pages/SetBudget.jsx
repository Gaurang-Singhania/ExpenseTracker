import React, { useState, useEffect } from "react";
import { loadUser, updateBudget } from "../Api";
import SideBar from "../components/SideBar"; // Import SideBar component
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import 'react-toastify/dist/ReactToastify.css';

const SetBudget = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [userId, setUserId] = useState(cookies.userId);

  const [totalBudget, setTotalBudget] = useState(0);
  const [user, setUser] = useState(null);
  const [budgets, setBudgets] = useState({
    "Food & Dining": 0,
    Housing: 0,
    Transportation: 0,
    Healthcare: 0,
    Entertainment: 0,
    Utilities: 0,
    "Personal Care": 0,
    Others: 0,
  });

  const loadUserProfile = async () => {
    console.log("Loading user...");
    try {
      const response = await loadUser(userId);
      setUser(response.data);
      setBudgets(response.data.categoryBudgets);
      console.log("User:", response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      loadUserProfile();
    }
  }, [user]);

  const handleInputChange = (category, value) => {
    console.log("Input changed:", category, value);
    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: parseInt(value) || 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBudget(userId, totalBudget, budgets);
    toast.success("Budget Updated Successfully! 💸 ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    console.log("Submitted Budgets:", budgets);
  };

  useEffect(() => {
    setTotalBudget(Object.values(budgets).reduce((acc, curr) => acc + curr, 0));
  }, [budgets]);

  return (
    <div className="flex">
      <ToastContainer />
      <div className="flex h-screen">
        <SideBar /> {/* Render SideBar component */}
      </div>
      <div className="flex-grow bg-white p-6">
        <h2 className="text-3xl font-bold mb-4">Set Budget</h2>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(budgets).map(([category, value]) => (
            <div
              key={category}
              className="bg-white shadow-sm rounded-lg p-2 mt-2"
            >
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor={category}
              >
                {category}
              </label>
              <input
                type="number"
                id={category}
                name={category}
                min={0}
                max={10000}
                value={value}
                onChange={(e) => handleInputChange(category, e.target.value)}
                className="w-full border rounded py-2 px-3 bg-gray-50"
              />
            </div>
          ))}
        </div>
        <h2 className="text-l font-bold mt-4">
          Total Monthly Budget: {totalBudget}
        </h2>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600"
          >
            Set Budget
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
