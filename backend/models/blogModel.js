import monogoose from "mongoose";

const blogSchema = monogoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

blogSchema.statics.create_blog = async function (blog) {
    if (!blog.userId ||
        !blog.title ||
        !blog.content)
        throw Error('All fields are required.');

    const newBlog = this.create({
        userId: blog.userId,
        title: blog.title,
        content: blog.content
    });

    return newBlog;
}

blogSchema.statics.edit_blog = async function (blog) {
    if (!blog.userId ||
        !blog.title ||
        !blog.content)
        throw Error('All fields are required.');
    try {
        const updatedBlog = await this.findOneAndUpdate(
            { _id: blog._id },
            {
                title: blog.title,
                content: blog.content
            },

            { new: true }
        ).exec();
        return updatedBlog;
    }
    catch (error) {
        throw Error('No such blog');
    }

}

blogSchema.statics.show_blogs = async function () {

    const userBlogs = await this.find({}).exec();

    if (!userBlogs)
        throw Error('No blogs to show.');

    return userBlogs;
}

blogSchema.statics.my_blogs = async function (userId) {
    if (!userId)
        throw Error('Must provide userId');

    const userBlogs = await this.find({ userId: userId }).exec();

    if (!userBlogs)
        throw Error('No blogs to show.');

    return userBlogs;
}

blogSchema.statics.show_thisBlog = async function (blogId) {
    if (!blogId)
        throw Error('Must provide blogId');

    const thisBlog = await this.find({ _id: blogId }).exec();

    if (!thisBlog)
        throw Error('No such blog.');

    return thisBlog;
}

blogSchema.statics.delete_blog = async function (blogId) {
    if (!blogId)
        throw Error('Must provide blogId');

    try{
        const thisBlog = await this.findByIdAndDelete(blogId).exec();
        return thisBlog;
    }
    catch(error){
        throw Error('No such blog');
    }

}

const blogModel = monogoose.model('blogs', blogSchema);

export default blogModel;