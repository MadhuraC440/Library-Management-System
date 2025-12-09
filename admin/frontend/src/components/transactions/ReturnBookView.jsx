import React, { useState } from 'react';
import axios from 'axios';

const ReturnBookView = () => {
  const [form, setForm] = useState({
    bookId: '',
    serialNumber: '',
    issuedDate: '',
    returnDate: '',
    remarks: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/transactions/return', form);
      setResult(res.data);
    } catch (err) {
      setResult({ message: err.response?.data?.message || 'Return failed' });
    }
  };

  return (
    <div>
      <h5>Return Book</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        {['bookId', 'serialNumber', 'issuedDate', 'returnDate', 'remarks'].map(field => (
          <div className="col-md-6" key={field}>
            <label className="form-label">{field}</label>
            <input type={field.includes('Date') ? 'date' : 'text'} className="form-control" name={field} value={form[field]} onChange={handleChange} required={field !== 'remarks'} />
          </div>
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-warning">Return</button>
        </div>
      </form>
      {result && <div className="alert alert-info mt-3">{result.message} {result.fine !== undefined && `Fine: ₹${result.fine}`}</div>}
    </div>
  );
};

export default ReturnBookView;