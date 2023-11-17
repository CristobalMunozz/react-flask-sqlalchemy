import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
   <div class="container-fluid">
        <Link className="nav-link" to="/App">FORMULARIO REACT</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
          <li class="nav-item">

            <Link className="nav-link" to="/App">Registrar Datos</Link>

           </li>
            <li class="nav-item">

              <Link className="nav-link" to="/Reporteria">Reporteria</Link>

            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
