import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
    trim: true
  },
  authorName: {
    type: String,
    required: true,
    trim: true
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  issuedOrNot: {
    type: Boolean,
    default: false
  },
  issueDate: {
    type: Date,
    validate: {
      validator: function (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return !value || value >= today;
      },
      message: 'Issue date cannot be earlier than today.'
    }
  },
  returnDate: {
    type: Date,
    validate: {
      validator: function (value) {
        if (!this.issueDate || !value) return true;
        const maxReturnDate = new Date(this.issueDate);
        maxReturnDate.setDate(maxReturnDate.getDate() + 15);
        return value <= maxReturnDate;
      },
      message: 'Return date must be within 15 days of issue date.'
    }
  },
  remarks: {
    type: String,
    trim: true,
    default: ''
  }
}, { timestamps: true });
bookSchema.pre('save', function (next) {
  if (this.issuedOrNot && this.issueDate && !this.returnDate) {
    const defaultReturn = new Date(this.issueDate);
    defaultReturn.setDate(defaultReturn.getDate() + 15);
    this.returnDate = defaultReturn;
  }
  next();
});

const Book = mongoose.model('Book', bookSchema);
export default Book;