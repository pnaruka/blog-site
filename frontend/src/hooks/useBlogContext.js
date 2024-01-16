import { BlogContext } from "../context/BlogContext";
import { useContext } from "react";

export const useBlogContext = ()=>{
    const context = useContext(BlogContext);

    if(!context)
    throw Error('useBlogContext must be inside BlogContextProvider');

    return context;
}