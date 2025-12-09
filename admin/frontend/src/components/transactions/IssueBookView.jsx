import React, { useState } from 'react';
import axios from 'axios';

const IssueBookView = () => {
  const [form, setForm] = useState({
    bookId: '',
    serialNumber: '',
    bookName: '',
    authorName: '',
    issueDate: '',
    returnDate: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/transactions/issue', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Issue failed');
    }
  };

  return (
    <div>
      <h5>Issue Book</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        {['bookId', 'serialNumber', 'bookName', 'authorName', 'issueDate', 'returnDate'].map(field => (
          <div className="col-md-6" key={field}>
            <label className="form-label">{field}</label>
            <input type={field.includes('Date') ? 'date' : 'text'} className="form-control" name={field} value={form[field]} onChange={handleChange} required />
          </div>
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-success">Issue</button>
        </div>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default IssueBookView;