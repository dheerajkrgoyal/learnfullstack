import { useState } from "react"
import Search from "./components/Search"
import Form from "./components/Form"
import Persons from "./components/Persons"
import { useEffect } from "react"
import personService from "./services/PersonService"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const [notificationMessage, setNotificationMessage] = useState(null) 
  const [notificationClass, setNotificationClass] = useState("positive")

  const resetNotification = () => {
    setNotificationMessage(null)
  }

  const sendNotification = (message, className) => {
    setNotificationMessage(message)
    setNotificationClass(className)
    setTimeout(resetNotification, 4000)
  }

  const addNew = (event) => {
    event.preventDefault()

    const duplicate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if(!duplicate){
      
      const newObj = {
        "name": newName,
        "number": newNumber
      }

      personService
        .create(newObj)
        .then((person) => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          sendNotification('New Person is added', 'positive')
        })
        .catch(() => {
          sendNotification('Error in adding new person', 'negative')
        })
    }
    else{
      if(confirm(`${newName} is already added in phonebook, replace the old number with a new one?`)){
        const updateObj = {...duplicate, number: newNumber}
        personService
          .update(duplicate.id, updateObj)
          .then((updatedPerson)=> {
            setPersons(persons.map(person => person.id !== duplicate.id? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            sendNotification('Person has been updated', 'positive')
          })
          .catch(() => {
            sendNotification('Error in updating person', 'negative')
          })
      }
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value)
    
  }

  const fetchPersonFromServer = () => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons)
      })
      .catch(() => {
        sendNotification('Error in fetching data from server', 'negative')
      })
  }

  useEffect(fetchPersonFromServer, [])

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if(confirm(`Delete ${personToDelete.name}`)){
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== personToDelete.id))
        sendNotification('Deleted person successfully', 'positive')
      })
      .catch(() => {
        sendNotification('Error in deleting person', 'negative')
      })
    }
  }

  return (
    <div>

      <Notification notificationMessage={notificationMessage} notificationClass={notificationClass}/>

      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>

      <h2>Add New</h2>
      <Form addNew={addNew} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h2>Details</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
