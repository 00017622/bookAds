// middleware/redirectIfAuthenticated.js
const jwt = require('jsonwebtoken');

const redirectIfAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded && decoded.userId) {
      return res.redirect('/books');
    }
    return next();
  } catch (err) {
    return next();
  }
};
 // basically the logic is this: if there is token and user tries to access login
 //  and register routes, I just redirect him to main page, bcs he needs to log out first
module.exports = redirectIfAuthenticated;
