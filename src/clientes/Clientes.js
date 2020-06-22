import React, {useEffect, useState} from 'react';

const Clientes = () => {
    const [clientes,setClientes] = useState([]);

    useEffect(() => {
        fetchClientes();
    }, [])

    const fetchClientes = () => {
        fetch("https://practica-bd.herokuapp.com/clientes/get")
        .then(res => res.json())
        .then(result => setClientes(result))
        .catch(err => err.message)
    }

    return(
        <div className="clientes-container">
            <ul className="clientes-list">
                {clientes.map(cliente => <li key={cliente.id_cliente}>{cliente.nombre_cliente}</li>)}
            </ul>
        </div>
    );

}

export default Clientes;