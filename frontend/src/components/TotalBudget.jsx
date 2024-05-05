import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const TotalBudget = ({ monthlyBudget, totalSpent }) => {
  // Calculate remaining amount
  const remainingAmount = monthlyBudget - totalSpent;

  var percentageUsed = (totalSpent / monthlyBudget) * 100;
  if (percentageUsed > 100) {
    percentageUsed = 100;
  }

  var progess =
    percentageUsed < 50
      ? "h-full bg-green-500 rounded-full"
      : percentageUsed < 80
      ? "h-full bg-yellow-500 rounded-full"
      : monthlyBudget == 0
      ? "h-full bg-gray-200 rounded-full"
      : "h-full bg-red-500 rounded-full";

  return (
    <div className="bg-white rounded-md p-6 shadow-md w-80">
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={faWallet} className="text-black text-2xl mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Total Monthly Budget</h2>
      </div>
      <div className="flex flex-col">
        <div className="mb-4">
          <p className="text-gray-600 text-xl">Monthly Budget:</p>
          <p className="text-xl font-semibold text-gray-800">₹ {monthlyBudget}</p>
        </div>
        <div className="flex justify-between">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Total Spent:</p>
            <p className="text-lg font-semibold text-gray-800">₹ {totalSpent}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Remaining:</p>
            <p className="text-lg font-semibold text-gray-800">₹ {remainingAmount}</p>
          </div>
        </div>
        <div className="h-3 bg-gray-200 rounded-full">
          <div
            className={progess}
            style={{ width: `${percentageUsed}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TotalBudget;
