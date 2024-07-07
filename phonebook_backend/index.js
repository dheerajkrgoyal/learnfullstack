const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require('dotenv').config()
const Person = require("./models/Person")

const app = express()

morgan.token('request-body', (request, response)=>{
    return JSON.stringify(request.body)
})

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))


app.get('/info', (request, response) => {
    const personCount = persons.length
    return response.send(`<p>Phonebook has info for ${personCount} people</p>
                <p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(persons => {
            return response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person
        .findById(id)
        .then(person => {
            if(person){
                return response.json(person)
            }
            else{
                return response.status.send(`person with ${id} not found`)
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person
        .findByIdAndDelete(id)
        .then(result => {
            if(result){
                return response.status(204).send()
            }
            else{
                return response.status(404).send(`person with ${id} not found`)
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const newPerson = new Person({
        "name": body.name,
        "number": body.number
    })

    newPerson
        .save()
        .then(savedPerson => {
            return response.status(201).json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body

    Person
        .findByIdAndUpdate(id, {"name": body.name, "number": body.number}, {new: true, runValidators: true, context:"query"})
        .then(result => {
            if(result){
                return response.status(200).json(result)
            }
            else{
                return response.status(404).send(`person with ${id} not found`)
            }
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.log(error)

    if(error.name === "CastError"){
        return response.status(400).send("malformed id")
    }
    else if(error.name == "ValidationError"){
        return response.status(400).send(error.message)
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is started at port: ${PORT}`)
})