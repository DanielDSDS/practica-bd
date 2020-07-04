import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';

const PeliculasTable = () => {
    const [peliculas,setPeliculas] = useState([]);
    const [state, setState] = useState({
      columns: [
        { title: 'id', field: 'id_pelicula' },
        { title: 'Estudio', field: 'id_estudio' },
        { title: 'Titulo', field: 'titulo'},
        { title: 'Inclusion', field: 'fec_inclusion'},
        { title: 'Desincorporacion', field: 'fec_desincorporacion'},
      ],
      data: [],
    });
  
    useEffect(() => {
        fetchActores();
    },[])

    const fetchActores = async() => {
        await fetch("/peliculas/get")
        .then(res => res.json())
        .then(result => setPeliculas(result))
        .catch(err => console.log(err.message))
    }

    const deletePeliculas = async(id_pelicula) => {
        console.log(id_pelicula);
        await fetch(`/peliculas/${id_pelicula}`,{
            method:"DELETE",
            headers: {"Content-type":"application/json"}
        })
        .then(res => res.json())
        .then(result => console.log(result))
        .catch(err => console.log(err.message))
    }

    return (
      <MaterialTable
        title="Peliculas"
        columns={state.columns}
        data={peliculas}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              deletePeliculas(oldData.id_pelicula);
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    );
  }

export default PeliculasTable;