import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../Api";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faMoneyBillAlt,
  faPlus,
  faCog,
  faUser,
  faSignOutAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [userId, setUserId] = useState(cookies.userId);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const loadUserProfile = async () => {
    console.log("Loading the user");
    try {
      const response = await loadUser(userId);
      setUser(response.data);
      console.log("User:", response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleLogout = () => {
    removeCookie("userId");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!user) {
      loadUserProfile();
    }
  }, [userId]);

  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.slice(0, 2).join("").toUpperCase();
  };

  return (
    <div className="flex flex-col h-full w-64 bg-black text-white">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Expense Tracker</h1>
      </div>
      <ul className="flex flex-col p-2">
        <li
          className="flex items-center space-x-4 py-3 px-4 rounded-md hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          <FontAwesomeIcon icon={faChartLine} size="lg" />
          <span className="text-lg">Dashboard</span>
        </li>
        <li
          className="flex items-center space-x-4 py-3 px-4 rounded-md hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/myExpense", { replace: true })}
        >
          <FontAwesomeIcon icon={faMoneyBillAlt} size="lg" />
          <span className="text-lg">My Expenses</span>
        </li>
        <li
          className="flex items-center space-x-4 py-3 px-4 rounded-md hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/addExpense", { replace: true })}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" />
          <span className="text-lg">Adding New Expense</span>
        </li>
        <li
          className="flex items-center space-x-4 py-3 px-4 rounded-md hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate("/setBudget", { replace: true })}
        >
          <FontAwesomeIcon icon={faCog} size="lg" />
          <span className="text-lg">Set A Budget</span>
        </li>
      </ul>
      <div className="flex flex-col mt-auto p-4 border-t border-gray-500">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-gray-200 text-black font-bold rounded-full flex justify-center items-center">
            {getInitials(user == null ? "" : user.username)}
          </div>
          <span className="text-lg">
            {user == null ? "User" : user.username}
          </span>
        </div>
        <button
          className="flex items-center space-x-2 mt-2 py-2 px-4 rounded-md bg-red-600 hover:bg-red-700"
          onClick={handleLogout} // Call handleLogout on button click
        >
          <FontAwesomeIcon icon={user ? faSignOutAlt : faSignInAlt} />
          <span>{user ? "Logout" : "Log In"}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
