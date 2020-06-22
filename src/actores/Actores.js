import React, {useEffect, useState} from 'react';

const Actores = () => {
    const [actores,setActores] = useState([]);

    useEffect(() => {
        fetchActores();
    },[]);

    const fetchActores = () => {
        fetch("https://practica-bd.herokuapp.com/actores/get")
        .then( res => res.json())
        .then( result => setActores(result))
        .catch(err => err.message)
    };

    return(
        <div className="actores-container">
            <ul className="actores-list">
                {actores.map(actor => <li key={actor.id_actor}>{actor.nombre_actor}</li>)}
            </ul>
        </div>
    );
}

export default Actores;