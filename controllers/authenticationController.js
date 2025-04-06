const authService = require('../services/authenticationService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Helper function to validate email and password
const validateInput = (username, password) => {
  if (!username || !password) {
    throw new Error('Email and password are required');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
};

// Helper function to generate JWT token and set cookie
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
  });
  return token;
};

// Helper function to handle errors and render the view
const handleAuthError = (res, view, errorMessage) => {
  console.error(`Error in ${view}:`, errorMessage);
  return res.render(view, { error: errorMessage });
};

const authController = {
  // this is for get request to render the page so that user would login
  getLogin: (req, res) => {
    res.render('login', { error: null });
  },

  // this is the funciton for the post request to which all data will be sent
  postLogin: async (req, res) => {
    const { username, password } = req.body;

    try {
      validateInput(username, password);

      const user = await authService.getUser(username);
      if (!user) {
        return handleAuthError(res, 'login', 'Invalid username or password');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return handleAuthError(res, 'login', 'Invalid username or password');
      }

      generateTokenAndSetCookie(user.id, res);
      return res.redirect('/books');
    } catch (error) {
      return handleAuthError(res, 'login', 'Server error');
    }
  },

  // here to render the page for registering
  getRegister: (req, res) => {
    res.render('register', { error: null });
  },


  // function for registering user logic
  postRegister: async (req, res) => {
    const { username, password } = req.body;

    try {
      validateInput(username, password);

      const existingUser = await authService.getUser(username);
      if (existingUser) {
        return handleAuthError(res, 'register', 'Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: uuidv4(),
        username,
        phone: '',
        name: '',
        password: hashedPassword,
      };

      await authService.createUser(newUser);
      generateTokenAndSetCookie(newUser.id, res);
      return res.redirect('/books');
    } catch (error) {
      return handleAuthError(res, 'register', 'Failed to register user. Please try again.');
    }
  },

  logout: (req, res) => {
    res.clearCookie('jwt');
    console.log('User logged out');
    return res.redirect('/login');
  },
};

module.exports = authController;