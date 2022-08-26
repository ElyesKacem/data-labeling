import { useLocation, Navigate, Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ admin, allowedRoles }) => {
    const { auth } = useAuth();
    console.log("auth in requireAuth ", auth);
    const location = useLocation();
    return (
        auth?.admin === true
            ? <Outlet />
            :  auth?.accessToken
                    ?<Outlet />
                    :<Navigate to="/login" state={{ from: location }} replace />

            /*? 
            auth?.accessToken
                ? <Outlet />
                : <Navigate to="/login" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />*/
    );
}

export default RequireAuth;