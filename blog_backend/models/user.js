const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        unique: true // this ensures the uniqueness of username
    },
     name: String,
     password: {
        type: String,
        required: true,
        minLength: 3
     },
     blogs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog'
        }
      ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = document._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        delete returnedObj.password
    }
})

module.exports = mongoose.model('User', userSchema)