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

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            return response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person
        .findById(id)
        .then(person => {
            return response.json(person)
        })
        .catch(error => {
            console.log(error.message)
        })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person
        .findByIdAndDelete(id)
        .then(result => {
            return response.status(204).send()
        })
        .catch(error => {
            console.log(error.message)
        })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            "error" : "name or number is missing"
        })
    }

    const newPerson = new Person({
        "name": body.name,
        "number": body.number
    })

    newPerson
        .save()
        .then(savedPerson => {
            return response.status(201).json(savedPerson)
        })
        .catch(error => {
            console.log(error.message)
            return response.status(500).send("Error in saving new person")
        })
})

app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            "error": "name or number is missing"
        })
    }

    Person
        .findByIdAndUpdate(id, {"name": body.name, "number": body.number}, {new: true})
        .then(result => {
            console.log(result)
            return response.status(200).json(result)
        })
        .catch(error => {
            console.log(error.message)
            return response.status(500).send("Error updating person")
        })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is started at port: ${PORT}`)
})
