import React, {useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useBlogContext } from '../hooks/useBlogContext';
import SingleBlog from '../components/SingleBlog';
import { useFetchBlogs } from '../hooks/useFetchBlogs';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuthContext();
  const { blogs} = useBlogContext();
  const {fetchBlogs} = useFetchBlogs();


  useEffect(() => {
    if (user)
      fetchBlogs('/blog/show_blogs');
    //console.log(blogs);
  }, [user, fetchBlogs]);

  //console.log(user);
  return (
    <div>
      {
        blogs ? (
          blogs.map((blog)=><Link to={`/user/view_blog/${blog._id}`}  key={blog._id} style={{textDecoration:'none'}}><SingleBlog blog={blog} /></Link>)
        ):(
          <></>
        )
      }
    </div>
  )
}

export default Home