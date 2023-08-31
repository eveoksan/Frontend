import InputField from "./InputField"

const AddNew = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return(
        <form onSubmit={onSubmit}>
            <InputField
                label="name:"
                type="text"
                value={newName}
                onChange={handleNameChange}
            />
            <InputField
                label="number:"
                type="text"
                value={newNumber}
                onChange={handleNumberChange}
            />
            <button type="submit">add</button>
        </form>
    )
}

export default AddNew