// const multer = require('multer');
// const path = require('path');

// // Configure multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/profile-images'); // Directory to save the uploaded files
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname);
//         cb(null, `${req.user._id}${ext}`); // Use user ID and file extension as filename
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../frontend/public/userImage'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
