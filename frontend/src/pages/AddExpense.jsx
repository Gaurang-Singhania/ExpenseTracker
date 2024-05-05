import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { createExpense } from "../Api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";

const AddExpense = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [userId, setUserId] = useState(cookies.userId);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createExpense(name, amount, description, category, userId);
    toast.success("Expense Added Successfully! 💰", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setName("");
    setAmount("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="flex">
      <ToastContainer />
      <div className="flex h-screen">
        <SideBar />
      </div>
      <div className="flex-1">
        <div className="bg-white p-6">
          <h2 className="text-3xl font-bold mb-4">Add New Expense</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="border rounded w-full py-2 px-3 bg-gray-50"
                type="text"
                id="name"
                placeholder="Enter Expense Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="amount"
              >
                Amount
              </label>
              <input
                className="border rounded w-full py-2 px-3 bg-gray-50"
                type="number"
                id="amount"
                placeholder="Enter Expense Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="border rounded w-full py-2 px-3 h-36 resize-none bg-gray-50"
                id="description"
                placeholder="Enter Expense Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                className="border rounded w-full py-2 px-3 bg-gray-50"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Expense Category</option>
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
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
              >
                Add Expense
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
