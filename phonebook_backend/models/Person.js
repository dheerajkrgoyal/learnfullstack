const mongoose = require("mongoose")

const mongoUrl = process.env.MONGODB_URL
console.log("application connecting to mongo... ", mongoUrl)
mongoose.set("strictQuery", false)

mongoose.connect(mongoUrl)
    .then(result => {
        console.log("mongodb connection established")
    })
    .catch(error => {
        console.log("error connecting to mongodb: ", error.message)
    })


const personSchema = new mongoose.Schema({
    "name": String,
    "number" : String
})

personSchema.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = document._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model("Person", personSchema)