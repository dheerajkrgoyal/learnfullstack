const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/', async (request, response) => {
    const {username, password} = request.body
    
    const user = await User.findOne({username})

    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

    if(!(user && passwordCorrect)){
        return response.status(401).send('invalid username or password')
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    return response.status(200).json({token, username: user.username, name: user.name})
})

module.exports = router