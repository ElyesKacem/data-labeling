import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"

const PersistantAuth = () => {
    const [isLoading, setIsLoding] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    console.log("auth in PersistantAuth ",auth);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoding(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoding(false);
    }, []);

    useEffect(() => {
        console.log(`is loading: ${isLoading}`);
        console.log(`acessToken Presisteanauth: ${auth?.accessToken}`);
    }, [isLoading]);
    
    return (
        <>
            {isLoading ?
                <p>... is loading</p>
                : <Outlet />
            }
        </>
    )
}

export default PersistantAuth