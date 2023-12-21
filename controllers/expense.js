const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
  console.log('addExpense req.body', req.body);
  try {
    const { userId, title, amount, category, description, date } = req.body;
    const expense = new ExpenseSchema({
      userId,
      title,
      amount,
      category,
      description,
      date,
    });
    if (!userId || !title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!amount || !amount === 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    await expense.save();
    res.status(201).json({ message: 'Expense added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await ExpenseSchema.findById(req.params.id);
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const expense = await ExpenseSchema.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.description = description;
    expense.date = date;
    await expense.save();
    res.status(200).json({ message: 'Expense updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    console.log('expense', expense, 'id', id, 'expense._id', expense._id);

    await ExpenseSchema.deleteOne({ _id: expense._id });

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenseByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await ExpenseSchema.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
