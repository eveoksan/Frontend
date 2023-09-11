import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddNew from './components/AddNew.js'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons,     setPersons]     = useState([]) 
  const [newName,     setNewName]     = useState('')
  const [newNumber,   setNewNumber]   = useState('')
  const [searchName,  setSearchName]  = useState('')
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll(Persons)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if (personObject.name.length < 3) {
      setMessage(`error: Name's minimum allowed legth is 3`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }
    if (personObject.number.length < 8) {
      setMessage(`error: Number's minimum length is 8`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    }
    if (persons.some((person) => person.name === newName)) {
      const person = persons.find((p) => p.name === newName);
      const { id } = person;
      const confirmChange = window.confirm(`${newName} is already added in the phonebook, replace the old number with a new one?`)
   
      if (confirmChange) {
      personService
      .update(person.id, personObject)
      .then((response) => {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
      })
      .catch(error => {
        alert(
          `error: Information of ${newName} has already been removed from server`
        )
        setPersons(persons.filter(n => n.id !== id))
      })
      .then(() => {
        setMessage(
          `Information of '${newName}' was successfully updated`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      setNewName('')
      setNewNumber('')
      return;
    }
  }
    else {
      setPersons(persons.concat(personObject))
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
      .then(() => {
        setMessage(
          `Added '${newName}' to the phonebook`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const removeName = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Want to delete ${person.name}?`);
    if (confirmDelete) {
      personService
      .remove(id)
      .then(() => {
        const addition = persons.filter((person) => person.id !== id);
        setPersons(addition);
      })
      .then(() => {
        setMessage(
          `Removed '${person.name}' from phonebook`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  } 
  

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setSearchName(event.target.value)
  }

  const filter1 = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <Notification message={message} />
      </div>

      <Filter 
        onChange={handleFilter} 
      />

      <h2>Add new</h2>

      <AddNew
        onSubmit={addName}
        newName={newName}
        handleNameChange={handleNoteChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        filter1={filter1}
        persons={persons}
        removeName={removeName}
      />

    </div>
  )
  
}


export default App