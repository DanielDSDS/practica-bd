import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';


const ActoresTable = () => {
    const [actores,setActores] = useState([]);
    const [state, setState] = useState({
      columns: [
        { title: 'id', field: 'id_actor' },
        { title: 'Nombre', field: 'nombre_actor' },
        { title: 'Nacionalidad', field: 'nacionalidad'},
      ],
      data: [],
    });
  
    useEffect(() => {
        fetchActores();
    },[])

    const fetchActores = async() => {
        await fetch("/actores/get")
        .then(res => res.json())
        .then(result => setActores(result))
        .catch(err => console.log(err.message))
    
    }

    return (
      <MaterialTable
        title="Actores"
        columns={state.columns}
        data={actores}
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

export default ActoresTable;