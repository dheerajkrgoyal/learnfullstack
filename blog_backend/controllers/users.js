const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
    const result  = await User.find({}).populate('blogs', {title:1, author:1, url:1, likes:1})
    return response.status(200).json(result)
})

router.post('/', async (request, response) => {
    const body = request.body
    
    const password = await bcrypt.hash(body.password, 10)

    const userToSave = {...body, password: password}

    const user = new User(userToSave)
    const result = await user.save()
    return response.status(201).json(result)
})

module.exports = router