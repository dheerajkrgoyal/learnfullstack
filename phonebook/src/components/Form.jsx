const Form = ({addNew, newName, handleNewName, newNumber, handleNewNumber}) => {
    return (
        <form onSubmit = {addNew}>
        <div>
          Name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNewNumber}></input>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}

export default Form