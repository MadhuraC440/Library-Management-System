import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Logout = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="border rounded p-5 shadow text-center" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="text-success mb-4">You have successfully logged out</h4>
        <NavLink to="/" className="btn btn-primary">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Logout;