import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import CircularProgress from '@mui/material/CircularProgress';

const PersistantAuth = () => {
    const [isLoading, setIsLoding] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

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
        <div  style={{display:'flex',alignItems:'center',justifyContent:'center',height:'80vh'}}>
            
                
                {isLoading ?
                <CircularProgress size={50} color="secondary" />
                : <Outlet />
            }
        </div>
    )
}

export default PersistantAuth