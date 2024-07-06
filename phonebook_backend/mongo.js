const mongoose = require("mongoose")

if(process.argv.length < 3){
    console.log("Necessary arguments are not provided")
    process.exit(1)
}

const password = process.argv[2]

const mongoURL = `mongodb+srv://dheerajkrgoyal:${password}@fullstackopen.b2s9b4m.mongodb.net/?retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.set('strictQuery',false)

mongoose.connect(mongoURL)

console.log("mongo connection established")

const personSchema = new mongoose.Schema({
    "name": String,
    "number": String
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

if(name){
    const person = new Person({
        "name": name,
        "number": number
    })

    person
        .save()
        .then((response) => {
            console.log("person is saved")
            mongoose.connection.close()
        })
}

else{
    Person
        .find({})
        .then((response) => {
            response.forEach(person => {
                console.log(person)
            })

            mongoose.connection.close()
        })
}