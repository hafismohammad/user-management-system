const express = require("express");
const dotenv = require("dotenv").config();
const mongoDB = require('./config/config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/' })

const port = process.env.PORT || 3001;

mongoDB()

const app = express();



// Middleware to parse JSON request bodies
app.use(express.json());

app.use('/userImage', express.static(path.join(__dirname, '../../frontend/public/userImage')));
// Middleware to parse cookies
app.use(cookieParser());

app.use(cors());

const userRoutes = require("./routes/userRoutes");
const adminLogin = require("./routes/adminRoutes");
app.use("/", userRoutes);
app.use("/admin", adminLogin)

app.listen(port, () => console.log(`Server running on port ${port}`));
