import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ admin, allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        auth?.accessToken
            //? auth?.admin === true
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
        //: <Navigate to="/login" state={{ from: location }} replace />


        // add by elyes 
        //auth?.accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;