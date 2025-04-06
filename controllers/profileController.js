const profileService = require('../services/profileService');

const profileController = {
  getProfile: (req, res) => {
    try {
      const userId = req.params.id;
      const user = profileService.getaccountById(userId);

      if (!user) {
        return res.status(404).render('profile', {
          user: null,
          error: 'User not found',
          success: null,
          title: 'User Profile'
        });
      }

      if (req.user.id !== userId) { // if the other user tries to open the another users profile
        return res.status(403).render('profile', {
          user: null,
          error: 'Unauthorized access',
          success: null,
          title: 'User Profile'
        });
      }

      res.render('profile', {
        user,
        error: null,
        success: null,
        title: 'User Profile'
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).render('profile', {
        user: null,
        error: 'An error occurred while fetching the profile',
        success: null,
        title: 'User Profile'
      });
    }
  },

  updateProfile: (req, res) => {
    try {
      const userId = req.params.id;
      const user = profileService.getaccountById(userId);

      if (!user) {
        return res.status(404).render('profile', {
          user: null,
          error: 'User not found',
          success: null,
          title: 'User Profile'
        });
      }

      // protection from other users
      if (req.user.id !== userId) {
        return res.status(403).render('profile', {
          user: null,
          error: 'Unauthorized access',
          success: null,
          title: 'User Profile'
        });
      }

      const { username, name, phone } = req.body;

      // Basic validation
      if (!username || !name || !phone) {
        return res.render('profile', {
          user,
          error: 'All fields are required',
          success: null,
          title: 'User Profile'
        });
      }

      // Checking if the new username is already taken by another user
      const accounts = profileService.getAccounts();
      const existingUser = accounts.find(u => u.username === username && u.id !== userId);
      if (existingUser) {
        return res.render('profile', {
          user,
          error: 'Username already taken',
          success: null,
          title: 'User Profile'
        });
      }

      // Updating the user object
      const updatedData = { username, name, phone };
      const updatedUser = profileService.editProfile(userId, updatedData);

      res.render('profile', {
        user: updatedUser,
        error: null,
        success: 'Profile updated successfully',
        title: 'User Profile'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).render('profile', {
        user: null,
        error: 'An error occurred while updating the profile',
        success: null,
        title: 'User Profile'
      });
    }
  }
};

module.exports = profileController;