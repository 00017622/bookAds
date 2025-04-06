const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const categoryService = require('../services/categoryService');
const needAuth = require('../middleware/middleware');
router.get('/', needAuth, booksController.getAllBooks);

router.get('/create', needAuth, (req, res) => {
  const categories = categoryService.getAllCategories()
  res.render('create', { categories, user: req.user });
});

router.post('/', needAuth, booksController.createBook);

router.get('/:id/edit', needAuth,  booksController.getBookById);
router.post('/:id', needAuth,  booksController.updateBook);
router.post('/:id/delete', needAuth,  booksController.deleteBook);
router.get('/user/:id', needAuth, booksController.getBooksByUser);

module.exports = router;
