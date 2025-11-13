import { useState } from "react";
import{ useNavigate } from "react-router-dom";

function Home() {
    const [ err, setError ] = useState(null);
    const navigate = useNavigate();

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
    return (
        <div>
            <h1>Expense Tracker</h1>
            <br />
            <p>
                Record All your Expenses!
            </p>
            <br/>
            <button>Create Expense!</button>
            <br />
            <button onClick = {onClickLogout}>Logout</button>
            <br />
            <p>{err}</p>
        </div>
    );
}

export default Home;