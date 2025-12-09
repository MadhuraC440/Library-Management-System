import React, { useState } from 'react';
import axios from 'axios';

const PayFineView = () => {
  const [form, setForm] = useState({
    serialNumber: '',
    actualReturnDate: '',
    fine: '',
    finePaid: false,
    remarks: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/transactions/fine', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Fine update failed');
    }
  };

  return (
    <div>
      <h5>Pay Fine</h5>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Serial Number</label>
          <input type="text" className="form-control" name="serialNumber" value={form.serialNumber} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Actual Return Date</label>
          <input type="date" className="form-control" name="actualReturnDate" value={form.actualReturnDate} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Fine Amount</label>
          <input type="number" className="form-control" name="fine" value={form.fine} onChange={handleChange} required />
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" name="finePaid" checked={form.finePaid} onChange={handleChange} />
            <label className="form-check-label">Fine Paid</label>
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Remarks</label>
          <input type="text" className="form-control" name="remarks" value={form.remarks} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-danger">Submit Fine</button>
        </div>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default PayFineView;