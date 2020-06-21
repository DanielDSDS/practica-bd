import React, {useEffect, useState} from 'react';
import './Peliculas.css';

const Peliculas = () => {
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        fetchPeliculas();
    }, []);

    const fetchPeliculas = () => {
        fetch("https://practica-bd.herokuapp.com/peliculas/list")
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
                        <select placeholder="Estudio">
                        </select>
                    </div>
                    <div className="" >
                        <input></input>
                        <input></input>
                    </div>
                </div>
            </form>

            <div className="peliculas-list">
                {peliculas.map(pelicula => 
                    <div key={pelicula.id_pelicula}>
                    </div>)}
            </div>
        </div>
    );
}

export default Peliculas;