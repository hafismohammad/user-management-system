const express = require('express');
const router = express.Router();
const { login, signUp, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/multer')

router.post('/login', login);
router.post('/signup', signUp);
router.put('/update-profile', protect, upload.single('image'), updateProfile);

module.exports = router;
