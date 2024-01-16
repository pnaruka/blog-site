import {useAuthContext} from './useAuthContext.js'
import { useBlogContext } from "./useBlogContext.js";
import axios from 'axios';

export const useFetchBlogs = ()=> {
    const {user} = useAuthContext();
    const {dispatch} = useBlogContext();

    const fetchBlogs = async (api) => {
        const headers = {'Authorization': `Bearer ${user.token}`};
        const response = await axios.get(api,{
          headers: headers
        })
          .then((res) => res.data.results)
          .catch((error) => {
            console.log(error);
          });
          
          const payload = response.map((res)=>{
            res.current_user = user._id === res.userId
            return res;
          })
    
        dispatch({ type: 'SET_BLOGS', payload: payload });
    
      };

      return {fetchBlogs};

}