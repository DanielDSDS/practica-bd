import React, {useState} from 'react';

const Peliculas = () => {
    const [peliculas, setPeliculas] = useState("");

    const getPeliculas = async(e) => {
        e.preventDefault();
        try{
            const body = {peliculas};
            const response = await fetch("https://practica-bd.herokuapp.com/peliculas/list",{
                method:"GET",
                headers : {"Content-Type":"application/json"}
            })
            .then((a) => {
                console.log(a.json());
            })
            console.log(response);
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div>
            <div class="center mb-3">bruv momento</div>
            <div>
                <button class="center" onClick={getPeliculas}>Peliculas (revisar logs)</button>
            </div>
        </div>

    );
}

export default Peliculas;