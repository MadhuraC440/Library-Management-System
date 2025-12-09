import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  expectedReturnDate: {
    type: Date,
    required: true,
  },
  actualReturnDate: {
    type: Date,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  fine: {
    type: Number,
    default: 0,
  },
  finePaid: {
    type: Boolean,
    default: false,
  },
  remarks: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;