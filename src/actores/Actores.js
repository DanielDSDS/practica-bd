import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const Actores = () => {
    const [actores,setActores] = useState([]);
    const [nombre,setNombre] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");

    useEffect(() => {
        fetchActores();
    },[]);

    const fetchActores = async() => {
        await fetch("/actores/get")
        .then( res => res.json())
        .then( result => setActores(result))
        .catch(err => err.message)
    };

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
            <form className="actores-form" onSubmit={postActor}>
                <div className="wrapper">
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
            </form>


            <ul className="actores-list">
                {actores.map(actor => <li key={actor.id_actor}>{actor.nombre_actor}</li>)}
            </ul>
        </div>
    );
}

export default Actores;