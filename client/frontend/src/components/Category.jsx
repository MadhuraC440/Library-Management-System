import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Category = () => {
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
      <div className="container mt-4">
        <h2 style={{padding:'56px'}}>Category List</h2>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Category</th>
              
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat._id}>
                <td>{index + 1}</td>
                <td>{cat.from}</td>
                <td>{cat.to}</td>
                <td>{cat.category}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;