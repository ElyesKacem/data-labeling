import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(
            prevState  => {
                prevState = JSON.parse(sessionStorage.getItem("activeUser"));
                return { ...prevState , accessToken: response.data.accessToken }
            }
        );
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;