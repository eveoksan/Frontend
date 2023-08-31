const Person = ({ person, removeName }) => {
    return (
      <p>
        {person.name} {person.number}
        {" "}
        <button onClick={() => removeName(person.id)}>delete</button>
      </p>
    )
  }
  
  export default Person