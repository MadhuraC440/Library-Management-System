import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Library Management System
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) =>`nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/categories" className={({ isActive }) =>`nav-link ${isActive ? 'active' : ''}`}>
                Categories
              </NavLink>
            </li>
          </ul>
          <span className="navbar-text">
             Welcome to the Library Management System
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;