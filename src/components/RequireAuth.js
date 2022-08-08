import { useLocation, Navigate, Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ admin, allowedRoles }) => {
    const { auth } = useAuth();
    console.log("auth ",auth);
    const location = useLocation();
    console.log(location);
    return (
        auth?.admin === true 
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;