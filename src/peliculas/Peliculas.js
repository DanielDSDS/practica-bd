import React, {useEffect, useState} from 'react';
import './Peliculas.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const Peliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [estudios, setEstudios] = useState([]);
    const [estudio, setEstudio] = useState("");

    useEffect(() => {
        fetchPeliculas();
        fetchEstudios();
    }, []);

    const fetchPeliculas = () => {
        fetch("https://practica-bd.herokuapp.com/peliculas/get")
        .then(res => res.json())
        .then(data => setPeliculas(data))
        .catch(err => console.log(err.message))
    }

    const fetchEstudios = () => {
        fetch("https://practica-bd.herokuapp.com/estudios/get")
        .then(res => res.json())
        .then(data => setEstudios(data))
        .catch(err => console.log(err.message))   
    }

    const isEstudiosSet = () => estudios===undefined?true:false;
    
    const handleEstudioChange = (e) => {
        setEstudio(e.target.value);
    }

    return(
        <div className="peliculas-container">
            <form className="peliculas-form">
                <div className="wrapper">
                    <div className="form-1">
                        <FormControl className="form-control-nombre">
                            <TextField className="nombre-pelicula" type="text" label="Nombre"></TextField>    
                        </FormControl>
                        <FormControl className="form-control-select">
                            <InputLabel id="select-estudio-label">Estudio</InputLabel>
                                <Select
                                labelId="select-estudio-label"
                                id="select-estudio"
                                value={estudio}
                                onChange={handleEstudioChange}
                                disabled={isEstudiosSet()}
                                >
                                {estudios===undefined
                                    ?<MenuItem value="">Estudio</MenuItem>
                                    :estudios.map((estudio) => 
                                        <MenuItem 
                                        key={estudio.id_estudio}
                                        value={estudio.id_estudio}
                                        >
                                            {estudio.nombre_estudio}
                                        </MenuItem>)
                                }
                                </Select>
                        </FormControl>
                    </div>
                    <div className="form-2">
                        <FormControl className="form-control-fecha">
                            <TextField type="text" label="Fecha"></TextField>
                            <TextField type="text" label="Fecha 2"></TextField>
                        </FormControl>
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