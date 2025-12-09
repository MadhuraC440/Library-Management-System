import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailabilityView = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    axios.get('/api/books/names')
      .then(res => {
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (typeof res.data === 'object' && res.data !== null) {
          const bookArray = Object.values(res.data);
          setBooks(bookArray);
        } else {
          setError('Unexpected response format');
          console.error('Expected array but got:', res.data);
        }
      })
      .catch(err => {
        setError('Failed to fetch books');
        console.error('Error fetching books:', err);
      });
  }, []);

  const handleSelect = (e) => {
    setSelectedBook(e.target.value);
  };

  const selected = books.find(
    (book) => `${book.bookName} - ${book.authorName}` === selectedBook
  );

  return (
    <div>
      <h5>Book Availability</h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="mb-4">
        <label className="form-label">Select a Book</label>
        <select className="form-select" value={selectedBook} onChange={handleSelect}>
          <option value="">-- Choose a book --</option>
          {books.map((book) => (
            <option key={book.serialNumber} value={`${book.bookName} - ${book.authorName}`}>
              {book.bookName} by {book.authorName}
            </option>
          ))}
        </select>
      </form>

      {selected && (
        <div className="alert alert-info">
          <strong>{selected.bookName}</strong> by <em>{selected.authorName}</em> is{' '}
          <span className={`badge ${selected.issuedOrNot ? 'bg-danger' : 'bg-success'}`}>
            {selected.issuedOrNot ? 'Issued' : 'Available'}
          </span>
        </div>
      )}
    </div>
  );
};

export default AvailabilityView;