import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [ loading, setLoading ] = useState(true);
    const [ auth, setAuth ] = useState(false);

    useEffect(() => {
        const verify_token = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setAuth(false);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/verify", {
                    method : "POST",
                    headers : { 
                        Authorization: `Bearer ${token}`
                    } 
                });

                if (res.status === 200) {
                    setAuth(true);
                } else {
                    localStorage.removeItem("token");
                    setAuth(false);
                }
            } catch (e) {
                console.error("Could not verify token!\n\nError: ", e);
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };

        verify_token();
    }, []);

    if (loading) return (<div>Loading...</div>);
    if (!auth) return <Navigate to="/login" replace />
    return children;
};

export default ProtectedRoute;