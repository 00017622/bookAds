const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
const booksRoutes = require('./routes/booksRoutes');
const authenticationRoutes = require('./routes/authentication');
const profileRoutes = require('./routes/profileRoutes');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.redirect('/books') // decided to redirect users directly to books
  });

app.use('/books', booksRoutes);
app.use('/', authenticationRoutes);
app.use('/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});