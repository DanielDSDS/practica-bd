import React, {useState,useEffect} from 'react';

const Estudios = () => {
    const [estudios,setEstudios] = useState([]);

    useEffect(() => {
        fetchEstudios();
    }, [])

    const fetchEstudios = () => {
        fetch("https://practica-bd.herokuapp.com/estudios/get")
        .then(res => res.json())
        .then(result => setEstudios(result))
        .catch(err => err.message)
    }

    return(
        <div className="estudios-container">
            <ul className="estudios-list">
                {estudios.map(estudio => <li key={estudio.id_estudio}>{estudio.nombre_estudio}</li>)}
            </ul>
        </div>
    );

}

export default Estudios;