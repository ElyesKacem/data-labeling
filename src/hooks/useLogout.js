import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();
    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true
            })
        } catch (error) {
            console.error(error);
        }
        sessionStorage.clear();
    }
    return logout;
}

export default useLogout