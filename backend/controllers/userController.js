const User = require('../models/userModel');
const Expense = require('../models/expenseModel');

const expenseCategories = [
    "Food & Dining",
    "Housing",
    "Transportation",
    "Healthcare",
    "Entertainment",
    "Utilities",
    "Personal Care",
    "Others"
];

exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newUser
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.loadUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        if (!user) {    
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne(Expense.where({ email, password }));

        if (!user) {    
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.updateBudget = async (req, res) => {
    try {
        const { id, monthlyBudget, categoryBudgets } = req.body;

        const user = await User.findById(id);

        if (!user) {    
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        user.monthlyBudget = monthlyBudget;
        if (categoryBudgets) {
            user.categoryBudgets = categoryBudgets;
        }
        
        const updatedUser = await user.save();

        res.status(200).json({
            status: 'success',
            data: updatedUser
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};



exports.loadStats = async (req, res) => {
    try {
        const userId = req.body.id;

        // Calculate total monthly spend
        const currentDate = new Date();
        const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Fetch expenses for the current month
        const currentMonthExpenses = await Expense.find({
            user: userId,
            date: { $gte: currentMonthStart, $lte: currentMonthEnd }
        });

        // Calculate total monthly spend
        let totalMonthlySpend = 0;
        for (const expense of currentMonthExpenses) {
            totalMonthlySpend += expense.amount;
        }

        // Calculate total spends in each category for the current month
        const categorySpends = {};
        for (const category of expenseCategories) {
            let categoryTotal = 0;
            for (const expense of currentMonthExpenses) {
                if (expense.category === category) {
                    categoryTotal += expense.amount;
                }
            }
            categorySpends[category] = categoryTotal;
        }

        // Calculate total spend all time
        let totalSpendAllTime = 0;
        const allTimeExpenses = await Expense.find({ user: userId });
        for (const expense of allTimeExpenses) {
            totalSpendAllTime += expense.amount;
        }

        // Get the monthly budget from the User collection
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        const monthlyBudget = user.monthlyBudget || 0;
        const categoryBudgets = user.categoryBudgets || {};

        res.status(200).json({
            status: 'success',
            data: {
                totalMonthlySpend,
                categorySpends,
                totalSpendAllTime,
                monthlyBudget,
                categoryBudgets

            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};