import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryCard = ({ totalBudget, category, spends, icon }) => {
  // Calculate the percentage of budget spent
  // Calculate percentage spent
  var percentageUsed = (spends / totalBudget) * 100;
  if (percentageUsed > 100) {
    percentageUsed = 100;
  }
  var progess =
    percentageUsed < 50
      ? "h-full bg-green-500 rounded-full"
      : percentageUsed < 80
      ? "h-full bg-yellow-500 rounded-full"
      : totalBudget == 0
      ? "h-full bg-gray-200 rounded-full"
      : "h-full bg-red-500 rounded-full";

  return (
    <div className="bg-black shadow-md rounded-xl p-6 w-80 my-2 mx-0.5">
      <div className="flex items-center mb-4">
        <div className="bg-white rounded-xl w-10 h-10 flex items-center justify-center text-white">
          <FontAwesomeIcon icon={icon} className="text-black" /> 
        </div>
        <h2 className="ml-4 text-lg font-semibold text-white">{category}</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex  justify-between mb-4">
          <h3 className="ml-0 text-white">₹ {spends} </h3>
          <span className="ml-2 text-white">₹ {totalBudget}</span>
        </div>
        <div className="h-3 bg-white rounded-full">
          <div
            className={progess}
            style={{ width: `${percentageUsed}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
