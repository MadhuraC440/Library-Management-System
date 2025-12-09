import express from 'express';
import Book from '../models/bookSchema.js';
import Transaction from '../models/transactionSchema.js'; 

const router = express.Router();


router.get('/books/names', async (req, res) => {
  try {
    const books = await Book.find({}, 'bookName authorName serialNumber issuedOrNot');
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching book names:', error);
    res.status(500).json({ message: 'Server error while fetching book names' });
  }
});


router.post('/transactions/issue', async (req, res) => {
  try {
    const { bookId, serialNumber, bookName, authorName, issueDate, returnDate } = req.body;

    if (!bookId || !serialNumber || !issueDate || !returnDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    
    const alreadyIssued = await Transaction.findOne({
      bookId,
      serialNumber,
      isReturned: false,
    });

    if (alreadyIssued) {
      return res.status(400).json({ message: 'This serial number is already issued.' });
    }

    
    const newTransaction = new Transaction({
      bookId,
      serialNumber,
      bookName,
      authorName,
      issueDate,
      expectedReturnDate: returnDate,
      isReturned: false,
      fine: 0,
    });

    await newTransaction.save();

    res.status(201).json({ message: 'Book issued successfully', transaction: newTransaction });
  } catch (error) {
    console.error('Issue Error:', error);
    res.status(500).json({ message: 'Server error while issuing book' });
  }
});


router.post('/transactions/return', async (req, res) => {

  try {
    const { bookId, serialNumber, issuedDate, returnDate, remarks } = req.body;

    if (!bookId || !serialNumber || !issuedDate || !returnDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    
    const txn = await Transaction.findOne({
      bookId,
      serialNumber,
      isReturned: false,
    });

    if (!txn) {
      return res.status(404).json({ message: 'No active issued record found for this book' });
    }

    const expected = new Date(txn.expectedReturnDate);
    const actual = new Date(returnDate);
    let fine = 0;
    const perDayFine = 10;

    if (actual > expected) {
      const lateDays = Math.ceil((actual - expected) / (1000 * 60 * 60 * 24));
      fine = lateDays * perDayFine;
    }

    txn.isReturned = true;
    txn.actualReturnDate = returnDate;
    txn.remarks = remarks || '';
    txn.fine = fine;

    await txn.save();

    res.status(200).json({ message: 'Book returned successfully', fine, transaction: txn });
  } catch (error) {
    console.error('Return Error:', error);
    res.status(500).json({ message: 'Server error while returning book' });
  }
});
router.post('/transactions/fine', async (req, res) => {
  try {
    const {
      serialNumber,
      actualReturnDate,
      fine,
      finePaid,
      remarks
    } = req.body;

    if (!serialNumber || !actualReturnDate) {
      return res.status(400).json({ message: 'Missing required fields: serialNumber or actualReturnDate' });
    }

    // Find the book by serial number
    const book = await Book.findOne({ serialNumber });

    if (!book) {
      return res.status(404).json({ message: 'Book not found with the provided serial number' });
    }

    // Find the transaction using serialNumber and bookName (or bookId if preferred)
    const txn = await Transaction.findOne({ serialNumber, bookName: book.bookName });

    if (!txn) {
      return res.status(404).json({ message: 'Transaction not found for the provided book' });
    }

    // Fill in missing fields from the book
    txn.bookId = book._id;
    txn.bookName = book.bookName;
    txn.authorName = book.authorName;
    txn.issueDate = book.issueDate;
    txn.expectedReturnDate = book.returnDate;

    // Update fine-related fields
    txn.actualReturnDate = actualReturnDate;
    txn.fine = fine;
    txn.finePaid = finePaid;
    txn.remarks = remarks || '';
    txn.isReturned = true;

    await txn.save();

    res.status(200).json({ message: 'Fine and return details updated successfully', transaction: txn });
  } catch (error) {
    console.error('Fine Submission Error:', error);
    res.status(500).json({ message: 'Server error while updating fine', error });
  }
});
export default router;
