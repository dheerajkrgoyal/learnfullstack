const express = require("express")
const morgan = require("morgan")

const app = express()

morgan.token('request-body', (request, response)=>{
    return JSON.stringify(request.body)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const personCount = persons.length
    return response.send(`<p>Phonebook has info for ${personCount} people</p>
                <p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
    return response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if(person){
        return response.json(person)
    }
    return response.status(404).send(`Person with ${id} not found`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if(person){
        persons = persons.filter(p => p.id !== id)
        return response.status(204).send()
    }
    return response.status(404).send(`Person with ${id} not found`)
})

const generateId = () => {
    const min = 5;
    const max = 100;
    return String(Math.floor(Math.random() * (max-min+1) + min))
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number){
        return response.status(400).json({
            "error" : "name or number is missing"
        })
    }

    const duplicate = persons.find(p => p.name == body.name)
    if(duplicate){
        return response.status(400).json({
            "error": "name already exist"
        })
    }

    const newPerson = {...body, id: generateId()}
    console.log(newPerson)
    persons = persons.concat(newPerson)
    return response.status(201).json(newPerson)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is started at port: ${PORT}`)
})
