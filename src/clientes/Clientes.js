import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import './Clientes.css';

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
            <h4 className="center">Insertar un nuevo cliente</h4>
                <form className="clientes-form" onSubmit={postCliente} >
                    <div className="wrapper">
                        <div className="form-1">
                            <FormControl class="form-control-nombrec">
                                <TextField
                                    type="text"
                                    placeholder="Nombre de Cliente"
                                    onChange={e => setNombre(e.target.value)}
                                >
                                </TextField>  
                            </FormControl>
                            <FormControl className="form-control-cedula">
                                <TextField
                                    type="text"
                                    placeholder="Cedula de cliente"
                                    onChange={e => setCedula(e.target.value)}
                                >
                                </TextField>
                            </FormControl>
                        </div>
                        <div className="form-2">
                            <FormControl className="form-control-direccion">
                                <TextField
                                    type="text"
                                    placeholder="Direccion del cliente"
                                    onChange={e => setDireccion(e.target.value)}
                                >
                                </TextField>    
                            </FormControl>    
                            <FormControl className="form-control-telefono">
                                <TextField
                                    type="text" 
                                    placeholder="Numero de telefono del cliente"
                                    onChange={e => setTelefono(e.target.value)}
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
                    </div>
                </form>
            <ul className="clientes-list">
                {clientes.map(cliente => <li key={cliente.id_cliente}>{cliente.nombre_cliente}</li>)}
            </ul>
        </div>
    );

}

export default Clientes;