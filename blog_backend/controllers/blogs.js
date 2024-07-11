const router = require('express').Router()
const Blog = require('../models/blog.js')

router.get('/', (request, response, next) => {
    Blog
        .find({})
        .then((result) => {
            return response.status(200).json(result)
        })
        .catch(error => {
            next(error)
        })
})

router.get('/:id', (request, response, next) => {
    const id = request.params.id
    Blog
        .findById(id)
        .then((blog) => {
            if(blog){
                return response.status(200).json(blog)
            }
            else{
                return response.status(404).send(`Blog with ${id} not found`)
            }
        })
        .catch((error) => {
            next(error)
        })
})

router.post('/', (request, response, next) => {
    const body = request.body
    const blog = new Blog(body)

    blog
        .save()
        .then((result) => {
            return response.status(201).json(result)
        })
        .catch((error) => {
            next(error)
        })
})

module.exports = router