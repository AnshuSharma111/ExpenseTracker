const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user : { type: mongoose.Types.ObjectId, ref : 'User', required : true },
    name : {type: String, required : true},
    description : {type: String},
    amount : {type: Number, required : true},
    date : {type: Date, default: Date.now },
    label : {type: String, default : "unlabeled"}
});

const expenseModel = mongoose.model("Expense", expenseSchema);

module.exports = {
    expenseModel
};