const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// just checking if the users.json file exists
try {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2), 'utf8');
  }
} catch (err) {
  console.error('Failed to create accounts.json:', err.message);
}

// Helper function to read users from the file
const readUsers = () => {
  try {
    const rawData = fs.readFileSync(usersFilePath, 'utf8');
    return rawData.trim() ? JSON.parse(rawData) : [];
  } catch (err) {
    console.error('Unable to read accounts.json:', err.message);
    return [];
  }
};

const authService = {
  getAllUsers: () => {
    return readUsers();
  },

  getUser: (username) => {
    const users = readUsers();
    for (const user of users) {
      if (user.username === username) {
        return user;
      }
    }
    return null; // Return null if no user is found
  },

  getUserById: (id) => {
    const users = readUsers();
    for (const user of users) {
      if (user.id === id) {
        return user;
      }
    }
    return null; // Return null if no user is found
  },

  createUser: (newUser) => {
    const users = readUsers();
    users.push(newUser);
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to write to accounts.json:', err.message);
      throw new Error('Could not create user');
    }
  },
};

module.exports = authService;