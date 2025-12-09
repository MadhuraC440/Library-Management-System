import React, { useState } from 'react';
import AvailabilityView from '../components/transactions/AvailabilityView'
import IssueBookView from '../components/transactions/IssueBookView';
import ReturnBookView from '../components/transactions/ReturnBookView'
import PayFineView from '../components/transactions/PayFineView'

const Transactions = () => {
  const [activeSection, setActiveSection] = useState(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'availability':
        return <AvailabilityView />;
      case 'issue':
        return <IssueBookView />;
      case 'return':
        return <ReturnBookView />;
      case 'fine':
        return <PayFineView />;
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