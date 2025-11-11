const express = require('express');
const router = express.Router();
const  { createExpense, deleteExpense } = require('../Controllers/expenseController.js');

router.post('/create', createExpense);
router.delete('/delete/:id', deleteExpense);

module.exports = router;