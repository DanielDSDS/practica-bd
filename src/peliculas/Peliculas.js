import React, {useEffect, useState} from 'react';
import './Peliculas.css';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

const Peliculas = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [pelicula, setPelicula] = useState("");
    const [estudios, setEstudios] = useState([]);
    const [estudio, setEstudio] = useState("");

    useEffect(() => {
        fetchPeliculas();
        fetchEstudios();
    }, []);

    const fetchPeliculas = async() => {
        await fetch("/peliculas/get")
        .then(res => res.json())
        .then(data => setPeliculas(data))
        .catch(err => console.log(err.message))
    }

    const fetchEstudios = async() => {
        await fetch("/estudios/get")
        .then(res => res.json()) 
        .then(data => setEstudios(data))
        .catch(err => console.log(err.message))   
    }

    const postPelicula = (e) => {
        e.preventDefault();
        const body = {pelicula, estudio};
        console.log(body);
        fetch("/peliculas/post",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body)
        })
    }

    const isEstudiosSet = () => estudios===undefined?true:false;
    
    const handleEstudioChange = (e) => {
        setEstudio(e.target.value);
    }

    const handlePeliculaChange = (e) => {
        setPelicula(e.target.value);
    }

    return(
        <div className="peliculas-container">
            <h4 className="center">Insertar una nueva pelicula</h4>
            <form className="peliculas-form" onSubmit={postPelicula}>
                <div className="wrapper">
                    <div className="form-1">
                        <FormControl className="form-control-nombre">
                            <TextField 
                                className="nombre-pelicula" 
                                type="text" 
                                label="Nombre" 
                                value={pelicula}
                                onChange={handlePeliculaChange}
                                onBlur={handlePeliculaChange}
                            >
                            </TextField>    
                        </FormControl>
                        <FormControl className="form-control-select">
                            <InputLabel id="select-estudio-label">Estudio</InputLabel>
                                <Select
                                labelId="select-estudio-label"
                                id="select-estudio"
                                value={estudio}
                                onChange={handleEstudioChange}
                                onBlur={handleEstudioChange}
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
                    <Button 
                        variant="contained" 
                        color="default" 
                        type="submit"
                        disableElevation
                    >
                        Insertar pelicula
                    </Button>
                </div>
            </form>

            <ul className="peliculas-list">
                {peliculas.map(pelicula => <li key={pelicula.id_pelicula}>{pelicula.titulo}</li>)}
            </ul>
        </div>
    );
}

export default Peliculas;