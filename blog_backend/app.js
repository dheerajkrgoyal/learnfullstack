const express = require('express')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')
const middleware = require('./utils/middleware')

const MONGODB_URL = config.MONGODB_URL
mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URL)
    .then(() => {
        logger.info('Connected to mongo')
    })
    .catch((error) => {
        logger.error('Error connecting to mongo', error)
    })

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', middleware.authInterceptor, middleware.userExtractor, blogRouter)

app.use(middleware.unknownPath)
app.use(middleware.errorHandler)

module.exports = app
