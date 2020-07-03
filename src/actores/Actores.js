import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import './Actores.css';
import ActoresTable from './ActoresTable';

const Actores = () => {
    const [actores,setActores] = useState([]);
    const [nombre,setNombre] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");

    const nameHandler = (e) => {
        setNombre(e.target.value);
    };

    const nacionalidadHandler = (e) => {
        setNacionalidad(e.target.value);
    };

    const postActor = async(e) => {
        e.preventDefault();
        const body = {nombre, nacionalidad};
        await fetch("/actores/post",{
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(body)
        })
    };

    return(
        <div className="actores-container">
            <h4 className="center">Insertar un nuevo actor</h4>
            <form className="actores-form" onSubmit={postActor}>
                <div className="wrapper">                 
                    <div className="form-1">
                        <FormControl className="form-control-name">
                            <TextField 
                                type="text" 
                                placeholder="Nombre de Actor"
                                onChange={nameHandler}
                            >
                            </TextField>
                        </FormControl>
                        <FormControl className="form-control-nacionalidad">
                            <TextField 
                                type="text"
                                placeholder="Nacionalidad de Actor"
                                onChange={nacionalidadHandler}
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
                        Insertar actor
                    </Button>
                </div>
            </form> 
            <ul className="actores-list">
                {actores.map(actor => <li key={actor.id_actor}>{actor.nombre_actor}</li>)}
            </ul>
            <ActoresTable/>
        </div>
    );
}

export default Actores;