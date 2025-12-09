import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Transactions = () => {
  const [activeSection, setActiveSection] = useState(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'availability':
        return <div className="alert alert-primary">📚 Checking if the book is available...</div>;
      case 'issue':
        return <div className="alert alert-success">📝 Issue book form or logic goes here.</div>;
      case 'return':
        return <div className="alert alert-warning">📦 Return book process displayed here.</div>;
      case 'fine':
        return <div className="alert alert-danger">💰 Fine payment options shown here.</div>;
      default:
        return <div className="text-muted">Select a transaction from the sidebar.</div>;
    }
  };

  return (
    <>
      <div className="container mt-2 d-flex justify-content-end" style={{ padding: '56px' }}>
        <button className="btn btn-sm btn-secondary" onClick={() => setActiveSection(null)}>
          Home
        </button>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3 border-end">
            <div className="d-flex flex-column gap-3">
              <button onClick={() => setActiveSection('availability')} className="btn btn-outline-primary">
                Is Book Available?
              </button>
              <button onClick={() => setActiveSection('issue')} className="btn btn-outline-success">
                Issue Book
              </button>
              <button onClick={() => setActiveSection('return')} className="btn btn-outline-warning">
                Return Book
              </button>
              <button onClick={() => setActiveSection('fine')} className="btn btn-outline-danger">
                Pay Fine
              </button>
            </div>
          </div>

          
          <div className="col-md-9">
            <h2 className="mb-4">Transactions</h2>
            {renderSection()}
          </div>
        </div>
      </div>

      <div className="container mt-5 d-flex justify-content-end">
        <button className="btn btn-danger" onClick={() => (window.location.href = '/logout')}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Transactions;