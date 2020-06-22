import './App.css';

import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

import Prestamos from './prestamos/Prestamos';
import Peliculas from './peliculas/Peliculas';
import Estudios from './estudios/Estudios';
import Clientes from './clientes/Clientes';
import Actores from './actores/Actores';
import Landing from './landing/Landing';

//  "start": "serve -s build",

const App = () => {

    return(
        <Router>
            <div className="header">
                <h6 className="center">Daniel Di Mella</h6>
                <h1 className="landing-header">practica 2</h1>
                <h6 className="center">Carlos Rojas</h6>
            </div>
            <div>
                <div className="landing-nav">
                    <Link to={'/'} >Landing</Link>
                    <Link to={'/peliculas'} >Peliculas</Link>
                    <Link to={'/actores'} >Actores</Link>
                    <Link to={'/estudios'} >Estudios</Link>
                    <Link to={'/clientes'} >Clientes</Link>
                    <Link to={'/prestamos'} >Prestamos</Link>
                </div>
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route path='/peliculas' component={Peliculas}/>
                    <Route path='/actores' component={Actores}/>
                    <Route path='/estudios' component={Estudios}/>
                    <Route path='/clientes' component={Clientes}/>
                    <Route path="/prestamos" component={Prestamos}/>
                </Switch>
            </div>
        </Router>
    )

}


export default App;
