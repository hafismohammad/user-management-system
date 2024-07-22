const express = require('express')
const router = express.Router()
const { login, signUp, jwttest, profile } = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware')

router.post('/login',login)
router.post('/signup',signUp)
router.get('/tockentest',protect,jwttest)
router.get('/', profile)

module.exports = router;