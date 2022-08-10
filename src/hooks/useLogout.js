import axios from "../api/axios";
import useAuth from "./useAuth";
import React from 'react'

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
    }
    return logout;
}

export default useLogout