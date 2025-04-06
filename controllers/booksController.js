const bookService = require("../services/bookService");
const categoryService = require('../services/categoryService');
const { v4: uuidv4 } = require("uuid");

const bookController = {
  //function to get all the books
  getAllBooks: async (req, res) => {
    try {
      let books = await bookService.getAllBooks();
      const categories = await categoryService.getAllCategories();

      const selectedCategory = req.query.category;

      // if I set the category in query parameter on frontend just filter the books by category
      if (selectedCategory) {
        books = books.filter(book => book.category_id === selectedCategory);
      }

      res.render('books', {
        books,
        categories,
        selectedCategory,
        user: req.user || null,
        error: null
      });
    } catch (error) {
      console.error('Error fetching books:', error);
      res.render('books', {
        books: [],
        categories: [],
        selectedCategory: null,
        user: req.user || null,
        error: 'Failed to load books.'
      });
    }
  },

  // crearing book and inserting data
  createBook: (req, res) => {
    const { userId, imageUrl, category_id, title, author, description, price, condition } = req.body;

    const newBook = {
      id: uuidv4(),
      userId: userId || 'guest',
      category_id: category_id,
      title,
      author,
      description,
      price: parseFloat(price) || 0,
      condition: condition || 'Good',
      imageUrl: imageUrl,
      created_date: new Date().toISOString().split("T")[0],
    };

    bookService.createBook(newBook);
    res.redirect("/books");
  },

  // updating the book
  updateBook: (req, res) => {
    const { id } = req.params;
    const { title, imageUrl, category_id, author, description, price, condition } = req.body;

    const updatedBook = {
      title,
      category_id,
      author,
      description,
      price: parseFloat(price) || 0,
      imageUrl: imageUrl,
      condition: condition || 'Good',
    };

    const success = bookService.editBook(id, updatedBook);

    if (success) {
      res.redirect("/books");
    } else {
      res.status(404).send("Book not found");
    }
  },

  // just getting single book based on the id
  getBookById: (req, res) => {
    const book = bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).send("book not found");
    }

    if (book.userId !== req.user.id) { // checking if user if the creator of this book ad
     return res.redirect('/');
    }

    const categories = categoryService.getAllCategories();
    res.render("edit", { book, categories, user: req.user });
  },

  // Delete a book ad
  deleteBook: (req, res) => {
    const { id } = req.params;

    const book = bookService.getBookById(id);

    if (!book) {
      return res.status(404).send("book not found");
    }

    if (book.userId !== req.user.id) {
      return res.redirect('/'); // checking if user if the creator of this book ad
     }

    const success = bookService.deleteBook(id);

    if (success) {
      res.redirect("/books");
    } else {
      res.status(404).send("Book not found");
    }
  },
  // Fetching books by a specific user
  getBooksByUser: (req, res) => {
    const userId = req.params.id;

    if (req.user.id !== userId) {
      return res.redirect('/'); // if some user enters the id to the url, it would secure the route,
      //  it would redirect him to the main page, would not access
    }

    const books = bookService.getBooksByUser(userId);
    res.render("userbooks", { books, user: req.user });
  },
};

module.exports = bookController;
