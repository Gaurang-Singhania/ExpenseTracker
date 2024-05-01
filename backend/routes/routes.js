const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const expenseController = require('../controllers/expenseController');

// User Routes
router.post('/createUser', userController.createUser);
router.post('/loadUser', userController.loadUser);
router.post('/loginUser', userController.loginUser);
router.post('/updateBudget', userController.updateBudget);
router.post('/loadStats', userController.loadStats);

// Expense Routes
router.post('/addExpense', expenseController.createExpense);
router.post('/loadExpenses', expenseController.getExpensesByUser);

module.exports = router;