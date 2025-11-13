import "./ExpenseCard.css";

function ExpenseCard({ expense }) {
    return (
        <div className="card">
            <h3>{expense.name}</h3>
            <p>{expense.description}</p>
            <p>Amount: ₹{expense.amount}</p>
            <p>Label: {expense.label}</p>
        </div>
    );
}

export default ExpenseCard;