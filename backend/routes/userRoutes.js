// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// @route   POST api/users/register
// @desc    Register a new user
router.post('/register', registerUser);

module.exports = router;
