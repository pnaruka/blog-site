import { useState} from "react";
import {useAuthContext} from './useAuthContext.js'
import axios from 'axios';

export const useSignup = ()=>{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();
    //const [userToken, setUserToken] = useState(null);

    const signup = async (user)=>{
        setIsLoading(true);
        setError(null);

        var response= await axios.post('/user/signup',user)
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
    return {signup, isLoading, error};
}