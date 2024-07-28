const router = require('express').Router()
const Blog = require('../models/blog.js')

router.get('/', async (request, response) => {
    const user = request.user
    if(user){
        const result  = await Blog.find({user: user._id}).populate('user',{username:1, name:1})
        return response.status(200).json(result)
    }
    return response.status(401).send('invalid token')
})

router.get('/:id', async (request, response) => {
    const user = request.user
    if(user && user.blogs.includes(request.params.id)){
        const blog = await Blog.findById(request.params.id).populate('user',{username:1, name:1})
        if(blog){
            return response.status(200).json(blog)
        }
        else{
            return response.status(404).send(`Blog with ${request.params.id} not found`)
        }
    }
    else{
        return response.status(401).send('invalid token')
    }
})

router.post('/', async (request, response) => {
    const body = request.body
    const user = request.user
    if(user){
        const blog = new Blog({...body, user: user._id})
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        return response.status(201).json(result)
    }else{
        return response.status(401).send('invalid token')
    }
})

router.delete('/:id', async (request, response) => {
    const user = request.user

    if(user && user.blogs.includes(request.params.id)){
        const blog = await Blog.findByIdAndDelete(request.params.id)
        if(blog){
            //Updating user by deleting id in blogs array in User document.
            user.blogs = user.blogs.filter(blog => {
                    blog.toString() !== request.params.id
                })
            await user.save()
            return response.status(204).send()
        }
        else{
            return response.status(404).send(`Blog with ${request.params.id} not found`)
        }
    }else{
        return response.status(401).send('invalid token')
    }
    
})

router.put('/:id', async (request, response) => {
    const user = request.user
	const body = request.body
    if(user && user.blogs.includes(request.params.id)){
        const blogToUpdate = {
            likes: body.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new : true, runValidators: true, context: 'query' })
        if(updatedBlog){
            response.json(updatedBlog)
        }else{
            return response.status(404).send(`Blog with ${request.params.id} not found`)
        }
    }else{
        return response.status(401).send('invalid token')
    }
})

module.exports = router