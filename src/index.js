import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import App from './App';
import './index.css';
import Dashboard from './components/Dashboard';
import MyComics from './components/MyComics';
import FavouriteComics from './components/FavouriteComics';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Router style={{ cursor: 'pointer' }}>
      <div>
        <nav>
          <ul className="navBar">
            <div>
              <a target="_blank" href="https://www.marvel.com/">
                <img 
                  className="logo-marvel"
                  src="https://1000marcas.net/wp-content/uploads/2021/07/Marvel-Comics-Logo-1990.png" 
                  alt="Página oficial de Marvel"
                />
              </a>
            </div>
            <li className="nav-item">
              <Link to="/Dashboard" className="nav-opt">Estadisticas</Link>
            </li>
            <li className="nav-item">
              <Link to="/comic-search" className="nav-opt">Buscador de comics</Link>
            </li>
            <li className="nav-item">
              <Link to="/my-comics" className="nav-opt">Mis comics</Link>
            </li>
            <li className="nav-item">
              <Link to="/favourite-comics" className="nav-opt">Comics favoritos</Link>
            </li>
            <div>
              <select 
                style={{ backgroundColor: 'grey', color: 'white', margin: '20px' }}
                // onchange={this.handleSelectLang}
              >
                <option>Español</option>
                <option>English</option>
              </select>
            </div>
          </ul>
        </nav>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/comic-search">
            <App  />
          </Route>
          <Route path="/my-comics">
            <MyComics  />
          </Route>
          <Route path="/favourite-comics">
            <FavouriteComics  />
          </Route>
        </Switch>
      </div>
    </Router>
);
