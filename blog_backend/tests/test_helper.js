const Blog = require('../models/blog')

const initialBlog = [
    {
        title : 'example blog',
        author: 'dheeraj',
        url : 'https://examplelog.com',
        likes: 1
    },
    {
        title : 'example blog 2',
        author: 'amit',
        url : 'https://examplelog2.com',
        likes: 2
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async() => {
    const blogs = await Blog.find({})
    const blogToDelete = blogs[0]
    await blogToDelete.deleteOne()

    return blogToDelete._id.toString()
}

module.exports = {initialBlog, blogsInDb, nonExistingId}