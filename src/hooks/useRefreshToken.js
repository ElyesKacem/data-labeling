import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    // console.log("useRefreshToken been called");
    const { setAuth } = useAuth();

    const refresh = async () => {
        axios.defaults.withCredentials = true;
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        // console.log("refresh response", JSON.stringify(response?.data));
        setAuth(
            prevState  => {
                prevState = JSON.parse(sessionStorage.getItem("activeUser"));
                // console.log('prev ', JSON.stringify(prevState ));
                // console.log("new access token ", response.data.accessToken);
                return { ...prevState , accessToken: response.data.accessToken }
            }
        );
        return response.data.accessToken;
    }
    // console.log("useRefreshToken done");
    return refresh;
};

export default useRefreshToken;