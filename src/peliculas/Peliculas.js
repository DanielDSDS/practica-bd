import React, {useState} from 'react';

const Peliculas = () => {
    const [peliculas, setPeliculas] = useState("");

    const getPeliculas = async(e) => {
        e.preventDefault();
        try{
            const body = {peliculas};
            const response = await fetch("http://localhost:5000/peliculas/list",{
                method:"GET",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })
            console.log(response);
        }catch(err){
            console.error(err);
        }
    }

    return(
        <div>
            <div class="center">bruv momento</div>
            <div>
                <button onClick={getPeliculas}>Peliculas</button>
            </div>
        </div>

    );
}

export default Peliculas;