import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [books, setBooks] = useState([]);

  
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  
  const [selectedBookId, setSelectedBookId] = useState(null);

  
  const [returnBookName, setReturnBookName] = useState('');
  const [returnSerial, setReturnSerial] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [remarks, setRemarks] = useState('');

  const [selectedReturnDate, setSelectedReturnDate] = useState('');

   const [selectedFineBook, setSelectedFineBook] = useState('');
  const [fineAmount, setFineAmount] = useState(0);
  const [finePaid, setFinePaid] = useState(false);
  const [fineRemarks, setFineRemarks] = useState('');

  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/books/names');
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  
  const handleSearch = () => {
    if (!selectedBook && !selectedAuthor) {
      alert('Please select at least one search criterion.');
      return;
    }

    const matches = books.filter((b) => {
      if (selectedBook && selectedAuthor)
        return b.bookName === selectedBook && b.authorName === selectedAuthor;
      if (selectedBook) return b.bookName === selectedBook;
      if (selectedAuthor) return b.authorName === selectedAuthor;
      return false;
    });

    setFilteredBooks(matches);
    setActiveSection('issue');
  };

  const handleCancel = () => {
    navigate('/transactions');
  };

  
  const handleReturnSubmit = async () => {
  if (!selectedBookId || !returnSerial || !issuedDate || !returnDate) {
    alert("Book, Serial Number, Issue Date, and Return Date are required.");
    return;
  }

  try {
    const payload = {
      bookId: selectedBookId,      
      serialNumber: returnSerial,
      issuedDate,
      returnDate,
      remarks
    };

    const res = await axios.post(
      "http://localhost:3000/api/transactions/return",
      payload
    );

    alert(`Book returned successfully! Fine: ${res.data.fine}`);
    setReturnBookName("");
    setReturnSerial("");
    setIssuedDate("");
    setReturnDate("");
    setRemarks("");
    setSelectedBookId(null);
  } catch (err) {
    console.error(err);
    alert(`Error returning the book: ${err.response?.data?.message || err.message}`);
  }
};

  
  const handleIssueSubmit = async (match) => {
    try {
      if (!match) {
        alert("No book selected.");
        return;
      }

      const today = new Date().toISOString().split("T")[0];
      const payload = {
        bookId: match._id,
        serialNumber: match.serialNumber,
        bookName: match.bookName,
        authorName: match.authorName,
        issueDate: today,
        returnDate
      };

      await axios.post("http://localhost:3000/api/transactions/issue", payload);

      alert("Book issued successfully!");
      setActiveSection(null);
      setSelectedBookId(null);
      setReturnDate("");
    } catch (err) {
      console.error(err);
      alert("Error issuing the book.");
    }
  };

  
  const renderSection = () => {
    switch (activeSection) {

      
      case 'availability': {
        const uniqueBookNames = [...new Set(books.map((b) => b.bookName))];
        const uniqueAuthorNames = [...new Set(books.map((b) => b.authorName))];

        return (
          <div className="border rounded p-4 shadow">
            <h5 className="mb-4 text-center">Search Book Availability</h5>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Book Name</label>
                <select
                  className="form-select"
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                >
                  <option value="">-- Select Book --</option>
                  {uniqueBookNames.map((name, idx) => (
                    <option key={idx} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Author Name</label>
                <select
                  className="form-select"
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                >
                  <option value="">-- Select Author --</option>
                  {uniqueAuthorNames.map((author, idx) => (
                    <option key={idx} value={author}>{author}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 d-flex align-items-end gap-2">
                <button className="btn btn-primary w-50" onClick={handleSearch}>Search</button>
                <button className="btn btn-secondary w-50" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          </div>
        );
      }

      
     case 'issue': {
  if (filteredBooks.length === 0) {
    return <p>No matching books found.</p>;
  } else {
    return (
      <div>
        <h5 className="mb-3">Matching Books</h5>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.bookName}</td>
                <td>{book.authorName}</td>
                <td>
                  {!book.issuedOrNot && (
                    <input
                      type="radio"
                      name="selectedBook"
                      checked={selectedBookId === book._id}
                      onChange={() => setSelectedBookId(book._id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="btn btn-primary mt-3"
          disabled={!selectedBookId} 
          onClick={() => setActiveSection('issueBook')}
        >
          Proceed to Issue
        </button>
      </div>
    );
  }
}

case 'issueBook': {
  const match = books.find((b) => b._id === selectedBookId);

  if (!match) return <p>No book selected.</p>;

  const today = new Date().toISOString().split('T')[0];

  const maxReturnDate = new Date();
  maxReturnDate.setDate(maxReturnDate.getDate() + 15);
  const maxDate = maxReturnDate.toISOString().split('T')[0];

  

  const handleIssueSubmit = async () => {
    if (!selectedReturnDate) {
      alert("Please select a return date.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/transactions/issue", {
        bookId: match._id,
        serialNumber: match.serialNumber,
        bookName: match.bookName,
        authorName: match.authorName,
        issueDate: today,
        returnDate: selectedReturnDate,
      });

      alert("Book issued successfully!");
      navigate("/transactions");
    } catch (error) {
      console.error("Issue error:", error);
      alert("Error issuing book");
    }
  };

  return (
    <div className="border rounded p-4 shadow">
      <h4 className="mb-3">Issue Book</h4>

      <div className="mb-3">
        <label><strong>Book Name</strong></label>
        <input className="form-control" value={match.bookName} readOnly />
      </div>

      <div className="mb-3">
        <label><strong>Author Name</strong></label>
        <input className="form-control" value={match.authorName} readOnly />
      </div>

      <div className="mb-3">
        <label><strong>Serial Number</strong></label>
        <input className="form-control" value={match.serialNumber} readOnly />
      </div>

      <div className="mb-3">
        <label><strong>Issue Date</strong></label>
        <input className="form-control" type="date" value={today} readOnly />
      </div>

      <div className="mb-3">
        <label><strong>Select Return Date</strong></label>
        <input
          className="form-control"
          type="date"
          min={today}
          max={maxDate}
          value={selectedReturnDate}
          onChange={(e) => setSelectedReturnDate(e.target.value)}
          required
        />
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-success w-50" onClick={handleIssueSubmit}>
          Confirm Issue
        </button>

        <button className="btn btn-secondary w-50" onClick={() => navigate('/transactions')}>
       Cancel
        </button>
      </div>
    </div>
  );
}

      
      case 'return':
        const filteredSerials = books.filter(
          (b) => b.bookName === returnBookName
        );

        return (
          <div className="border rounded p-4 shadow">
            <h5 className="mb-3">Return Book</h5>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Book Name</label>
                <select
                  className="form-select"
                  value={returnBookName}
                  onChange={(e) => {
                    setReturnBookName(e.target.value);
                    setReturnSerial("");
                  }}
                >
                  <option value="">-- Select Book --</option>
                  {[...new Set(books.map(b => b.bookName))].map(name => (
                    <option key={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Serial Number</label>
                <select
                  className="form-select"
                  value={returnSerial}
                  onChange={(e) => setReturnSerial(e.target.value)}
                  required
                >
                  <option value="">-- Select Serial --</option>
                  {filteredSerials.map(b => (
                    <option key={b._id} value={b.serialNumber}>
                      {b.serialNumber}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Issued Date</label>
              <textarea
                className="form-control"
                rows="2"
                placeholder="Enter issued date..."
                value={issuedDate}
                onChange={(e) => setIssuedDate(e.target.value)}
                data-gramm="false"
                data-enable-grammarly="false"
                spellCheck="false"
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Return Date</label>
              <input
                type="date"
                className="form-control"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Remarks</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Any remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                data-gramm="false"
                data-enable-grammarly="false"
                spellCheck="false"
              ></textarea>
            </div>

            <button className="btn btn-success" onClick={handleReturnSubmit}>
              Confirm Return
            </button>
          </div>
        );

      
      case 'fine': {
  const handleFineSubmit = async () => {
    if (!selectedFineBook || !returnSerial || !issuedDate || !returnDate || !selectedReturnDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        bookName: selectedFineBook,
        serialNumber: returnSerial,
        issueDate: issuedDate,
        returnDate: returnDate,
        actualReturnDate: selectedReturnDate,
        fine: fineAmount,
        finePaid: finePaid,
        remarks: fineRemarks,
      };

      await axios.post("http://localhost:3000/api/transactions/fine", payload);
      alert("Fine submitted successfully!");

      // Reset form
      setSelectedFineBook('');
      setReturnSerial('');
      setIssuedDate('');
      setReturnDate('');
      setSelectedReturnDate('');
      setFineAmount(0);
      setFinePaid(false);
      setFineRemarks('');
    } catch (error) {
      console.error("Error submitting fine:", error);
      alert("Failed to submit fine.");
    }
  };

  return (
    <div className="border rounded p-4 shadow">
      <h5 className="mb-3">Pay Fine</h5>

      <div className="mb-3">
        <label className="form-label">Enter Book Name</label>
        <input
          type="text"
          className="form-control"
          value={selectedFineBook}
          onChange={(e) => setSelectedFineBook(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Enter Author</label>
        <input
          type="text"
          className="form-control"
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Serial No</label>
        <input
          type="text"
          className="form-control"
          value={returnSerial}
          onChange={(e) => setReturnSerial(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Issue Date</label>
        <input
          type="date"
          className="form-control"
          value={issuedDate}
          onChange={(e) => setIssuedDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Return Date</label>
        <input
          type="date"
          className="form-control"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Actual Return Date</label>
        <input
          type="date"
          className="form-control"
          value={selectedReturnDate}
          onChange={(e) => setSelectedReturnDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fine Calculated</label>
        <input
          type="number"
          className="form-control"
          value={fineAmount}
          onChange={(e) => setFineAmount(Number(e.target.value))}
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={finePaid}
          onChange={(e) => setFinePaid(e.target.checked)}
        />
        <label className="form-check-label">Fine Paid</label>
      </div>

      <div className="mb-3">
        <label className="form-label">Remarks</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Optional remarks..."
          value={fineRemarks}
          onChange={(e) => setFineRemarks(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={handleFineSubmit}>
        Submit
      </button>
    </div>
  );
}
      default:
        return <div>Select a transaction from the sidebar.</div>;
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">

          <div className="col-md-3 border-end">
            <div className="d-flex flex-column gap-3">
              <button className="btn btn-outline-primary" onClick={() => setActiveSection('availability')}>
                Is Book Available?
              </button>
              <button className="btn btn-outline-success" onClick={() => setActiveSection('issue')}>
                Issue Book
              </button>
              <button className="btn btn-outline-warning" onClick={() => setActiveSection('return')}>
                Return Book
              </button>
              <button className="btn btn-outline-danger" onClick={() => setActiveSection('fine')}>
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
    </>
  );
};

export default Transactions;
