const InputField = ({ label, type, value, onChange }) => {
    return(
        <div>
            <label className="label">
                {label}
            </label>
            <input 
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputField