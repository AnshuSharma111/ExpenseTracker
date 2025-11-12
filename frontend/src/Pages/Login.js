import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging user in with ", { username, password });
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/user/login", {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({ username, password }),
            });

            if (response.status === 422) {
                console.error("Invalid Data!");
                setError("Please fill all the fields correctly.");
                return;
            } else if (response.status === 401) {
                console.error("Invalid Login!");
                setError("Invalid username or password.");
                return;
            } else if (response.status === 500) {
                console.error("Internal Server Error");
                setError("Internal Server Error");
                return;
            }

            const data = await response.json();
            const token = data.token;

            localStorage.setItem("token", token);
            console.log("User logged in successfully!");
            navigate("/home");

        } catch (e) {
            console.error(`Failed to log user in!\n\nError: ${e}`);
        }
    }
    return (
        <div>
            <h1>Log In to Expense Tracker</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
            <br />
            <p>{error}</p>
        </div>
    );
}

export default Login;