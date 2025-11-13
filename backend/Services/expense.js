const { expenseModel : Expense } = require("../Models/expense.js");

const createExpense = async (data) => {
    const new_expense = new Expense(data);
    const new_expense_data = await new_expense.save();
    return new_expense_data._id;
};

const getAllExpenses = async () => {
    return Expense.find();
};

const getExpensesById = async (id) => {
    return Expense.find({user: id});
};

const deleteExpenseById = async (id) => {
    return Expense.findByIdAndDelete(id);
};

const updateExpenseById = async (id, data) => {
    return Expense.findByIdAndUpdate(id, data, {new : true});
};

module.exports = {
    getAllExpenses,
    getExpensesById,
    deleteExpenseById,
    updateExpenseById,
    createExpense
};