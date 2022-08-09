import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    console.log("useRefreshToken been called");
    const { setAuth } = useAuth();

    const refresh = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        console.log("refresh response",JSON.stringify(response?.data));
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    console.log("useRefreshToken done");
    return refresh;
};

export default useRefreshToken;