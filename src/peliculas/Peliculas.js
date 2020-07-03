import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import './Peliculas.css';
import PeliculasTable from './PeliculasTable';

const Peliculas = () => {
    const [pelicula, setPelicula] = useState("");
    const [estudios, setEstudios] = useState([]);
    const [estudio, setEstudio] = useState("");

    useEffect(() => {
        fetchEstudios();
    }, [pelicula]);

    const fetchEstudios = async() => {
        await fetch("/estudios/get")
        .then(res => res.json()) 
        .then(data => setEstudios(data))
        .catch(err => console.log(err.message))   
    }

    const postPelicula = async(e) => {
        e.preventDefault();
        const body = {pelicula, estudio};
        await fetch("/peliculas/post",{
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
            <PeliculasTable/> 
        </div>
    );
}

export default Peliculas;