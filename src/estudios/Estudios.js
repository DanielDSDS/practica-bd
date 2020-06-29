import React, {useState,useEffect} from 'react';
import {FormControl, Button, TextField } from '@material-ui/core';
import './Estudios.css';

const Estudios = () => {
    const [estudios,setEstudios] = useState([]);
    const [estudio,setEstudio] = useState("");
    const [pais,setPais] = useState("");

    useEffect(() => {
        fetchEstudios();
    }, [])

    const fetchEstudios = () => {
        fetch("/estudios/get")
        .then(res => res.json())
        .then(result => setEstudios(result))
        .catch(err => err.message)
    }

    const postEstudio = (e) => {
        e.preventDefault();
        const body = {estudio, pais};
        fetch("/estudios",{
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify(body)
        })
    }

    return(
        <div className="estudios-container">
            <h4 className="center">Inserte un nuevo estudio</h4>
            <form className="estudios-form" onSubmit={postEstudio}>
                <div className="wrapper">
                    <div className="form-1">
                        <FormControl className="form-control-nombre">
                            <TextField
                                type="text"
                                placeholder="Nombre del Estudio"
                                onChange={e => setEstudio(e.target.value)}
                            >
                            </TextField>
                        </FormControl>
                        <FormControl className="form-control-nacionalidad">
                            <TextField
                                type="text"
                                placeholder="Pais al que pertenece"
                                onChange={e => setPais(e.target.value)}
                            >
                            </TextField>
                        </FormControl>
                    </div>
                    <div className="form-2"></div>
                    <Button
                        variant="contained"
                        color="default"
                        type="submit"
                        disableElevation
                    >Insertar Estudio
                    </Button>
                </div>
            </form>
            <ul className="estudios-list">
                {estudios.map(estudio => <li key={estudio.id_estudio}>{estudio.nombre_estudio}</li>)}
            </ul>
        </div>
    );

}

export default Estudios;