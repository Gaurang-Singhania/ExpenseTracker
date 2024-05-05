import React from 'react';

const DashboardExpenseCard = ({ name, amount, category, date }) => {
  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.slice(0, 2).join("").toUpperCase();
  };

  return (
    <div className="bg-black shadow-md rounded-md p-6 w-80 h-28 my-2 mx-0.5">
      <div className="flex items-center">
        <div className="h-10 w-10 bg-gray-500 text-white rounded-full flex justify-center items-center">
          {getInitials(name)}
        </div>
        <div className="ml-4 flex-grow">
          <h2 className="text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap text-white" style={{ maxWidth: 'calc(100% - 2.5rem)' }}>
            {name}
          </h2>
          <div className="flex justify-between mt-2 text-lg"> {/* Adjust mt-2 to control spacing */}
            <p className="text-white">Cost: ₹ {amount}</p>
            <span className="bg-white px-2 py-1 rounded-2xl text-black text-sm">
              {category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardExpenseCard;
