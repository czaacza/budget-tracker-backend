const IncomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
  console.log('addIncome req.body', req.body);

  try {
    const { userId, title, amount, category, description, date } = req.body;
    const income = new IncomeSchema({
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

    await income.save();
    res.status(201).json({ message: 'Income added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncome = async (req, res) => {
  try {
    const income = await IncomeSchema.findById(req.params.id);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIncome = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const income = await IncomeSchema.findById(req.params.id);
    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }
    income.title = title;
    income.amount = amount;
    income.category = category;
    income.description = description;
    income.date = date;
    await income.save();
    res.status(200).json({ message: 'Income updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    await IncomeSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncomeByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const income = await IncomeSchema.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
