import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useBlogContext } from '../hooks/useBlogContext';
import SingleBlog from '../components/SingleBlog';
import deleteIcon from '../icons/bin.svg';
import editIcon from '../icons/edit.svg';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const ViewBlog = () => {
    const {user} = useAuthContext();
    const { id } = useParams();
    const [blog, setBlog] = useState();
    const { blogs } = useBlogContext();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const headers = {'Authorization': `Bearer ${user.token}`};
        await axios.delete(`/blog/delete_blog/${id}`,{
          headers: headers
        })
          .then((res) => {console.log(res)})
          .catch((error) => {
            console.log(error);
          });
        navigate('/user/show_blogs');
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
                                            data-bs-toggle="modal" data-bs-target="#deleteModal"
                                        />
                                        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="deleteModalLabel">Confirm</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        Are you sure you want to delete it?
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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