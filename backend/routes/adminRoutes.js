const express = require('express')
const { route } = require('./userRoutes')
const router = express.Router()
const { adminLogin, getUser } = require('../controllers/adminController')

router.post('/admin', adminLogin)
router.get('/admin/userDetails', getUser)

module.exports = router