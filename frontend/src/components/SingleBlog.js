import React from 'react'

const SingleBlog = ({ blog, children }) => {
  return (
    <div className='card'>
      <div className='blog card-body'>
        <div className='blog-title card-title'>
          <h4> {blog.title} </h4>
        </div>
          <p className='card-text'> {blog.content} </p>
          {children}
      </div>
    </div>

  )
};

export default SingleBlog;