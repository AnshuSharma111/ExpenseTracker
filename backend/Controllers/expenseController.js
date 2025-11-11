const db_services = require("../Services/expense.js");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createExpense = async (req, res) => {
    try {
        const data = req.body;

        if (data == null || Object.keys(data).length < 2 || !("name" in data) || !("amount" in data)) {
            console.log("Invalid Data!");
            return res.status(422).json({
                success : false,
                description : "Invalid Data!"
            });
        }
        const id = await db_services.createExpense(data);

        console.log(`Successfully created new Expense!`);
        return res.status(201).json({
            success : true,
            description : "Successfully created new Expense!",
            id : id  
        });
    } catch (e) {
        console.error(`Unable to create a new expense!\n\nError: ${e}`);
        return res.status(500).json({
            success : false,
            description : "Internal Server Error"
        });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const del_id = req.params.id;
        const del_record = await db_services.getExpenseById(del_id);

        if (del_record == null) {
            console.log(`Expense with id ${del_id} does not exist!`);
            return res.status(404).json({
                success : false,
                description : `Expense with id ${del_id} does not exist!`
            });
        }

        await db_services.deleteExpenseById(del_id);

        console.log(`Successfully Deleted Expense with ID ${del_id}`);
        return res.status(200).json({
            success : true,
            description : `Deleted Expense with id ${del_id}!`
        });
    }
    catch (e) {
        console.error(`Unable to delete Expense!\n\nError: ${e}`);
        return res.status(500).json({
            success : false,
            description : "Internal Server Error"
        });
    }
};

const getExpenseById = async (req, res) => {
    try {
        const id = req.params.id;
        
        if (!ObjectId.isValid(id)) {
            console.error("ID is not valid!");
            return res.status(422).json({
                success : false, 
                description : "Invalid Object ID!",
            })
        }

        const data = await db_services.getExpenseById(id);

        console.log(`Successfully fetched Expense!`);
        return res.status(200).json({
            success : true, 
            description : "Successfully fetched record!",
            data : data
        });
    }
    catch (e) {
        console.error(`Unable to fetch Expense!\n\nError: ${e}`);
        return res.status(500).json({
            success : false,
            description : "Internal Server Error"
        });
    }
};

const getAllExpenses = async (req, res) => {
    try {
        const data = await db_services.getAllExpenses();

        console.log("Successfully fetched all Expenses!");
        return res.status(200).json({
            success : true,
            description : "Successfully fetched all data!",
            data : data
        });
    }
    catch (e) {
        console.error(`Unable to fetch Expenses!\n\nError: ${e}`);
        return res.status(500).json({
            success : false,
            description : "Internal Server Error"
        });
    }
};

const updateExpenseById = async (req, res) => {
    try {
        const data = req.body;
        const upd_id = req.params.id;

        if (data == null || Object.keys(data).length < 2 || !("name" in data) || !("amount" in data)) {
            console.log("Invalid Data!");
            return res.status(422).json({
                success : false,
                description : "Invalid Data!"
            });
        }

        if (!ObjectId.isValid(upd_id)) {
            console.error("ID is not valid!");
            return res.status(422).json({
                success : false, 
                description : "Invalid Object ID!",
            })
        }

        const upd_record = await db_services.getExpenseById(upd_id);

        if (upd_record == null) {
            console.log(`Expense with id ${upd_id} does not exist!`);
            return res.status(404).json({
                success : false,
                description : `Expense with id ${upd_id} does not exist!`
            });
        }

        await db_services.updateExpenseById(upd_id, data);

        console.log("Successfully updated data of Expense!");
        return res.status(200).json({
            success : true,
            description : "Successfully updated data of Expense!"
        });
    }
    catch (e) {
        console.error(`Unable to update Expense!\n\nError: ${e}`);
        return res.status(500).json({
            success : false,
            description : "Internal Server Error"
        });
    }
};

module.exports = {
    createExpense,
    deleteExpense,
    getExpenseById,
    getAllExpenses,
    updateExpenseById
};