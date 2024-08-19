const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { adminLogin, getUser, edituser, createUser, deleteUser } = require('../controllers/adminController');
const upload = require('../utils/multer')

router.post('/admin', adminLogin);
router.get('/admin/userDetails', getUser);
router.put('/admin/editUser/:id', upload.single('image'), edituser);
router.post('/admin/createUser', createUser);
router.delete('/admin/deleteUser/:id', deleteUser); 

module.exports = router;
