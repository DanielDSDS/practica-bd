import React, {useState, useEffect} from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button} from '@material-ui/core';
import './Prestamos.css';

const Prestamos = () => {
    const [prestamos,setPrestamos] = useState([]);
    const [cliente,setCliente] = useState("");
    const [clientes,setClientes] = useState([]);
    const [pelicula,setPelicula] = useState("");
    const [status, setStatus] = useState("");
    const [peliculas,setPeliculas] = useState([]);
    const [devolucion,setDevolucion] = useState("");
    const [dias,setDias] = useState("");
    const estados = ["AT","VI","CR","CD"];

    useEffect(() => {
        fetchPrestamos();
        fetchClientes();
        fetchPeliculas();
    },[]);

    const fetchPrestamos = async() => {
        await fetch("/prestamos/get")
        .then(res => res.json())
        .then(result => setPrestamos(result))
        .catch(err => console.log(err.message))
    }

    const fetchClientes = async() => {
        await fetch("/clientes/get")
        .then(res => res.json())
        .then(result => setClientes(result))
        .catch(err => console.log(err.message))
    }

    const fetchPeliculas = async() => {
        await fetch("/peliculas/get")
        .then(res => res.json())
        .then(result => setPeliculas(result))
        .catch(err => console.log(err.message))
    }

    const postPrestamo = async(e) => {
        e.preventDefault();
        const body = {cliente,pelicula,status,devolucion,dias};
        await fetch("/prestamos",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(body)
        })
    }

    return(
        <div className="prestamos-container">
            <h4 className="center">Insertar un nuevo prestamo</h4>
            <form onSubmit={postPrestamo}>
                <div className="wrapper">
                    <div className="form-1">
                        <FormControl className="form-control-clientes">
                            <InputLabel id="clientes-label">Clientes</InputLabel>
                            <Select
                                labelId="clientes-label"
                                label="Clientes"
                                value={cliente}
                                onChange={e => setCliente(e.target.value)}
                                onBlur={e => setCliente(e.target.value)}
                            >
                                {cliente===undefined
                                    ?<MenuItem value="">Clientes</MenuItem>
                                    :clientes.map(item => <MenuItem 
                                        key={item.num_cliente} 
                                        value={item.num_cliente}
                                        name={item.nombre_cliente}
                                        >
                                            {item.nombre_cliente}
                                        </MenuItem>)
                                }       
                            </Select>
                        </FormControl>
                        <FormControl className="form-control-peliculas">
                            <InputLabel id="peliculas-label">Pelicula</InputLabel>
                                <Select
                                    labelId="peliculas-label"
                                    label="Peliculas"
                                    value={pelicula}
                                    onChange={e => setPelicula(e.target.value)}
                                    onBlur={e => setPelicula(e.target.value)}
                                >
                                    {pelicula===undefined
                                        ?<MenuItem value="">Peliculas</MenuItem>
                                        :peliculas.map(item => <MenuItem 
                                            key={item.id_pelicula} 
                                            value={item.id_pelicula}
                                            name={item.titulo}
                                            >
                                                {item.titulo}
                                            </MenuItem>)
                                    }       
                                </Select>
                        </FormControl>
                        <FormControl className="form-control-status">
                            <InputLabel id="status-label">
                                <Select
                                    labelId="status-label"
                                    label="Status"
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                    onBlur={e => setStatus(e.target.value)}
                                >
                                    {status===undefined
                                        ?<MenuItem value="">Status</MenuItem>
                                        :estados.map((item,i) => <MenuItem 
                                                key={item[i]} 
                                                value={item[i]}
                                                name={item[i]}
                                                >
                                                    {item[i]}
                                                </MenuItem>)  
                                    }                            
                                </Select>
                            </InputLabel>
                        </FormControl>
                    </div>
                    <div className="form-2">
                        <FormControl className="form-control-devolucion">
                            <TextField
                                type="text"
                                placeholder="Fecha de Devolucion"
                                onChange={e => setDevolucion(e.target.value)}
                                onBlur={e => setDevolucion(e.target.value)}
                                value={devolucion}
                            >
                            </TextField>
                        </FormControl>
                        <FormControl className="form-control-dias">
                            <TextField
                                type="text"
                                placeholder="Dias de prestamo"
                                onChange={e => setDias(e.target.value)}
                                onBlur={e => setDias(e.target.value)}
                                value={dias}
                            >
                            </TextField>
                        </FormControl>
                    </div>
                </div>
                <Button
                    type="submit"
                    color="default"
                    variant="contained"
                    disableElevation
                >Crear nuevo prestamo
                </Button>
            </form>
            
            <ul className="prestamos-list">
                {prestamos.map(prestamo => <li 
                    key={prestamo.num_cliente + prestamo.fec_prestamo + prestamo.id_pelicula}
                    >
                        {prestamo.id_pelicula}
                    </li>)
                }
            </ul>
        </div>
    );

}

export default Prestamos;