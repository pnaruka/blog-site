import { useState} from "react";
import {useAuthContext} from './useAuthContext.js'
import axios from 'axios';

export const useLogin = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (user)=>{
        setIsLoading(true);
        setError(null);
        //console.log("Use login:", user);
        var response= await axios.post('/user/login',user)
        .then((res)=>{
            setIsLoading(false);
            return res.data;
            
        })
        .catch((error)=>{
            setIsLoading(false);
            setError(error.response.data.message);
            console.log(error.response.data.message);
        });
        localStorage.setItem('user',JSON.stringify(response));

        //console.log(response);
        dispatch({type:'LOGIN', payload: response});
        setIsLoading(false);
    }
    return {login, isLoading, error};
}