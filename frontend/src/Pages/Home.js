import { useEffect, useState } from "react";
import{ useNavigate } from "react-router-dom";
import ExpenseCard from "../Components/ExpenseCard.js";
import "./Home.css";

function Home() {
    const [ err, setError ] = useState(null);
    const [ expenses, setExpenses ] = useState([]);
    const navigate = useNavigate();
 
    // on render, fetch all expenses
    useEffect(() => {
        setError(null);
        setExpenses([]);
        
        const fetch_expenses = async () => {
            try {
                const user_id = localStorage.getItem("user_id");
                const token = localStorage.getItem("token");
                
                const fetch_data_response = await fetch(`http://localhost:5000/expense/${user_id}`, {
                    method : "GET",
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${token}`
                    }
                });
                
                if (!fetch_data_response.ok) {
                    console.error("Could not fetch user data!");
                    setError("Could not fetch user data! Please try again later.");
                    return;
                } else {
                    const fetch_data_json = await fetch_data_response.json();
                    const data = fetch_data_json.data;
                    
                    setExpenses(data);
                    
                    console.log("Fetched user data successfully!", fetch_data_json);
                }
            } catch (e) {
                console.error(`Could not fetch user data!\n\nError:  ${e}`);
                setError("Could not fetch user data! Please try again later.");
            }
        }
        
        fetch_expenses();
    }, [navigate]);
    
    // to manage form data
    const [ form, setForm ] = useState({
        name : "",
        description : "",
        amount : 0,
        label : "unlabeled"
    });

    const form_change = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => (
            {...prevForm, [name] : value}
        ))
    };

    // handle logout
    const onClickLogout = async () => {
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found!");
                setError("No token found! Please login again.");
                navigate("/login");
                return;
            }

            const response = await fetch('http://localhost:5000/user/logout', {
                method : "POST",
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");

                console.log("Logged out successfully!");
                navigate("/login");
            } else {
                console.error("Could not logout user!");
                setError("Could not logout user. Please try again later.");
            }

        } catch (e) {
            console.error(`Could not logout user!\n\nError:  ${e}`);
            setError("Could not logout user. Please try again later.");
        } 
    };

    // handle create expense
    const onCreateExpense = async () => {
        setError(null);

        try {
            const user_id = localStorage.getItem("user_id");
            const token = localStorage.getItem("token");

            const data = {
                user : user_id,
                name : form.name,
                description : form.description,
                amount : form.amount,
                label : form.label
            }

            if (!data.name || !data.amount) {
                console.error("Please fill all the required fields!");
                setError("Please fill all the required fields!");
                return;
            }

            const response = await fetch("http://localhost:5000/expense/create", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body : JSON.stringify(data)
            });

            if (!response.ok) {
                console.error("Could not create expense!");
                setError("Could not create expense! Please try again later.");
                return;
            }

            const response_json = await response.json();
            console.log("Expense created successfully!", response_json);

            setExpenses(prevExpenses => ([
                ...prevExpenses,
                data
            ]));
        } catch (e) {
            console.error(`Could not create expense!\n\nError: ${e}`);
            setError("Could not create expense! Please try again later.");
        }
    }

    return (
        <div>
            <h1>Expense Tracker</h1>
            <p>
                Record All your Expenses!
            </p>
            <br />
            <button onClick = {onClickLogout}>Logout</button>
            <br />
            <p>{err}</p>
            <br />
            <h2>Create New Expense!</h2>
            <div className="box">
                <form onSubmit={onCreateExpense}>
                    <label>
                        Name
                        <input type="text" name="name" value={form.name} onChange={form_change}/>
                    </label>
                    <br />
                    <label>
                        Description
                        <input type="text" name="description" value={form.description} onChange={form_change}/>                    
                    </label>
                    <br />
                    <label>
                        Amount
                        <input type="number" name="amount" value={form.amount} onChange={form_change}/>
                    </label>
                    <br />
                    <label>
                        Label
                        <select name="label" multiple value={form.label} onChange={form_change}>
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="utilities">Utilities</option>
                            <option value="health">Health</option>
                            <option value="electricity">Electricity</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <br />
                    <button type="button" onClick={onCreateExpense}>Create Expense</button>
                </form>
            </div>
            <br />
            <div>
                <h2>Your Expenses</h2>

                {expenses.map((expense, index) => (
                    <ExpenseCard key={index} expense={expense} />
                ))}
            </div>
        </div>
    );
}

export default Home;