const express = require('express');
const router = express.Router();
const needAuth = require('../middleware/middleware');
const profileController = require('../controllers/profileController');

router.get('/:id', needAuth, profileController.getProfile);
router.post('/:id', needAuth, profileController.updateProfile);

module.exports = router;