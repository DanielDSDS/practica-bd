import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const Clientes = () => {
    const [clientes,setClientes] = useState([]);
    const[nombre,setNombre] = useState("");
    const[cedula,setCedula] = useState("");
    const[direccion,setDireccion] = useState("");
    const[telefono,setTelefono] = useState("");

    useEffect(() => {
        fetchClientes();
    }, [])

    const fetchClientes = () => {
        fetch("/clientes/get")
        .then(res => res.json())
        .then(result => setClientes(result))
        .catch(err => err.message)
    }

    const postCliente = async(e) => {
        e.preventDefault();
        const body = {nombre,cedula,direccion,telefono};
        await fetch("/clientes/post",{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(body)
        })
    }

    return(
        <div className="clientes-container">
            <div>
                <form onSubmit={postCliente} className="actores-form">
                    <div className="wrapper">
                        <FormControl class="form-control-nombre">
                            <TextField
                                type="text"
                                onChange={e => setNombre(e.target.value)}
                                placeholder="Nombre de Cliente"
                            >
                            </TextField>  
                        </FormControl>
                        <FormControl className="form-control-cedula">
                            <TextField
                                type="text"
                                onChange={e => setCedula(e.target.value)}
                                placeholder="Cedula de cliente"
                            >
                            </TextField>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl className="form-control-direccion">
                            <TextField
                                type="text"
                                onChange={e => setDireccion(e.target.value)}
                                placeholder="Direccion del cliente"
                            >
                            </TextField>    
                        </FormControl>    
                        <FormControl className="form-control-telefono">
                            <TextField
                                type="text" 
                                onChange={e => setTelefono(e.target.value)}
                                placeholder="Numero de telefono del cliente"
                            >
                            </TextField>
                        </FormControl>    
                    </div>
                    <Button 
                        variant="contained"
                        color="default"
                        type="submit"
                        disableElevation
                    >
                        Insertar cliente
                    </Button>
                </form>
            </div>
            <ul className="clientes-list">
                {clientes.map(cliente => <li key={cliente.id_cliente}>{cliente.nombre_cliente}</li>)}
            </ul>
        </div>
    );

}

export default Clientes;