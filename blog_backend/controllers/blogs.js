const router = require('express').Router()
const Blog = require('../models/blog.js')

router.get('/', async (request, response) => {
    const result  = await Blog.find({})
    return response.status(200).json(result)
})

router.get('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)
    if(blog){
        return response.status(200).json(blog)
    }
    else{
        return response.status(404).send(`Blog with ${request.params.id} not found`)
    }
})

router.post('/', async (request, response) => {
    const body = request.body
    const blog = new Blog(body)
    const result = await blog.save()
    return response.status(201).json(result)
})

router.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    if(blog){
        return response.status(200).send()
    }
    else{
        return response.status(404).send(`Blog with ${request.params.id} not found`)
    }
})

router.put('/:id', async (request, response) => {
	const body = request.body

	const blogToUpdate = {
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new : true, runValidators: true, context: 'query' })
	if(updatedBlog){
		response.json(updatedBlog)
	}else{
        return response.status(404).send(`Blog with ${request.params.id} not found`)
	}
})

module.exports = router