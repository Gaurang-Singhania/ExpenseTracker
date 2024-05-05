const SERVER_URL = "http://localhost:3000/api/";

const fetchData = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error.message);
  }
};

export const createUser = async (username, email, password) => {
  return await fetchData(`${SERVER_URL}createUser`, {username: username, email: email, password: password });
};

export const loadUser = async (userId) => {
  return await fetchData(`${SERVER_URL}loadUser`, { _id: userId });
};

export const loginUser = async (email,password) => {
  return await fetchData(`${SERVER_URL}loginUser`, { email: email, password: password });
};

export const updateBudget = async (userId, monthlyBudget, categoryBudgets) => {
  return await fetchData(`${SERVER_URL}updateBudget`, {
    id: userId,
    monthlyBudget: monthlyBudget,
    categoryBudgets: categoryBudgets,
  });
};

export const loadStats = async (userId) => {
  return await fetchData(`${SERVER_URL}loadStats`, { id: userId });
};

export const createExpense = async (
  name,
  amount,
  description,
  category,
  userId
) => {
  return await fetchData(`${SERVER_URL}addExpense`, {
    name: name,
    amount: amount,
    description: description,
    category: category,
    currencyType: "INR",
    user: userId,
  });
};

export const getExpensesByUser = async (userId, date) => {
  return await fetchData(`${SERVER_URL}loadExpenses`, {
    id: userId,
    date: date,
  });
};
