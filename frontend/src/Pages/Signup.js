import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup () {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verify_token = async () => {
            const saved_token = localStorage.getItem("token");
            if (!saved_token) {
                return;
            }

            try {
                const verify_token = await fetch("http://localhost:5000/verify", {
                        method : "POST",
                        headers : {
                            Authorization: `Bearer ${saved_token}`
                        } 
                    });
    
                if (verify_token.status === 200) {
                    console.log("User already logged in!");
                    navigate("/home");
                    return;
                }
            } catch (e) {
                console.error(`Could not verify token!\n\nError:  ${e}`);
            }
        };

        verify_token();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Welcome! Sign In!");
        setError(null);

        try {
            if (!username || !password) {
                console.error("Invalid Data!");
                setError("Please fill all the fields correctly.");
                return;
            }
            if (password.length < 6) {
                console.error("Invalid Password!");
                setError("Password must be at least 6 characters long.");
                return;
            }
            if (username.length < 3) {
                console.error("Invalid Username!");
                setError("Username must be at least 3 characters long.");
                return;
            }

            const response = await fetch("http://localhost:5000/user/signup", {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify({ username, password }),
            });

            if (response.status === 422) {
                console.error("Invalid Data!");
                setError("Please fill all the fields correctly.");
                return;
            } else if (response.status === 409) {
                console.error("User with username already exists!");
                setError("User with this username already exists.");
                return;
            } else if (response.status === 500) {
                console.error("Internal Server Error");
                setError("Internal Server Error");
                return;
            }

            const data = await response.json();
            const token = data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("user_id", data.id);

            console.log("User signed up successfully!");
            navigate("/home");
        } catch (e) {
            console.error(`Failed to sign user up!\n\nError: ${e}`);
            setError("Failed to sign user up. Please try again.");
        }
    }

    return (
        <div>
            <h1>Sign Up to Expense Tracker</h1>
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

export default Signup;