import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import Spinner from '../components/Spinner';

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getBlog = async ()=>{
    const headers = {'Authorization': `Bearer ${user.token}`};
    const response = await axios.get(`/blog/show_thisBlog/${id}`,{
        headers:headers
    })
    .then((res)=>res.data[0])
    .catch((error)=>{
        console.log(error);
    })

    setTitle(response.title);
    setContent(response.content);
}

const saveBlog = async (e)=>{
  e.preventDefault();
  setIsLoading(true);
  const headers = {'Authorization': `Bearer ${user.token}`};
  const body = {title,content};
  await axios.put(`/blog/edit_blog/${id}`,body,{
      headers:headers
  })
  .then(()=> setTimeout(() => {
    setIsLoading(false);
  }, 200))
  .catch((error)=>{
    setIsLoading(false);
      console.log(error);
  });

  

}


  useEffect(() => {
    if(user)
    getBlog()
    
}, [user]);

  return (
    <div className='blog-div'>
      <div className='blog-header'>
        <h4> Edit blog </h4>
      </div>
      <div className='blog-form'>
        <form style={{ width: '50rem' }} onSubmit={saveBlog}>
          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="blogTitle">Title</label>
            <input type="text" id="blogTitle" className="form-control"
              value={title}
              onChange={(e) => { setTitle(e.target.value) }} />
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="blogContent">Content</label>
            <textarea className="form-control" id="blogContent" rows="4"
              value={content}
              onChange={(e) => { setContent(e.target.value) }}></textarea>
          </div>
          {
            isLoading ? (<Spinner/>) : 
            (
              <button data-mdb-ripple-init type="submit" className="btn btn-primary">Save</button>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default EditBlog