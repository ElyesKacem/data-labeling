import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import CircularProgress from '@mui/material/CircularProgress';

const PersistantAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    console.log("auth in PersistantAuth ", auth);

    useEffect(() => {
        //let isMounted = true;
        const verifyRefreshToken = async () => {
            console.log("active user in persistauth",sessionStorage.getItem("activeUser"));
            setAuth(JSON.parse(sessionStorage.getItem("activeUser")));
            try {
                await refresh();
            }
            catch (error) {
                console.error(error);
            }
            finally {
                /*isMounted &&*/ setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        //return () => isMounted = false;
    }, []);

    useEffect(() => {
        console.log(`is loading: ${isLoading}`);
        console.log(`acessToken Presisteanauth: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    return (
        <div >
            {isLoading ?
                <CircularProgress size={50} color="secondary" />
                : <Outlet />
            }
        </div>
    )
}

export default PersistantAuth;