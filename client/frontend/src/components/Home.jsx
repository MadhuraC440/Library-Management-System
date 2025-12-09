import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/category/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-2 d-flex justify-content-end" style={{ padding: '56px' }}>
        <NavLink to="/" className="btn btn-sm btn-secondary">
          Back
        </NavLink>
      </div>

      <div className="container mt-4" >
        <div className="d-flex justify-content-between">
          <NavLink to="/report" className="btn btn-outline-success" activeclassname="active">
            Report
          </NavLink>
          <NavLink to="/transactions" className="btn btn-outline-warning" activeclassname="active">
            Transactions
          </NavLink>
        </div>
      </div>

      <h1 className="text-center">Product Details</h1>

      <div className="container mt-4">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.from}</td>
                <td>{cat.to}</td>
                <td>{cat.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container mt-5 d-flex justify-content-end">
        <NavLink to="/logout" className="btn btn-danger">
          Logout
        </NavLink>
      </div>
    </>
  );
};

export default Home;