import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [ loading, setLoading ] = useState(true);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);

    use
    if (loading) return <div>Loading...</div>;
    if (!authorized) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;