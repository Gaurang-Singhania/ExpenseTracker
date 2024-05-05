import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {

  const [cookies, setCookie, removeCookie] = useCookies();
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
    navigate("/login", { replace: true });
  }

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
      {" "}
      {/* Set height to full height */}
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Expense Tracker</h1>
      </div>
      <ul className="flex flex-col p-2">
        {" "}
        {/* Reduce padding */}
        <li className="flex items-center space-x-4 py-3 px-4 rounded-md hover:bg-gray-700 cursor-pointer">
          {" "}
          {/* Increase padding */}
          <FontAwesomeIcon icon={faChartLine} size="lg" />{" "}
          <span className="text-lg">Dashboard</span> {/* Increase font size */}
        </li>
        <li className="flex items-center space-x-4 py-3 px-4 rounded-md hover:bg-gray-700 cursor-pointer">
          {" "}
          {/* Increase padding */}
          <FontAwesomeIcon icon={faMoneyBillAlt} size="lg" />{" "}
          <span className="text-lg">My Expenses</span>{" "}
          {/* Increase font size */}
        </li>
        <li className="flex items-center space-x-4 py-3 px-4 rounded-md hover:bg-gray-700 cursor-pointer">
          {" "}
          {/* Increase padding */}
          <FontAwesomeIcon icon={faPlus} size="lg" />{" "}
          <span className="text-lg">Adding New Expense</span>{" "}
          {/* Increase font size */}
        </li>
        <li className="flex items-center space-x-4 py-3 px-4 rounded-md hover:bg-gray-700 cursor-pointer">
          {" "}
          {/* Increase padding */}
          <FontAwesomeIcon icon={faCog} size="lg" />{" "}
          <span className="text-lg">Setting A Budget</span>{" "}
          {/* Increase font size */}
        </li>
      </ul>
      <div className="flex flex-col mt-auto p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2 mr-2">
          <FontAwesomeIcon icon={faUser} /> <span>User Name</span>
        </div>
        <button className="flex items-center space-x-2 mt-2 py-2 px-4 rounded-md bg-red-600 hover:bg-red-700">
          <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
