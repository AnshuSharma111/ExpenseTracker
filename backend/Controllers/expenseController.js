const createExpense = async (req, res) => {
    res.status(201).send('Created Expense!');
}

const deleteExpense = async (req, res) => {
    const del_id = req.params.id;
    res.status(201).send(`Deleted Expense with id ${del_id}!`);
}

module.exports = {
    createExpense,
    deleteExpense
};