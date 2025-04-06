const fs = require('fs');
const path = require('path');

const booksFilePath = path.join(__dirname, '../data/books.json');

function readBooks() {
  if (!fs.existsSync(booksFilePath)) {
    fs.writeFileSync(booksFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(booksFilePath);
  return JSON.parse(data);
}

function writeBooks(books) {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
}

function createBook(book) {
  const books = readBooks();
  book.id = Date.now().toString();
  books.push(book);
  writeBooks(books);
  return book;
}

function editBook(id, updatedData) {
  const books = readBooks();
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return null;

  books[index] = { ...books[index], ...updatedData };
  writeBooks(books);
  return books[index];
}

function getBookById(id) {
    const books = readBooks();
    const book = books.find((book) => book.id == id);
    console.log(`Looking for note with ID ${id}, found:`, book); 
    return book || null;
  }

function deleteBook(id) {
  const books = readBooks();
  const updatedBooks = books.filter(b => b.id !== id);
  if (books.length === updatedBooks.length) return false;

  writeBooks(updatedBooks);
  return true;
}

function getAllBooks() {
  return readBooks();
}

function getBooksByUser(userId) {
  const books = readBooks();
  return books.filter(book => book.userId == userId);
}

module.exports = {
  createBook,
  editBook,
  deleteBook,
  getBookById,
  getAllBooks,
  getBooksByUser
};
