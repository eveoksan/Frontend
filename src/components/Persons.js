import Person from "./Person"

const Persons = ({ filter1,removeName }) => {
    return(
        <div>
            {filter1.map(name => 
                <Person key={name.id} person={name} number={name.number} removeName={removeName} />
            )}
        </div>
    )
}

export default Persons