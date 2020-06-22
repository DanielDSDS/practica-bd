import React, {useEffect, useState} from 'react';
import './Peliculas.css';

const Peliculas = () => {
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        fetchPeliculas();
    }, []);

    const fetchPeliculas = () => {
        fetch("https://practica-bd.herokuapp.com/peliculas/get")
        .then(res => res.json())
        .then(data => setPeliculas(data))
        .catch(err => console.log(err.message))
    }

    return(
        <div className="peliculas-container">
            <form className="peliculas-form">
                <div className="wrapper">
                    <div className="">
                        <input type="text" placeholder="Nombre de pelicula"></input>
                        <select disabled>
                            <option>Estudio</option>
                        </select>
                    </div>
                    <div>
                        <input></input>
                        <input></input>
                    </div>
                </div>
            </form>

            <ul className="peliculas-list">
                {peliculas.map(pelicula => <li key={pelicula.id_pelicula}>{pelicula.titulo}</li>)}
            </ul>
        </div>
    );
}

export default Peliculas;