import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faMoneyBillAlt, faPlus, faCog, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-black text-white">

      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-xl font-semibold">Expense Tracker</h1>
      </div>

      <ul className="flex flex-col p-4">
        <li className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-700">
          <FontAwesomeIcon icon={faChartLine} /> <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-700">
          <FontAwesomeIcon icon={faMoneyBillAlt} /> <span>My Expenses</span>
        </li>
        <li className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-700">
          <FontAwesomeIcon icon={faPlus} /> <span>Adding New Expense</span>
        </li>
        <li className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-700">
          <FontAwesomeIcon icon={faCog} /> <span>Setting A Budget</span>
        </li>
      </ul>

      <div className="flex flex-col mt-auto p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
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
