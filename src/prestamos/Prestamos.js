import React, {useState, useEffect} from 'react';

const Prestamos = () => {
    const [prestamos,setPrestamos] = useState([]);

    useEffect(() => {
        fetchPrestamos();
    },[]);

    const fetchPrestamos = () => {
        fetch("https://practica-bd.herokuapp.com/prestamos/get")
        .then(res => res.json())
        .then(result => setPrestamos(result))
        .catch(err => err.message)
    }

    return(
        <div className="prestamos-container">
            <ul className="prestamos-list">
                {prestamos.map(prestamo => <li key={prestamo.id_cliente + prestamo.fec_prestamo}>{prestamo.id_pelicula}</li>)}
            </ul>
        </div>
    );

}

export default Prestamos;