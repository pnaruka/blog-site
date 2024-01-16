import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useBlogContext } from '../hooks/useBlogContext'
import axios from 'axios';

const CreateBlog = () => {
    const {user} = useAuthContext();
    const {dispatch} = useBlogContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const createBlog = async (e)=>{
        //e.preventDefault();
        const headers = {'Authorization': `Bearer ${user.token}`};
        const body = {title,content};
        const response = await axios.post('/blog/create',body,{
            headers:headers
        })
        .then((res)=>res.data)
        .catch((error)=>{
            console.log(error);
        })
        console.log(user);
        console.log(response);
        dispatch({ type: 'CREATE_BLOG', payload: response });
    }
    return (
        <div className='blog-div'>
            <div className='blog-header'>
                <h4> Create blog </h4>
            </div>
            <div className='blog-form'>
                <form style={{width: '50rem'}} onSubmit={createBlog}>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="blogTitle">Title</label>
                        <input type="text" id="blogTitle" className="form-control"
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}} />
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="blogContent">Content</label>
                        <textarea className="form-control" id="blogContent" rows="4"
                         value={content}
                         onChange={(e)=>{setContent(e.target.value)}}></textarea>
                    </div>
                    <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4">Save</button>
                </form>
            </div>
        </div>
    )
}

export default CreateBlog