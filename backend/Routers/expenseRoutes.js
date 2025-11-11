const express = require('express');
const router = express.Router();
const  { createExpense,
    deleteExpense,
    getExpenseById,
    getAllExpenses,
    updateExpenseById
} = require('../Controllers/expenseController.js');

router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.post('/create', createExpense);
router.delete('/delete/:id', deleteExpense);
router.put('/update/:id', updateExpenseById);

module.exports = router;