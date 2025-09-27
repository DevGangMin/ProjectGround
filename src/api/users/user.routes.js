const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('./user.controller');
const { protect } = require('../../middleware/auth.middleware'); // 인증 미들웨어

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;