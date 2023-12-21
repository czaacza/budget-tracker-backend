const {
  addIncome,
  getIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
  getIncomeByUserId,
} = require('../controllers/income');

const {
  addExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
  getExpenseByUserId,
} = require('../controllers/expense');

const {
  login,
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user');

const router = require('express').Router();

router
  .post('/add-income', addIncome)
  .get('/get-incomes', getIncomes)
  .get('/get-incomes-by-user/:userId', getIncomeByUserId)
  .delete('/delete-income/:id', deleteIncome)
  .get('/get-income/:id', getIncome)
  .put('/update-income/:id', updateIncome);

router
  .post('/add-expense', addExpense)
  .get('/get-expenses', getExpenses)
  .get('/get-expenses-by-user/:userId', getExpenseByUserId)
  .delete('/delete-expense/:id', deleteExpense)
  .get('/get-expense/:id', getExpense)
  .put('/update-expense/:id', updateExpense);

router
  .post('/add-user', addUser)
  .get('/get-users', getUsers)
  .delete('/delete-user/:id', deleteUser)
  .get('/get-user/:id', getUser)
  .put('/update-user/:id', updateUser);

router.post('/login', login);

module.exports = router;
