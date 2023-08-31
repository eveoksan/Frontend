const Filter = ({ onChange }) => {
    return(
        <div>
            search by name:
            <input onChange={onChange} /> 
        </div>
    )
}

export default Filter