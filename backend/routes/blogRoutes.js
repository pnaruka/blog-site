import express, { request, response } from "express";
//import userModel from "../models/userModel.js";
import blogModel from "../models/blogModel.js";
import requireAuth from "../middleware/requireAuth.js";

const BlogRouter = express.Router();

BlogRouter.use(requireAuth);

BlogRouter.post('/create', async (request, response) => {
    try {
        const blog = request.body;
        blog.userId = request.user._id;

        const newBlog = await blogModel.create_blog(blog);
        return response.status(201).json(newBlog);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message
        });
    }
});

BlogRouter.get('/my_blogs', async (request, response) => {
    try {
        const userId  = request.user._id;
        const userBlogs = await blogModel.my_blogs(userId);
        return response.status(201).json({ total: userBlogs.length, results: userBlogs });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message
        });
    }
});

BlogRouter.get('/show_blogs', async (request, response) => {
    try {
        const userId = request.user._id.toString();
        //console.log(typeof userId);
        const userBlogs = await blogModel.show_blogs()
                                       .then((res) => res.filter((blog)=> blog.userId !== userId));
        //console.log(typeof userBlogs[0].userId);
        return response.status(201).json({ total: userBlogs.length, results: userBlogs });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message
        });
    }
});

BlogRouter.get('/show_thisBlog/:blogId', async (request, response) => {
    try {
        const { blogId } = request.params;

        const blog = await blogModel.show_thisBlog(blogId);

        return response.status(201).json(blog);

    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message
        });
    }
});

BlogRouter.put('/edit_blog/:blogId', async (request, response) => {
    try {
        const { blogId } = request.params;
        const blog = request.body;
        blog.userId = request.user._id;
        blog._id = blogId;
        const updatedBlog = await blogModel.edit_blog(blog);
        return response.status(201).json(updatedBlog);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message
        });
    }
});

BlogRouter.delete('/delete_blog/:blogId', async (request, response) => {
    try {
        const { blogId } = request.params;

        const blog = await blogModel.delete_blog(blogId);

        return response.status(201).json(blog);

    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message
        });
    }
});

export default BlogRouter;