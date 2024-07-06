const Person = ({name, number, handleDelete}) => {
    return (
        <div>
            <p>{name} {number} <button onClick={handleDelete}>Delete</button></p>
        </div>
    )
}


const Persons = ({filteredPersons, handleDelete}) => {
    return (
        <div>
            {filteredPersons.map(person => <Person key={person.id} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)}/>)}
        </div>
    )
}

export default Persons