import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useBlogContext } from '../hooks/useBlogContext';
import SingleBlog from '../components/SingleBlog';
import deleteIcon from '../icons/bin.svg';
import editIcon from '../icons/edit.svg';

const ViewBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState();
    const { blogs } = useBlogContext();

    const handleClick = () => {
        console.log('Clicked');
    }

    useEffect(() => {
        const currBlog = blogs.filter((b) => b._id === id)[0];
        setBlog(currBlog);
    }, [blog, blogs]);

    return (
        <div>
            {
                blog ? (
                    <>
                        <SingleBlog blog={blog}>
                            {
                                blog.current_user ? (
                                    <div>
                                        <img className='card-link'
                                            src={deleteIcon}
                                            alt="Delete"
                                            onClick={handleClick}
                                        />
                                        <Link to={`/user/edit_blog/${blog._id}`}>
                                        <img className='card-link'
                                            src={editIcon}
                                            alt="Edit"
                                        /></Link>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        </SingleBlog>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default ViewBlog