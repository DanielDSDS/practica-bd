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

    const deleteActor = async(id_actor) => {
        console.log(id_actor);
        await fetch("/actores/delete",{
            method:"DELETE",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify({id_actor : id_actor})
        })
        .then(res => res.json)
        .then(result => console.log(result))
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
                deleteActor(oldData.id_actor);
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