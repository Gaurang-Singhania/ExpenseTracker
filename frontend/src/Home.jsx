import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import CategoryCard from "./components/CategoryCard";
import TotalBudget from "./components/TotalBudget"; 
import DashChart from "./components/DashChart";
import DashboardExpenseCard from "./components/DashboardExpenseCard";
import moment from "moment";
import { useCookies } from "react-cookie";
import { loadStats, getExpensesByUser, loginUser, loadUser } from "./Api";
import {
  faBathtub,
  faCheckCircle,
  faHospital,
  faHouse,
  faToolbox,
  faTrain,
  faUmbrellaBeach,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  "Food & Dining": faUtensils,
  Housing: faHouse,
  Transportation: faTrain,
  Healthcare: faHospital,
  Entertainment: faUmbrellaBeach,
  Utilities: faBathtub,
  "Personal Care": faCheckCircle,
  Others: faToolbox,
};

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [userId, setUserId] = useState(cookies.userId);
  const [stats, setStats] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [userName, setUserName] = useState(null); 

  const fetchUserName = async () => {
    try {
      const response = await loadUser(userId);
      setUserName(response.data.username);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await loadStats(userId);
      console.log("Response:", response);
      setStats(response.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const fetchExpenses = async () => {
    const currentTime = moment().toISOString();
    try {
      console.log(currentTime);
      const response = await getExpensesByUser(userId, currentTime.toString());
      const firstFourExpenses = response.data.slice(0, 4);
      setExpenses(firstFourExpenses);
      console.log("Expenses:", response.data);
    } catch (error) {
      console.error("Error loading expenses:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserName();
      fetchStats();
      fetchExpenses();
    } else {
    }
  }, [userId]);

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="flex-grow bg-white p-2 m-6" style={{ width: "calc(100% - 300px)" }}>
        <h1 className="text-4xl mb-4 mt-4 font-semibold text-gray-800">
          Welcome To Your Dashboard, {userName}
        </h1>
        <div className="flex justify-center" >
          <TotalBudget 
            monthlyBudget={stats?.monthlyBudget} 
            totalSpent={stats?.totalSpendAllTime} 
            style={{ width: "50%", marginRight: "100px", height: "100px" }} // Adjust width here
          />
          <DashChart 
            stats={stats} 
            style={{ width: "50%" }} // Adjust width here
          />
        </div>
        <h1 className="text-xl mb-2 mt-8 font-semibold text-gray-800">
          Recent Expenses
        </h1>
        <hr />
        <div className="flex overflow-x-auto p-3 mr-3">
          {expenses?.map((expense) => (
            <DashboardExpenseCard
              key={expense._id}
              name={expense.name}
              amount={expense.amount}
              category={expense.category}
              date={expense.date}
            />
          ))}
        </div>
        <h1 className="text-xl mb-1 mt-3 font-semibold text-gray-800">
          Category Spendings
        </h1>
        <hr />
        <div className="flex flex-wrap justify-between overflow-x-auto p-3">
          {stats?.categorySpends &&
            Object.entries(stats.categorySpends)
              .slice(0, 4)
              .map(([category, spends]) => (
                <CategoryCard
                  key={category}
                  category={category}
                  icon={icons[category]}
                  spends={spends}
                  totalBudget={stats.categoryBudgets[category]}
                />
              ))}
        </div>
        <div className="flex flex-wrap justify-between overflow-x-auto p-3">
          {stats?.categorySpends &&
            Object.entries(stats.categorySpends)
              .slice(4, 8)
              .map(([category, spends]) => (
                <CategoryCard
                  key={category}
                  category={category}
                  icon={icons[category]}
                  spends={spends}
                  totalBudget={stats.categoryBudgets[category]}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
